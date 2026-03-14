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
  { from: "catchers-wrap", to: "tick tock" },
  { from: "catchers-wrap", to: "s-wrap-closed" },
  { from: "catchers-wrap", to: "belly-wrap" },
  { from: "catchers-wrap", to: "pencil-drop" },

  // Catchers → belly wrap → star drop / salto
  { from: "belly-wrap", to: "star-drop" },
  { from: "belly-wrap", to: "salto" },
  { from: "salto", to: "star-drop" },

  // === TICK TOCK → S-WRAP ===
  { from: "tick tock", to: "s-wrap-closed" },
  { from: "tick tock", to: "s-wrap-open" },

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
  // Rope shares silks progressions (techniques have apparatus: ["silks", "rope"])
  // excluding split-silk moves. No additional rope-specific edges needed.

  // // =====================================================================
  // // POSA SILKS PROGRESSIONS
  // // =====================================================================

  // // --- Silks Group A: Flexibility (160° → 180° pairs) ---
  // { from: "posa-sa001-split-on-knots-160", to: "posa-sa002-split-on-knots-180" },
  // { from: "posa-sa004-split-with-wrapping-160", to: "posa-sa005-split-with-wrapping-180" },
  // { from: "posa-sa006-t-split-160", to: "posa-sa007-t-split-180" },
  // { from: "posa-sa008-t-split-separate-silks-160", to: "posa-sa009-t-split-separate-silks-180" },
  // { from: "posa-sa010-reversed-candle-160", to: "posa-sa011-reversed-candle-180" },
  // { from: "posa-sa012-pin-160", to: "posa-sa013-pin-180" },
  // { from: "posa-sa043-bow-and-arrows-160", to: "posa-sa030-bow-and-arrows-180" },
  // { from: "posa-sa026-cocon-160", to: "posa-sa038-cocoon-180-extended" },

  // // --- Silks Group A: Flexibility (logical progressions) ---
  // { from: "posa-sa006-t-split-160", to: "posa-sa008-t-split-separate-silks-160" },
  // { from: "posa-sa007-t-split-180", to: "posa-sa009-t-split-separate-silks-180" },
  // { from: "posa-sa044-ring-legs-contact-head", to: "posa-sa019-ring-legs-contact-shoulders" },
  // { from: "posa-sa016-cupid-180", to: "posa-sa017-cupid-separate-silks-180" },
  // { from: "posa-sa017-cupid-separate-silks-180", to: "posa-sa025-cupid-leg-grabbed-180" },
  // { from: "posa-sa041-tulip-180", to: "posa-sa042-tulip-extended-180" },
  // { from: "posa-sa035-peacock-180", to: "posa-sa036-peacock-extended-180" },
  // { from: "posa-sa027-tie-180", to: "posa-sa039-tie-extended-180" },

  // // --- Silks Group B: Strength (logical progressions) ---
  // { from: "posa-sb001-hang-cross-diagonal", to: "posa-sb002-hang-cross-straight" },
  // { from: "posa-sb049-peter-pan-with-support", to: "posa-sb050-peter-pan" },
  // { from: "posa-sb006-flag", to: "posa-sb039-one-arm-flag" },
  // { from: "posa-sb031-butterfly", to: "posa-sb040-one-arm-butterfly" },
  // { from: "posa-sb053-hand-rail-tuck", to: "posa-sb011-hand-rail" },
  // { from: "posa-sb015-gallows-separated-silks", to: "posa-sb030-gallows-joined-silks" },
  // { from: "posa-sb016-toreador", to: "posa-sb041-toreador-arm-parallel" },

  // // Belly Support Plank progression: tuck → V → pencil
  // { from: "posa-sb009-belly-support-plank-tuck", to: "posa-sb019-belly-support-plank-v" },
  // { from: "posa-sb019-belly-support-plank-v", to: "posa-sb021-belly-support-plank-pencil" },

  // // Horizon progression: children's → tuck → pencil
  // { from: "posa-sb003-childrens-horizon", to: "posa-sb013-tuck-horizon" },
  // { from: "posa-sb013-tuck-horizon", to: "posa-sb026-pencil-horizon" },

  // // Reversed Horizon progression
  // { from: "posa-sb014-reversed-tuck-horizon", to: "posa-sb025-reversed-horizon-one-leg-bent" },
  // { from: "posa-sb025-reversed-horizon-one-leg-bent", to: "posa-sb027-reverse-horizon-feet-together" },

  // // V-Back Horizon → Back Horizon
  // { from: "posa-sb018-v-back-horizon", to: "posa-sb020-back-horizon" },

  // // Laying → Back Laying + transitions
  // { from: "posa-sb004-laying", to: "posa-sb012-back-laying" },
  // { from: "posa-sb012-back-laying", to: "posa-sb024-back-laying-to-laying-transition" },
  // { from: "posa-sb004-laying", to: "posa-sb042-laying-to-back-laying-transition" },

  // // Rodionova Starfish progression
  // { from: "posa-sb046-rodionova-starfish-spirally", to: "posa-sb047-rodionova-starfish" },
  // { from: "posa-sb047-rodionova-starfish", to: "posa-sb036-rodionova-180" },

  // // Deadlift progression
  // { from: "posa-sb043-deadlift-basic-grip", to: "posa-sb038-deadlift-basic-grip-extended" },
  // { from: "posa-sb038-deadlift-basic-grip-extended", to: "posa-sb034-deadlift-skewer" },

  // // Vetruvian progression
  // { from: "posa-sb033-vetruvian-v", to: "posa-sb035-vetruvian-legs-together" },

  // // V-Horizon normal/reversed pair
  // { from: "posa-sb022-v-horizon", to: "posa-sb023-reversed-v-horizon" },

  // // --- Silks Group C: Balance (logical progressions) ---
  // // Stretching in knot 160 → 180
  // { from: "posa-sc039-stretching-in-knot-160", to: "posa-sc037-stretching-in-knot-180" },

  // // Russian Split progression
  // { from: "posa-sc029-russian-split-160", to: "posa-sc007-russian-split-180" },
  // { from: "posa-sc007-russian-split-180", to: "posa-sc008-russian-split-180-parallel" },

  // // Reversed Balance progression
  // { from: "posa-sc004-reversed-balance-180", to: "posa-sc005-reversed-balance-180-leg-held" },

  // // Pin progression: two hands → one hand
  // { from: "posa-sc032-pin-two-hands-180", to: "posa-sc031-pin-180" },

  // // Handstand progression
  // { from: "posa-sc015-handstand-in-knot", to: "posa-sc009-handstand-spirally-wrapping-160" },
  // { from: "posa-sc009-handstand-spirally-wrapping-160", to: "posa-sc010-handstand-in-bend" },
  // { from: "posa-sc010-handstand-in-bend", to: "posa-sc022-handstand-ring" },
  // { from: "posa-sc022-handstand-ring", to: "posa-sc024-handstand-ring-arms-sideways" },

  // // Forward Split Balance progression
  // { from: "posa-sc011-forward-split-balance-spiral-180", to: "posa-sc014-forward-split-balance-knots-180" },

  // // Middle Split Balance progression
  // { from: "posa-sc013-middle-split-balance-spiral-180", to: "posa-sc017-middle-split-balance-knot-180" },

  // // Transition progressions
  // { from: "posa-sc019-transition-to-split-180", to: "posa-sc027-transition-forward-to-middle-split-spiral-180" },
  // { from: "posa-sc027-transition-forward-to-middle-split-spiral-180", to: "posa-sc028-transition-forward-to-middle-split-knots-180" },
  // { from: "posa-sc019-transition-to-split-180", to: "posa-sc033-transition-to-middle-split-180" },
  // { from: "posa-sc033-transition-to-middle-split-180", to: "posa-sc034-transition-to-forward-split-180-turnover" },

  // // Goryacheva Crocodile progression
  // { from: "posa-sc026-goryacheva-crocodile-v", to: "posa-sc030-goryacheva-crocodile-legs-together" },

  // // --- Silks Group D: Dynamic (logical progressions) ---
  // // Turnover progression: 1 → 2 → 3
  // { from: "posa-sd002-drop-1-turnover", to: "posa-sd004-drop-2-turnovers" },
  // { from: "posa-sd004-drop-2-turnovers", to: "posa-sd010-drop-3-turnovers" },

  // // Phase change forward progression
  // { from: "posa-sd003-drop-1-turnover-phase-change-forward", to: "posa-sd005-drop-2-turnovers-phase-change-forward" },

  // // Phase change backward progression
  // { from: "posa-sd007-drop-1-turnover-phase-change-backwards", to: "posa-sd008-drop-2-turnovers-phase-change-backwards" },

  // // Turnover → phase changes
  // { from: "posa-sd002-drop-1-turnover", to: "posa-sd003-drop-1-turnover-phase-change-forward" },
  // { from: "posa-sd002-drop-1-turnover", to: "posa-sd007-drop-1-turnover-phase-change-backwards" },

  // // Figure of 8 knot progression
  // { from: "posa-sd001-drop-figure-of-8-knot", to: "posa-sd011-drop-figure-of-8-knot-half-turnover" },

  // // Slip progression
  // { from: "posa-sd012-slip", to: "posa-sd023-slip-harakiri" },

  // // Back flip progression
  // { from: "posa-sd006-drop-back-flip", to: "posa-sd026-back-flip-floor-based" },
  // { from: "posa-sd026-back-flip-floor-based", to: "posa-sd025-back-flip-to-floor" },
  // { from: "posa-sd025-back-flip-to-floor", to: "posa-sd021-back-flip-on-silk" },

  // // Windmill progression
  // { from: "posa-sd016-windmill-720", to: "posa-sd024-windmill-1080" },

  // // =====================================================================
  // // POSA LYRA (HOOP) PROGRESSIONS
  // // =====================================================================

  // // --- Lyra Group A: Flexibility (160° → 180° pairs) ---
  // { from: "posa-ha001-middle-split-hang-160", to: "posa-ha002-middle-split-hang-180" },
  // { from: "posa-ha003-split-arms-not-in-contact-160", to: "posa-ha004-split-arms-not-in-contact-180" },
  // { from: "posa-ha006-chinese-chopsticks-leg-bent-160", to: "posa-ha007-chinese-chopsticks-leg-bent-180" },
  // { from: "posa-ha007-chinese-chopsticks-leg-bent-180", to: "posa-ha010-chinese-chopsticks-180" },
  // { from: "posa-ha008-elbow-split-160", to: "posa-ha009-elbow-split-180" },
  // { from: "posa-ha023-ring-upside-down-160", to: "posa-ha034-ring-upside-down-180" },
  // { from: "posa-ha052-batman-160", to: "posa-ha051-batman-180" },
  // { from: "posa-ha049-unicorn-160", to: "posa-ha048-unicorn-180" },
  // { from: "posa-ha050-russian-split-160", to: "posa-ha045-russian-split-180" },
  // { from: "posa-ha038-yudina-160", to: "posa-ha039-yudina-180" },
  // { from: "posa-ha024-bilman-in-forearm-160", to: "posa-ha027-bilman-in-forearm-180" },
  // { from: "posa-ha022-bird-of-paradise-160", to: "posa-ha028-bird-of-paradise-180" },
  // { from: "posa-ha026-bilman-upside-down-160", to: "posa-ha037-bilman-upside-down-180" },
  // { from: "posa-ha005-boat-v-position-160", to: "posa-ha014-boat-180" },

  // // --- Lyra Group A: Flexibility (logical progressions) ---
  // { from: "posa-ha037-bilman-upside-down-180", to: "posa-ha015-bilman-180" },
  // { from: "posa-ha015-bilman-180", to: "posa-ha016-bilman-180-extended" },
  // { from: "posa-ha011-supportive-split-180", to: "posa-ha036-supportive-split-180-extended" },
  // { from: "posa-ha012-iguana", to: "posa-ha013-iguana-locked" },
  // { from: "posa-ha053-parachutist", to: "posa-ha054-super-parachutist" },
  // { from: "posa-ha031-peacock", to: "posa-ha033-super-peacock" },
  // { from: "posa-ha029-aim-180", to: "posa-ha035-aim-180-legs-extended" },
  // { from: "posa-ha018-swan-160", to: "posa-ha019-swan-in-bilman-160" },

  // // --- Lyra Group B: Strength (logical progressions) ---
  // // Elbow Hang progression
  // { from: "posa-hb002-elbow-hang", to: "posa-hb031-elbow-hang-advanced" },
  // { from: "posa-hb031-elbow-hang-advanced", to: "posa-hb006-elbow-hang-deer" },

  // // Knee Hang progression
  // { from: "posa-hb032-knee-hang-with-support", to: "posa-hb004-knee-hang" },

  // // Footsteps Hang progression
  // { from: "posa-hb022-footsteps-hang-in-bend", to: "posa-hb023-footsteps-hang" },

  // // Horizon progression: legs bent → one leg bent → full
  // { from: "posa-hb008-horizon-legs-bent", to: "posa-hb013-horizon-one-leg-bent" },
  // { from: "posa-hb013-horizon-one-leg-bent", to: "posa-hb017-horizon" },

  // // Reversed Horizon progression
  // { from: "posa-hb009-reversed-horizon-legs-bent", to: "posa-hb028-reversed-horizon-one-leg-bent" },
  // { from: "posa-hb028-reversed-horizon-one-leg-bent", to: "posa-hb018-reversed-horizon" },

  // // Horizon V normal/reversed pair
  // { from: "posa-hb014-horizon-v", to: "posa-hb015-reversed-horizon-v-position" },

  // // Laying → Reversed Laying + transition
  // { from: "posa-hb007-laying", to: "posa-hb011-reversed-laying" },
  // { from: "posa-hb011-reversed-laying", to: "posa-hb016-transition-reversed-laying-to-laying" },

  // // Reversed Laying Biellman progression
  // { from: "posa-hb012-reversed-laying-with-leg-in-biellman", to: "posa-hb029-reversed-laying-extended-biellman" },

  // // Superpain progression
  // { from: "posa-hb026-superpain", to: "posa-hb030-superpain-in-biellman" },

  // // --- Lyra Group C: Balance (logical progressions) ---
  // // Hip Balance progression
  // { from: "posa-hc018-hip-balance-160", to: "posa-hc025-hip-balance-no-hands-180" },

  // // Scorpion progression
  // { from: "posa-hc020-scorpion-160", to: "posa-hc024-scorpion-locked-180" },

  // // Pin progression
  // { from: "posa-hc017-pin", to: "posa-hc023-pin-in-v-position" },

  // // Shoulders Handstand progression
  // { from: "posa-hc016-shoulders-handstand", to: "posa-hc021-shoulders-handstand-legs-one-side" },

  // // Shoulders Support progression
  // { from: "posa-hc019-shoulders-support-legs-different-sides", to: "posa-hc026-shoulders-support-legs-one-side" },

  // // Balance Angle progression
  // { from: "posa-hc003-balance-angle", to: "posa-hc022-balance-angle-shoulders-neck-contact" },

  // // Crossbow progression
  // { from: "posa-hc034-crossbow", to: "posa-hc035-crossbow-extended" },

  // // Bat progression
  // { from: "posa-hc014-bat", to: "posa-hc029-one-leg-bat" },
  // { from: "posa-hc014-bat", to: "posa-hc031-bat-in-biellman" },

  // // Helicopter progression
  // { from: "posa-hc011-helicopter", to: "posa-hc012-super-helicopter-180" },

  // // Venson Split progression
  // { from: "posa-hc009-venson-split-with-support", to: "posa-hc013-venson-split" },

  // // Crocodile progression
  // { from: "posa-hc027-v-crocodile", to: "posa-hc030-crocodile-legs-joint" },

  // // --- Lyra Group D: Dynamic (logical progressions) ---
  // // Turnover progression
  // { from: "posa-hd001-turnover-forward", to: "posa-hd002-turnover-backwards" },
  // { from: "posa-hd001-turnover-forward", to: "posa-hd006-turnover-forward-pike" },
  // { from: "posa-hd006-turnover-forward-pike", to: "posa-hd007-turnover-forward-pike-no-hands" },
  // { from: "posa-hd007-turnover-forward-pike-no-hands", to: "posa-hd005-turnover-forward-drop-v-position" },

  // // Clock progression
  // { from: "posa-hd018-clock-forward", to: "posa-hd019-clock-backwards" },

  // // Perch Drop progression
  // { from: "posa-hd003-drop-upper-to-lower-perch", to: "posa-hd004-drop-upper-to-lower-perch-v-position" },

  // // Backwards Flip progression
  // { from: "posa-hd010-backwards-flip-lower-perch", to: "posa-hd012-backwards-flip-lower-perch-angle" },
];
