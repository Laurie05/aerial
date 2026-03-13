import { ProgressionEdge } from "@/types";

// Progression edges define prerequisites: "from" must be learned before "to"
export const progressionEdges: ProgressionEdge[] = [
  // === CLIMB FOUNDATIONS ===
  { from: "french-climb", to: "double-ankle-hang" },
  { from: "french-climb", to: "figure-eight-single-footlock" },
  { from: "french-climb", to: "figure-eight-double-footlock" },
  { from: "french-climb", to: "inversion" },

  { from: "russian-climb", to: "hip-key" },
  { from: "bicycle-climb", to: "figure-eight-single-footlock" },

  // === INVERSION BRANCHES ===
  { from: "inversion", to: "same-side-hook" },
  { from: "inversion", to: "opposite-side-hook" },
  { from: "inversion", to: "meathook" },

  // === SAME-SIDE HOOK BRANCH ===
  { from: "same-side-hook", to: "thigh-hitch" },
  { from: "same-side-hook", to: "catchers-wrap" },
  { from: "same-side-hook", to: "back-balance" },

  // === OPPOSITE-SIDE HOOK BRANCH ===
  { from: "opposite-side-hook", to: "hip-key" },
  { from: "opposite-side-hook", to: "z-wrap" },
  { from: "opposite-side-hook", to: "back-balance" },
  { from: "opposite-side-hook", to: "front-balance" },

  // === CATCHERS WRAP SEQUENCES ===
  { from: "catchers-wrap", to: "tik-tok" },
  { from: "catchers-wrap", to: "s-wrap-closed" },
  { from: "catchers-wrap", to: "belly-wrap" },
  { from: "catchers-wrap", to: "pencil-drop" },

  // Catchers → belly wrap → star drop / salto
  { from: "belly-wrap", to: "star-drop" },
  { from: "belly-wrap", to: "salto" },
  { from: "salto", to: "star-drop" },

  // === TIK-TOK → S-WRAP ===
  { from: "tik-tok", to: "s-wrap-closed" },
  { from: "tik-tok", to: "s-wrap-open" },

  // === Z-WRAP BRANCH ===
  { from: "z-wrap", to: "infinity-drop" },
  { from: "infinity-drop", to: "wheel-down" },

  // === S-WRAP (CLOSED) BRANCH ===
  { from: "s-wrap-closed", to: "wheel-down" },
  { from: "s-wrap-closed", to: "split-silk" },
  { from: "s-wrap-closed", to: "double-star" },
  { from: "s-wrap-closed", to: "no-hand-wheel-down" },
  { from: "split-silk", to: "back-dive" },
  { from: "back-dive", to: "wheel-down" },

  // === S-WRAP (OPEN) BRANCH ===
  { from: "s-wrap-open", to: "belly-wrap" },
  { from: "s-wrap-open", to: "debele-drop" },

  // === S-WRAP ENTRIES ===
  { from: "lasso-entry", to: "s-wrap-closed" },
  { from: "lasso-entry", to: "s-wrap-open" },
  { from: "beats-entry", to: "s-wrap-closed" },
  { from: "beats-entry", to: "s-wrap-open" },
  { from: "back-tuck-entry", to: "s-wrap-closed" },
  { from: "back-tuck-entry", to: "s-wrap-open" },
  { from: "rollup-entry", to: "s-wrap-closed" },
  { from: "rollup-entry", to: "s-wrap-open" },

  // === HIP KEY BRANCH ===
  { from: "hip-key", to: "thigh-hitch" },
  { from: "hip-key", to: "split-silk" },
  { from: "hip-key", to: "swing-seat" },
  { from: "split-silk", to: "swing-seat" },

  // === FRONT/BACK BALANCE ===
  { from: "front-balance", to: "back-balance" },
  { from: "front-balance", to: "meathook" },

  // === FOOT LOCK BRANCHES ===
  // Single footlock single silk
  { from: "figure-eight-single-footlock", to: "rebecca-split" },
  { from: "figure-eight-single-footlock", to: "belay" },
  { from: "figure-eight-single-footlock", to: "music-box-rolls" },
  { from: "figure-eight-single-footlock", to: "figure-four-drop" },
  { from: "rebecca-split", to: "rebecca-split-salto-drop" },

  // Single footlock double silk
  { from: "figure-eight-single-footlock", to: "gazelle" },
  { from: "figure-eight-single-footlock", to: "candy-cane-rollup" },

  // Double footlock
  { from: "figure-eight-double-footlock", to: "crossback-straddle" },
  { from: "figure-eight-double-footlock", to: "split-rollup" },
  { from: "figure-eight-double-footlock", to: "belay" },
  { from: "crossback-straddle", to: "belay" },

  // Other locks
  { from: "figure-eight-single-footlock", to: "dancer-footlock" },

  // === HAMMOCK PROGRESSIONS ===
  { from: "hammock-straddle", to: "hammock-outside-in-hook" },
  { from: "hammock-straddle", to: "hammock-inside-out-hook" },
  { from: "hammock-straddle", to: "hammock-both-fabric-hook" },
  { from: "hammock-outside-in-hook", to: "hammock-diaper-wrap" },
  { from: "hammock-both-fabric-hook", to: "hammock-diaper-wrap" },
  { from: "hammock-straddle", to: "hammock-standing-sequence" },

  // === LYRA PROGRESSIONS ===
  { from: "inversion", to: "lyra-peter-pan" },
  { from: "lyra-peter-pan", to: "lyra-gazelle" },
  { from: "lyra-peter-pan", to: "lyra-man-on-moon" },
  { from: "lyra-gazelle", to: "lyra-meathook" },

  // === ROPE PROGRESSIONS ===
  { from: "french-climb", to: "rope-hip-key" },
  { from: "russian-climb", to: "rope-hip-key" },
  { from: "rope-hip-key", to: "rope-s-wrap" },
];
