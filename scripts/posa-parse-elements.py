#!/usr/bin/env python3
"""
Parse element names, values, and requirements from a POSA Code of Points PDF
and generate TypeScript technique data files.

Requires: pip install pymupdf

Usage:
    python scripts/posa-parse-elements.py <pdf_path> [--apparatus silks|hoop|hammock]

Output:
    - src/data/{apparatus}-techniques.ts  (TypeScript technique array)

Strategy:
    For each page in the element table sections, find POSA codes (e.g. AHA001)
    that are preceded by a difficulty value (e.g. 0,3). Extract the element name
    and requirement bullet points from the text following each code. Codes that
    appear without a preceding value are treated as cross-references (e.g. in
    "Levels of execution" blocks) and are skipped.

POSA group -> style mapping:
    A (Group A) -> flexibility
    B (Group B) -> strength
    C (Group C) -> balance
    D (Group D) -> dynamic

POSA value -> difficulty mapping:
    0.1 - 0.2  -> beginner
    0.3 - 0.4  -> intermediate
    0.5 - 0.6  -> advanced
    0.7+       -> elite
"""

import pymupdf
import os
import re
import json
import sys

# --- Configuration -----------------------------------------------------------

# Page ranges (0-indexed) for element tables in the POSA 2026 PDF
APPARATUS_CONFIG = {
    "silks": {
        "pages": range(57, 119),
        "code_prefix": "S",
        "code_pattern": re.compile(r'\b(S[ABCDE]\d{3})\b'),
        "groups": list("ABCDE"),
    },
    "hoop": {
        "pages": range(119, 206),
        "code_prefix": "H",
        "code_pattern": re.compile(r'\b(H[ABCDE]\d{3})\b'),
        "groups": list("ABCDE"),
    },
    "hammock": {
        "pages": range(206, 283),
        "code_prefix": "AH",
        "code_pattern": re.compile(r'\b(AH[ABCD]\d{3})\b'),
        "groups": list("ABCD"),
    },
}

GROUP_STYLE = {
    "A": "flexibility",
    "B": "strength",
    "C": "balance",
    "D": "dynamic",
    "E": "dynamic",  # spinning elements grouped with dynamic
}

# --- Helpers -----------------------------------------------------------------


def value_to_difficulty(val: float) -> str:
    """Map a POSA element value to a difficulty tier."""
    if val <= 0.2:
        return "beginner"
    elif val <= 0.4:
        return "intermediate"
    elif val <= 0.6:
        return "advanced"
    else:
        return "elite"


def slugify(name: str) -> str:
    """Convert an element name to a URL-friendly slug."""
    s = name.lower()
    s = re.sub(r'[°⁰°]', '', s)
    s = re.sub(r'[^a-z0-9\s-]', '', s)
    s = re.sub(r'[\s]+', '-', s.strip())
    s = re.sub(r'-+', '-', s)
    return s.rstrip('-')


def name_to_category(name: str, group: str) -> str:
    """Infer a technique category from the element name and group."""
    lower = name.lower()
    if any(w in lower for w in ['drop', 'fall', 'dive', 'release', 'roll off', 'salto']):
        return 'drops'
    if any(w in lower for w in ['climb', 'inversion']):
        return 'climbs'
    if any(w in lower for w in ['wrap', 'cocoon']):
        return 'wraps'
    if any(w in lower for w in ['lock', 'hang']):
        return 'locks'
    if any(w in lower for w in ['transition', 'roll', 'spin', 'rotation']):
        return 'transitions'
    if any(w in lower for w in ['mount', 'entry', 'enter']):
        return 'entries'
    if group == 'D' or group == 'E':
        return 'drops'
    return 'poses'


# --- Extraction --------------------------------------------------------------


def extract_text(doc, page_range) -> str:
    """Concatenate cleaned text from a range of PDF pages."""
    parts = []
    for page_idx in page_range:
        page = doc[page_idx]
        text = page.get_text()
        # Strip header/footer
        text = re.sub(
            r'POSA AERIAL SPORTS CODE OF POINTS 2026\s+\d+\s*', '', text
        )
        parts.append(text)
    return "\n".join(parts)


