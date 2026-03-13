import { SequenceEdge } from "@/types";

// Sequence edges define what can flow into what during a routine
// This is about choreographic flow, not learning prerequisites
export const sequenceEdges: SequenceEdge[] = [
  // === CLIMBS → ENTRIES ===
  { from: "french-climb", to: "inversion" },
  { from: "french-climb", to: "figure-eight-single-footlock" },
  { from: "french-climb", to: "figure-eight-double-footlock" },
  { from: "russian-climb", to: "hip-key" },
  { from: "bicycle-climb", to: "figure-eight-single-footlock" },

  // === INVERSION → HOOKS ===
  { from: "inversion", to: "same-side-hook" },
  { from: "inversion", to: "opposite-side-hook" },
  { from: "inversion", to: "meathook" },

  // === SAME-SIDE HOOK → ===
  { from: "same-side-hook", to: "thigh-hitch" },
  { from: "same-side-hook", to: "catchers-wrap" },
  { from: "same-side-hook", to: "back-balance" },

  // === OPPOSITE-SIDE HOOK → ===
  { from: "opposite-side-hook", to: "hip-key" },
  { from: "opposite-side-hook", to: "z-wrap" },
  { from: "opposite-side-hook", to: "back-balance" },
  { from: "opposite-side-hook", to: "front-balance" },

  // === CATCHERS WRAP SEQUENCES ===
  { from: "catchers-wrap", to: "tik-tok", notes: "Classic sequence" },
  { from: "catchers-wrap", to: "belly-wrap" },
  { from: "catchers-wrap", to: "pencil-drop" },
  { from: "catchers-wrap", to: "s-wrap-closed" },

  // Catchers → belly wrap one round → star drop
  { from: "belly-wrap", to: "star-drop" },
  // Catchers → climb up → salto → star drop
  { from: "belly-wrap", to: "salto" },
  { from: "salto", to: "star-drop", notes: "Salto + star drop combo" },
  // Catchers → belly wrap → key to right → pencil drop
  { from: "belly-wrap", to: "pencil-drop" },

  // === TIK-TOK → S-WRAP ===
  { from: "tik-tok", to: "s-wrap-closed", notes: "Tik-tok to s-wrap" },
  { from: "tik-tok", to: "s-wrap-open" },

  // === S-WRAP (CLOSED) SEQUENCES ===
  { from: "s-wrap-closed", to: "wheel-down" },
  { from: "s-wrap-closed", to: "split-silk", notes: "Split silk to back dive" },
  { from: "s-wrap-closed", to: "double-star" },
  { from: "s-wrap-closed", to: "no-hand-wheel-down", notes: "Extra wrap around pole first" },

  // Classic: split silk → back dive → s-wrap → wheel down
  { from: "split-silk", to: "back-dive", notes: "Dramatic transition" },
  { from: "back-dive", to: "s-wrap-closed" },
  { from: "back-dive", to: "wheel-down" },

  // === S-WRAP (OPEN) SEQUENCES ===
  { from: "s-wrap-open", to: "belly-wrap", notes: "Infinite belly wraps" },
  { from: "s-wrap-open", to: "debele-drop" },

  // === Z-WRAP SEQUENCES ===
  { from: "z-wrap", to: "infinity-drop", notes: "Climb up to salto" },
  { from: "infinity-drop", to: "wheel-down" },

  // === S-WRAP ENTRIES ===
  { from: "lasso-entry", to: "s-wrap-closed" },
  { from: "lasso-entry", to: "s-wrap-open" },
  { from: "beats-entry", to: "s-wrap-closed" },
  { from: "beats-entry", to: "s-wrap-open" },
  { from: "catchers-wrap", to: "s-wrap-closed" },
  { from: "back-tuck-entry", to: "s-wrap-closed" },
  { from: "rollup-entry", to: "s-wrap-closed" },

  // === HIP KEY SEQUENCES ===
  { from: "hip-key", to: "thigh-hitch" },
  { from: "hip-key", to: "split-silk" },
  { from: "split-silk", to: "swing-seat" },
  { from: "swing-seat", to: "split-silk", notes: "Shapes from swing seat" },

  // === FRONT/BACK BALANCE ===
  { from: "front-balance", to: "back-balance" },
  { from: "back-balance", to: "front-balance" },
  { from: "front-balance", to: "meathook" },

  // === SINGLE FOOTLOCK SINGLE SILK ===
  { from: "figure-eight-single-footlock", to: "rebecca-split" },
  { from: "figure-eight-single-footlock", to: "belay" },
  { from: "figure-eight-single-footlock", to: "music-box-rolls" },
  { from: "rebecca-split", to: "rebecca-split-salto-drop" },
  { from: "figure-eight-single-footlock", to: "figure-four-drop" },

  // === SINGLE FOOTLOCK DOUBLE SILK ===
  { from: "figure-eight-single-footlock", to: "gazelle" },
  { from: "figure-eight-single-footlock", to: "candy-cane-rollup" },

  // === DOUBLE FOOTLOCK SEQUENCES ===
  { from: "figure-eight-double-footlock", to: "split-rollup" },
  { from: "split-rollup", to: "crossback-straddle" },
  { from: "crossback-straddle", to: "belay", notes: "Hook outside leg, undo footlock, belay" },

  // === WHEEL DOWN → RESET ===
  { from: "wheel-down", to: "french-climb", notes: "Back to the top" },

  // === HAMMOCK SEQUENCES ===
  { from: "hammock-straddle", to: "hammock-outside-in-hook" },
  { from: "hammock-straddle", to: "hammock-inside-out-hook" },
  { from: "hammock-straddle", to: "hammock-both-fabric-hook" },
  { from: "hammock-outside-in-hook", to: "hammock-diaper-wrap" },
  { from: "hammock-both-fabric-hook", to: "hammock-diaper-wrap" },
  { from: "hammock-diaper-wrap", to: "hammock-both-fabric-hook", notes: "Lean to side, hook both fabric" },
  { from: "hammock-straddle", to: "hammock-standing-sequence" },
  { from: "hammock-standing-sequence", to: "hammock-straddle" },

  // === LYRA SEQUENCES ===
  { from: "lyra-peter-pan", to: "lyra-gazelle" },
  { from: "lyra-gazelle", to: "lyra-man-on-moon" },
  { from: "lyra-peter-pan", to: "lyra-man-on-moon" },
  { from: "lyra-gazelle", to: "lyra-meathook" },

  // === ROPE SEQUENCES ===
  // Rope shares silks sequences (techniques have apparatus: ["silks", "rope"])
  // excluding split-silk moves. No additional rope-specific edges needed.
];

