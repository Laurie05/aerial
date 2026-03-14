#!/usr/bin/env python3
"""
Extract per-element illustration images from a POSA Code of Points PDF.

Requires: pip install pymupdf

Usage:
    python scripts/posa-extract-images.py <pdf_path>

Output:
    - public/posa/silks/{code}.png  (e.g. sa001.png, sb012.png)
    - public/posa/hoop/{code}.png   (e.g. ha001.png, hb012.png)
    - scripts/posa-image-mapping.json  (code -> public URL path)

Strategy:
    For each page in the element table sections, extract all POSA codes
    (SA/SB/SC/SD for silks, HA/HB/HC/HD for hoop) and all images, then
    match them by vertical position on the page (closest y-coordinate).

Known issue:
    The POSA 2020 PDF uses Cyrillic lookalike characters for some codes
    (e.g. Cyrillic А U+0410 instead of ASCII A). This script normalizes
    both ASCII and Cyrillic variants.
"""

import pymupdf
import os
import re
import json
import sys

# --- Configuration -----------------------------------------------------------

# Page ranges (0-indexed) for element tables in the POSA 2020 PDF
SILKS_PAGES = range(46, 83)   # PDF pages 47-83
HOOP_PAGES = range(85, 118)   # PDF pages 86-118

# Image size filters (points)
MIN_SIZE = 20
MAX_SIZE = 600

# Max vertical distance (points) between a code and its matched image
MAX_Y_DISTANCE = 300

# --- Cyrillic normalization ---------------------------------------------------

# Cyrillic lookalikes found in POSA PDFs
CYRILLIC_TO_ASCII = {
    '\u0410': 'A',  # А
    '\u0412': 'B',  # В
    '\u0421': 'C',  # С
    '\u0414': 'D',  # Д
    '\u041D': 'H',  # Н
}

# Pattern matching both ASCII and Cyrillic variants of POSA codes
_S = r'[S\u0421]'           # S or Cyrillic С
_H = r'[H\u041D]'           # H or Cyrillic Н
_GROUP = r'[ABCD\u0410\u0412\u0421\u0414]'  # A/B/C/D or Cyrillic equivalents
CODE_PATTERN = re.compile(rf'\b({_S}{_GROUP}\d{{3}}|{_H}{_GROUP}\d{{3}})\b')


def normalize_code(code: str) -> str:
    """Replace Cyrillic lookalikes with ASCII equivalents."""
    return ''.join(CYRILLIC_TO_ASCII.get(ch, ch) for ch in code)


# --- Extraction ---------------------------------------------------------------

def extract_codes_from_page(page) -> list[tuple[str, float]]:
    """Extract all POSA codes and their y-positions from a page."""
    text_dict = page.get_text("dict")
    codes_with_y = []

    for block in text_dict["blocks"]:
        if block["type"] != 0:
            continue
        for line in block["lines"]:
            line_text = "".join(span["text"] for span in line["spans"])
            for match in CODE_PATTERN.findall(line_text):
                normalized = normalize_code(match)
                y_pos = line["bbox"][1]
                codes_with_y.append((normalized, y_pos))

    # Deduplicate, keeping first occurrence
    seen = set()
    unique = []
    for code, y in codes_with_y:
        if code not in seen:
            seen.add(code)
            unique.append((code, y))

    return unique


def extract_images_from_page(page) -> list[tuple[int, float, object, float, float]]:
    """Extract all images and their positions from a page."""
    images = []
    for img_info in page.get_images(full=True):
        xref = img_info[0]
        rects = page.get_image_rects(xref)
        if not rects:
            continue
        rect = rects[0]
        w, h = rect.width, rect.height
        if w < MIN_SIZE or h < MIN_SIZE:
            continue
        if w > MAX_SIZE and h > MAX_SIZE:
            continue
        images.append((xref, rect.y0, rect, w, h))
    return images


def process_pages(doc, page_range, out_dir, apparatus):
    """Process a range of pages, extracting and mapping images to codes."""
    os.makedirs(out_dir, exist_ok=True)
    mapping = {}

    for page_idx in page_range:
        page = doc[page_idx]
        codes = extract_codes_from_page(page)
        images = extract_images_from_page(page)

        if not codes or not images:
            continue

        # Match each code to its closest image by y-position
        for code, code_y in codes:
            code_lower = code.lower()
            if code_lower in mapping:
                continue

            best_img = None
            best_dist = float('inf')
            for xref, img_y, rect, w, h in images:
                dist = abs(code_y - img_y)
                if dist < best_dist:
                    best_dist = dist
                    best_img = (xref, w, h)

            if best_img and best_dist < MAX_Y_DISTANCE:
                xref, w, h = best_img
                filename = f"{code_lower}.png"
                filepath = os.path.join(out_dir, filename)

                try:
                    pix = pymupdf.Pixmap(doc, xref)
                    if pix.n > 4:  # CMYK -> RGB
                        pix = pymupdf.Pixmap(pymupdf.csRGB, pix)
                    pix.save(filepath)
                    mapping[code_lower] = f"/posa/{apparatus}/{filename}"
                except Exception as e:
                    print(f"  Error extracting {code}: {e}")
            else:
                print(f"  No image match for {code} (page {page_idx + 1}, best_dist={best_dist:.1f})")

    return mapping


def main():
    if len(sys.argv) < 2:
        print(f"Usage: python {sys.argv[0]} <pdf_path>")
        sys.exit(1)

    pdf_path = sys.argv[1]
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    silks_out = os.path.join(project_root, "public", "posa", "silks")
    hoop_out = os.path.join(project_root, "public", "posa", "hoop")

    doc = pymupdf.open(pdf_path)

    print("Processing silks pages...")
    silks_mapping = process_pages(doc, SILKS_PAGES, silks_out, "silks")
    print(f"  Extracted {len(silks_mapping)} silks images")

    print("Processing hoop pages...")
    hoop_mapping = process_pages(doc, HOOP_PAGES, hoop_out, "hoop")
    print(f"  Extracted {len(hoop_mapping)} hoop images")

    mapping = {**silks_mapping, **hoop_mapping}
    print(f"Total: {len(mapping)} images")

    mapping_path = os.path.join(project_root, "scripts", "posa-image-mapping.json")
    with open(mapping_path, "w") as f:
        json.dump(mapping, f, indent=2, sort_keys=True)
    print(f"Mapping saved to {mapping_path}")


if __name__ == "__main__":
    main()