def parse_elements(text: str, code_pattern, apparatus: str) -> list[dict]:
    """
    Parse elements from extracted PDF text.

    Returns a list of dicts with keys:
        code, name, value, difficulty, style, category, group, requirements
    """
    matches = list(code_pattern.finditer(text))
    seen: set[str] = set()
    elements: list[dict] = []

    for i, match in enumerate(matches):
        code = match.group(1)
        pos = match.start()

        # Look for a value (e.g. "0,3" or "0.3") in the ~100 chars before the code
        pre = text[max(0, pos - 100):pos]
        val_match = re.search(r'(\d[,\.]\d)\s*$', pre.strip())
        if not val_match:
            # This code appears in a "Levels of execution" block — skip
            continue

        if code in seen:
            continue
        seen.add(code)

        value_str = val_match.group(1).replace(',', '.')
        try:
            value = float(value_str)
        except ValueError:
            continue

        # Text region for this element (up to the next primary code)
        if i + 1 < len(matches):
            region = text[pos:matches[i + 1].start()]
        else:
            region = text[pos:pos + 500]

        # Element name: first non-empty line after the code
        after_code = region[len(code):].strip()
        lines = after_code.split('\n')
        name = lines[0].strip() if lines else code
        name = re.sub(r'\s+', ' ', name).rstrip(' .')
        if not name or name.startswith('•') or name.startswith('●'):
            name = code

        # Requirements: bullet-pointed lines
        reqs = re.findall(r'[●•\-]\s*(.+?)(?:\n|$)', region)
        reqs = [
            r.strip()
            for r in reqs
            if r.strip() and not r.strip().startswith('Levels') and len(r.strip()) > 3
        ]

        # Determine the group letter (last uppercase letter before digits)
        group = re.search(r'([A-E])\d{3}$', code)
        group_letter = group.group(1) if group else 'A'

        elements.append({
            'code': code,
            'name': name,
            'value': value,
            'difficulty': value_to_difficulty(value),
            'style': GROUP_STYLE.get(group_letter, 'flexibility'),
            'category': name_to_category(name, group_letter),
            'group': group_letter,
            'requirements': reqs[:5],
        })

    elements.sort(key=lambda x: x['code'])
    return elements


# --- TypeScript generation ---------------------------------------------------


def generate_typescript(elements: list[dict], apparatus: str) -> str:
    """Generate a TypeScript source file from parsed elements."""
    lines = [
        'import { Technique } from "@/types";',
        '',
        f'export const {apparatus}Techniques: Technique[] = [',
    ]

    for elem in elements:
        eid = f"posa-{elem['code'].lower()}-{slugify(elem['name'])}"
        aliases = []
        if '°' in elem['name'] or '⁰' in elem['name']:
            aliases.append(re.sub(r'[°⁰]', '', elem['name']).lower().strip())

        desc_parts = [
            f"A {elem['style']} element in the aerial {apparatus}: "
            f"{elem['name'].lower()}."
        ]
        for r in elem['requirements'][:3]:
            desc_parts.append(r.rstrip('.'))
        description = ". ".join(desc_parts) + "."
        description = description.replace('"', '\\"')

        cues = []
        for r in elem['requirements'][:5]:
            r = r.strip().rstrip('.')
            r = re.sub(r'\s+', ' ', r)
            if len(r) > 5:
                cues.append(r[0].upper() + r[1:])
        if not cues:
            cues.append(f"Perform the {elem['name'].lower()} position")

        lines.append('  {')
        lines.append(f'    id: "{eid}",')
        lines.append(f'    name: "{elem["name"]}",')
        lines.append(f'    aliases: {json.dumps(aliases)},')
        lines.append(f'    apparatus: ["{apparatus}"],')
        lines.append(f'    category: "{elem["category"]}",')
        lines.append(f'    difficulty: "{elem["difficulty"]}",')
        lines.append(f'    description:')
        lines.append(f'      "{description}",')
        lines.append(f'    cues: {json.dumps(cues)},')
        lines.append(f'    style: "{elem["style"]}",')
        lines.append('  },')

    lines.append('];')
    lines.append('')
    return '\n'.join(lines)


# --- Main --------------------------------------------------------------------


def main():
    if len(sys.argv) < 2:
        print(f"Usage: python {sys.argv[0]} <pdf_path> [--apparatus silks|hoop|hammock]")
        sys.exit(1)

    pdf_path = sys.argv[1]
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    # Determine which apparatus to process
    apparatus_list = list(APPARATUS_CONFIG.keys())
    if '--apparatus' in sys.argv:
        idx = sys.argv.index('--apparatus')
        if idx + 1 < len(sys.argv):
            choice = sys.argv[idx + 1]
            if choice not in APPARATUS_CONFIG:
                print(f"Unknown apparatus: {choice}")
                print(f"Choose from: {', '.join(APPARATUS_CONFIG.keys())}")
                sys.exit(1)
            apparatus_list = [choice]

    doc = pymupdf.open(pdf_path)

    for apparatus in apparatus_list:
        config = APPARATUS_CONFIG[apparatus]
        print(f"Processing {apparatus}...")

        text = extract_text(doc, config['pages'])
        elements = parse_elements(text, config['code_pattern'], apparatus)

        print(f"  Found {len(elements)} elements")
        for g in config['groups']:
            count = len([e for e in elements if e['group'] == g])
            print(f"    Group {g}: {count}")

        ts_content = generate_typescript(elements, apparatus)
        out_path = os.path.join(
            project_root, "src", "data", f"{apparatus}-techniques.ts"
        )
        with open(out_path, 'w') as f:
            f.write(ts_content)
        print(f"  Written to {out_path}")


if __name__ == "__main__":
    main()