// Example saved sequences to show in the UI
export const exampleSequences = [
  {
    id: "classic-silks-flow",
    name: "Classic Silks Flow",
    techniqueIds: [
      "french-climb",
      "inversion",
      "same-side-hook",
      "catchers-wrap",
      "tik-tok",
      "s-wrap-closed",
      "split-silk",
      "back-dive",
      "s-wrap-closed",
      "wheel-down",
    ],
  },
  {
    id: "catchers-star-combo",
    name: "Catchers → Star Drop",
    techniqueIds: [
      "french-climb",
      "inversion",
      "same-side-hook",
      "catchers-wrap",
      "belly-wrap",
      "salto",
      "star-drop",
    ],
  },
  {
    id: "z-wrap-infinity",
    name: "Z-Wrap to Infinity",
    techniqueIds: [
      "french-climb",
      "inversion",
      "opposite-side-hook",
      "z-wrap",
      "infinity-drop",
      "wheel-down",
    ],
  },
  {
    id: "footlock-exploration",
    name: "Footlock Exploration",
    techniqueIds: [
      "french-climb",
      "figure-eight-single-footlock",
      "rebecca-split",
      "rebecca-split-salto-drop",
    ],
  },
  {
    id: "hammock-flow",
    name: "Hammock Flow",
    techniqueIds: [
      "hammock-straddle",
      "hammock-outside-in-hook",
      "hammock-diaper-wrap",
      "hammock-both-fabric-hook",
    ],
  },
];
