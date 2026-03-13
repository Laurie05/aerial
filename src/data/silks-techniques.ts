import { Technique } from "@/types";

export const silksTechniques: Technique[] = [
  // =============================================
  // CLIMBS
  // =============================================
  {
    id: "french-climb",
    name: "French Climb",
    aliases: ["basic climb", "standard climb"],
    apparatus: ["silks"],
    category: "climbs",
    difficulty: "beginner",
    description:
      "The foundational climb in aerial silks. Stand on the fabric wrapped around one foot, secure with the other foot, then stand and reach higher.",
    cues: [
      "Reach high with both hands",
      "Step onto the silk with one foot",
      "Lock the silk with the other foot on top",
      "Stand up tall, then re-reach",
    ],
    videoUrl: "https://www.youtube.com/watch?v=7MW5_rKzaXk",
  },
  {
    id: "russian-climb",
    name: "Russian Climb",
    aliases: ["rope climb"],
    apparatus: ["silks"],
    category: "climbs",
    difficulty: "intermediate",
    description:
      "A faster, more advanced climb using a wrapping motion around the leg. Leads naturally into hip key.",
    cues: [
      "Wrap the silk around one leg from inside to outside",
      "Stand on the wrapped leg",
      "Reach high and repeat",
    ],
    videoUrl: "https://www.youtube.com/watch?v=kSy9tB0pYpw",
  },
  {
    id: "bicycle-climb",
    name: "Bicycle Climb",
    aliases: ["pedal climb"],
    apparatus: ["silks"],
    category: "climbs",
    difficulty: "intermediate",
    description:
      "A climb using alternating leg pedaling motions. Leads into figure eight single foot lock.",
    cues: [
      "Separate the silks",
      "Pedal each leg alternately through the silks",
      "Stand on each wrap as you go",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_bicycle_climb",
  },
  {
    id: "straddle-climb",
    name: "Straddle Climb",
    aliases: ["star climb"],
    apparatus: ["silks"],
    category: "climbs",
    difficulty: "intermediate",
    description:
      "A climb performed with legs in straddle position, using core and upper body strength.",
    cues: [
      "Grip high with both hands",
      "Straddle legs wide around the silks",
      "Squeeze legs and stand up",
      "Re-reach and repeat",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_straddle_climb",
  },
  {
    id: "sissone-climb",
    name: "Sissone Climb",
    aliases: ["scissor climb"],
    apparatus: ["silks"],
    category: "climbs",
    difficulty: "advanced",
    description:
      "An elegant climbing technique with a scissoring leg motion, combining strength with grace.",
    cues: [
      "Grip high",
      "Scissor legs through the silks",
      "Use momentum from the scissor to gain height",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_sissone_climb",
  },
  {
    id: "russian-flirt",
    name: "Russian Flirt",
    aliases: ["flirt climb"],
    apparatus: ["silks"],
    category: "climbs",
    difficulty: "advanced",
    description:
      "A stylized variation of the Russian climb with a flirtatious leg extension between wraps.",
    cues: [
      "Begin with a Russian climb wrap",
      "Extend the free leg out with pointed toe",
      "Re-wrap and continue climbing",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_russian_flirt",
  },
  {
    id: "hipkey-climb",
    name: "Hip Key Climb",
    aliases: ["hip key entry climb"],
    apparatus: ["silks"],
    category: "climbs",
    difficulty: "intermediate",
    description:
      "Climbing using repeated hip key entries, gaining height with each hip key.",
    cues: [
      "Perform a hip key",
      "From hip key, reach higher",
      "Release and re-key at the new height",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_hipkey_climb",
  },

  // =============================================
  // LOCKS / FOOT LOCKS
  // =============================================
  {
    id: "figure-eight-single-footlock",
    name: "Figure Eight Single Foot Lock",
    aliases: ["single foot lock", "figure 8 footlock"],
    apparatus: ["silks"],
    category: "locks",
    difficulty: "beginner",
    description:
      "A lock on a single silk creating a figure-eight pattern around the foot. Foundation for many single-silk poses.",
    cues: [
      "Separate the silks",
      "Wrap one silk over the top of the foot",
      "Under the arch and around",
      "Step down to lock",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_figure_eight_single_footlock",
  },
  {
    id: "figure-eight-double-footlock",
    name: "Figure Eight Double Foot Lock",
    aliases: ["double foot lock", "two-foot lock"],
    apparatus: ["silks"],
    category: "locks",
    difficulty: "beginner",
    description:
      "Both feet locked in figure-eight wraps on separate silks, creating a secure standing platform.",
    cues: [
      "Separate the silks",
      "Lock each foot in its own silk with figure-eight wrap",
      "Stand evenly on both feet",
      "Engage core for balance",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_figure_eight_double_footlock",
  },
  {
    id: "dancer-footlock",
    name: "Dancer Foot Lock",
    aliases: ["dancer's lock"],
    apparatus: ["silks"],
    category: "locks",
    difficulty: "intermediate",
    description:
      "An elegant foot lock variation commonly used in dance-style aerial routines.",
    cues: [
      "Point the toe through the silk",
      "Wrap around the ankle with a dancer's line",
      "Secure by flexing the foot",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_dancer_footlock",
  },
  {
    id: "double-ankle-hang",
    name: "Double Ankle Hang",
    aliases: ["ankle hang"],
    apparatus: ["silks"],
    category: "locks",
    difficulty: "intermediate",
    description:
      "Hanging inverted from both ankles wrapped in the silks. Entered from a French climb.",
    cues: [
      "From an inverted position, wrap both ankles",
      "Slowly release hands",
      "Keep core engaged",
      "Arms extend down for balance",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_double_ankle_hang",
  },

  // =============================================
  // INVERSIONS & ENTRIES
  // =============================================
  {
    id: "inversion",
    name: "Inversion",
    aliases: ["basic inversion", "going upside down"],
    apparatus: ["silks"],
    category: "transitions",
    difficulty: "beginner",
    description:
      "The fundamental skill of going upside down on silks. Required for most intermediate and advanced moves.",
    cues: [
      "Engage core strongly",
      "Lift legs overhead",
      "Hook knees or straight legs through",
      "Control the flip with arm strength",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_inversion",
  },
  {
    id: "same-side-hook",
    name: "Same Side Hook",
    aliases: ["same leg hook"],
    apparatus: ["silks"],
    category: "entries",
    difficulty: "beginner",
    description:
      "From an inversion, hooking the same-side leg over the silk. Entry point for thigh hitch, catchers wrap, and back balance.",
    cues: [
      "Invert on the silks",
      "Hook the same-side leg over one silk",
      "Keep the other leg extended",
      "Secure the hook at the knee crease",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_same_side_hook",
  },
  {
    id: "opposite-side-hook",
    name: "Opposite Side Hook",
    aliases: ["opposite leg hook", "cross hook"],
    apparatus: ["silks"],
    category: "entries",
    difficulty: "beginner",
    description:
      "From an inversion, hooking the opposite-side leg. Entry point for hip key, z-wrap, back balance, and front balance.",
    cues: [
      "Invert on the silks",
      "Hook the opposite leg over the silk",
      "The silk should cross your body",
      "Secure at the knee crease",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_opposite_side_hook",
  },
  {
    id: "meathook",
    name: "Meathook",
    aliases: ["elbow hang"],
    apparatus: ["silks"],
    category: "entries",
    difficulty: "advanced",
    description:
      "A strength-intensive entry hanging from the elbow/armpit area on silks. Entry from inversion.",
    cues: [
      "From inversion, hook one arm deep into the silk",
      "Secure at the armpit/elbow crease",
      "Release legs to hang",
      "Requires significant upper body strength",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_meathook",
  },

  // =============================================
  // WRAPS
  // =============================================
  {
    id: "catchers-wrap",
    name: "Catchers Wrap",
    aliases: ["catcher", "catchers"],
    apparatus: ["silks"],
    category: "wraps",
    difficulty: "intermediate",
    description:
      "A secure wrapped position entered from same-side hook. Foundation for many sequences including tik-tok and s-wrap entries.",
    cues: [
      "From same-side hook, wrap the silk around the thigh",
      "Hook knees securely",
      "Release hands slowly",
      "Arch back with arms extended",
    ],
    videoUrl: "https://www.youtube.com/watch?v=EHi8GS-n4gg",
  },
  {
    id: "hip-key",
    name: "Hip Key",
    aliases: ["hip lock", "hiplock"],
    apparatus: ["silks"],
    category: "wraps",
    difficulty: "beginner",
    description:
      "A foundational wrap entered from opposite-side hook where the silk wraps around the hip. Leads to thigh hitch, split silk, and swing seat.",
    cues: [
      "From opposite-side hook",
      "Thread the silk behind your back",
      "Sit into the wrap",
      "The silk should cross at your hip",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_hip_key",
  },
  {
    id: "z-wrap",
    name: "Z-Wrap",
    aliases: ["z-lock"],
    apparatus: ["silks"],
    category: "wraps",
    difficulty: "intermediate",
    description:
      "A wrap entered from opposite-side hook creating a Z-shape. Leads to salto (infinity drop) and wheel down.",
    cues: [
      "From opposite-side hook",
      "Thread the silk to create a Z-pattern",
      "Secure by sitting into the wrap",
      "Check that all layers are flat",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_z_wrap",
  },
  {
    id: "thigh-hitch",
    name: "Thigh Hitch",
    aliases: ["thigh wrap"],
    apparatus: ["silks"],
    category: "wraps",
    difficulty: "intermediate",
    description:
      "A wrap around the thigh providing secure hold. Accessible from both same-side hook and hip key.",
    cues: [
      "Bring the silk around the thigh",
      "From inside to outside",
      "Secure by sitting into the wrap",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_thigh_hitch",
  },
  {
    id: "s-wrap-closed",
    name: "S-Wrap (Closed)",
    aliases: ["closed s-wrap", "S-lock closed"],
    apparatus: ["silks"],
    category: "wraps",
    difficulty: "intermediate",
    description:
      "A wrap creating an S-shape with the silk closed together. Leads to wheel down, split silk to back dive, double star, and no-hand wheel down with extra wrap.",
    cues: [
      "From catchers wrap or other entry",
      "Thread the silk over the shoulder",
      "Around the back keeping silks together",
      "The silk creates an S-shape around your body",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_s_wrap_closed",
  },
  {
    id: "s-wrap-open",
    name: "S-Wrap (Open)",
    aliases: ["open s-wrap", "split s-wrap"],
    apparatus: ["silks"],
    category: "wraps",
    difficulty: "intermediate",
    description:
      "An S-wrap with silks separated. Leads to infinite belly wraps and Debélé drops.",
    cues: [
      "From entry position, separate the silks",
      "Thread one silk over the shoulder",
      "The other silk wraps differently",
      "Creates an open S-shape",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_s_wrap_open",
  },
  {
    id: "belly-wrap",
    name: "Belly Wrap",
    aliases: ["belly roll"],
    apparatus: ["silks"],
    category: "wraps",
    difficulty: "intermediate",
    description:
      "A wrap around the torso/belly area. From catchers wrap, one round leads to star drop. Can be done infinitely from open s-wrap.",
    cues: [
      "From your position, roll the silk around the belly",
      "Keep tension throughout",
      "One round or multiple rounds depending on the sequence",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_belly_wrap",
  },
  {
    id: "front-balance",
    name: "Front Balance",
    aliases: ["front planche"],
    apparatus: ["silks"],
    category: "wraps",
    difficulty: "intermediate",
    description:
      "A face-down balanced position on the silks. Entered from opposite-side hook. Leads to back balance and meathook.",
    cues: [
      "From opposite-side hook, extend body face down",
      "Silk supports at the hips",
      "Arms extend forward",
      "Engage back muscles to hold position",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_front_balance",
  },
  {
    id: "back-balance",
    name: "Back Balance",
    aliases: ["back planche"],
    apparatus: ["silks"],
    category: "wraps",
    difficulty: "intermediate",
    description:
      "A face-up balanced position. Accessible from both same-side and opposite-side hook, and from front balance.",
    cues: [
      "From hook position, transition to face up",
      "Silk supports at the hips/lower back",
      "Arms extend to the sides",
      "Engage core to maintain position",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_back_balance",
  },
  {
    id: "cocoon",
    name: "Cocoon",
    aliases: ["mummy wrap", "silk cocoon"],
    apparatus: ["silks"],
    category: "wraps",
    difficulty: "intermediate",
    description:
      "A full-body wrap that encases the aerialist in silk, creating a dramatic visual effect.",
    cues: [
      "Begin spinning to wrap silk around the body",
      "Keep arms at sides or overhead",
      "Control the spin speed",
      "To exit, spin the opposite direction",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_cocoon",
  },
  {
    id: "split-silk",
    name: "Split Silk",
    aliases: ["splits on silk", "silk splits"],
    apparatus: ["silks"],
    category: "wraps",
    difficulty: "advanced",
    description:
      "A dramatic split with each leg on separate silk. From hip key, leads to swing seat and shapes. From closed s-wrap, leads to back dive.",
    cues: [
      "Separate the silks wide",
      "One silk supports each leg",
      "Slide into the split slowly",
      "Keep hands on silks for control",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_split_silk",
  },
  {
    id: "swing-seat",
    name: "Swing Seat",
    aliases: ["seated swing"],
    apparatus: ["silks"],
    category: "wraps",
    difficulty: "intermediate",
    description:
      "A seated position on the silks like a swing. Reached from hip key via split silk. Allows for various shapes.",
    cues: [
      "From split silk or hip key transition",
      "Sit into the silk like a swing",
      "Silk supports under the thighs",
      "Explore different shapes and arm positions",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_swing_seat",
  },

  // =============================================
  // DROPS
  // =============================================
  {
    id: "tik-tok",
    name: "Tik Tok",
    aliases: ["tick tock", "pendulum drop"],
    apparatus: ["silks"],
    category: "drops",
    difficulty: "advanced",
    description:
      "A pendulum-style drop from catchers wrap. Part of the classic catchers → tik-tok → s-wrap sequence.",
    cues: [
      "Set up in catchers wrap",
      "Build momentum with a swing",
      "Release at the peak of the swing",
      "Control the unwrap with body tension",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_tik_tok",
  },
  {
    id: "back-dive",
    name: "Back Dive",
    aliases: ["back balance drop"],
    apparatus: ["silks"],
    category: "drops",
    difficulty: "advanced",
    description:
      "A dramatic backward fall from a wrapped position. In sequence: split silk → back dive → s-wrap → wheel down.",
    cues: [
      "From a secure wrap, lean back",
      "Arms extend overhead",
      "Release the body backward",
      "Keep body tight through the drop",
      "Trust the wrap to catch you",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_back_dive",
  },
  {
    id: "star-drop",
    name: "Star Drop",
    aliases: ["star fall"],
    apparatus: ["silks"],
    category: "drops",
    difficulty: "elite",
    description:
      "A spectacular drop from catchers wrap with one round of belly wrap. Can be combined with salto: climb up to salto then salto + star drop.",
    cues: [
      "From catchers wrap with belly wrap",
      "Release into a star shape (arms and legs spread)",
      "Free-fall briefly before the silk catches",
      "Core must be engaged throughout",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_star_drop",
  },
  {
    id: "double-star",
    name: "Double Star",
    aliases: ["double star drop"],
    apparatus: ["silks"],
    category: "drops",
    difficulty: "elite",
    description:
      "An advanced variation from closed s-wrap with two rotations in star position during the drop.",
    cues: [
      "From closed s-wrap setup",
      "Release into star with extra wrap",
      "Two rotations before catch",
      "Requires precise setup and body tension",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_double_star",
  },
  {
    id: "wheel-down",
    name: "Wheel Down",
    aliases: ["barrel roll", "rolling descent"],
    apparatus: ["silks"],
    category: "drops",
    difficulty: "elite",
    description:
      "A controlled rotating descent. Reached from z-wrap or closed s-wrap. Classic finale: split silk → back dive → s-wrap → wheel down.",
    cues: [
      "From s-wrap or z-wrap, initiate rotation",
      "Control speed with arms and core",
      "Maintain body alignment through rotation",
      "Gradual descent rather than free fall",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_wheel_down",
  },
  {
    id: "no-hand-wheel-down",
    name: "No-Hand Wheel Down",
    aliases: ["hands-free wheel down"],
    apparatus: ["silks"],
    category: "drops",
    difficulty: "elite",
    description:
      "A wheel down performed hands-free. Requires an extra wrap around the pole from closed s-wrap for security.",
    cues: [
      "From closed s-wrap, add another wrap around the pole",
      "Release hands completely",
      "Initiate rotation with body",
      "Trust the extra wrap for security",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_no_hand_wheel_down",
  },
  {
    id: "salto",
    name: "Salto",
    aliases: ["aerial salto", "flip"],
    apparatus: ["silks"],
    category: "drops",
    difficulty: "elite",
    description:
      "A somersault/flip in the air. From catchers: climb up to salto, then can combine with star drop. From z-wrap: infinity drop to wheel down.",
    cues: [
      "From wrapped position, climb up for height",
      "Initiate the flip with core and momentum",
      "Maintain silk contact throughout",
      "Land in the next wrapped position",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_salto",
  },
  {
    id: "infinity-drop",
    name: "Infinity Drop",
    aliases: ["infinity salto"],
    apparatus: ["silks"],
    category: "drops",
    difficulty: "elite",
    description:
      "A salto from z-wrap that creates an infinity-like path. Leads into wheel down.",
    cues: [
      "From z-wrap, climb up for height",
      "Initiate salto",
      "The unwrap creates an infinity pattern",
      "Transition into wheel down",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_infinity_drop",
  },
  {
    id: "pencil-drop",
    name: "Pencil Drop",
    aliases: ["pencil fall"],
    apparatus: ["silks"],
    category: "drops",
    difficulty: "advanced",
    description:
      "A straight-body drop from catchers wrap. Part of the belly wrap sequence: key to right then pencil drop.",
    cues: [
      "From catchers wrap setup",
      "Keep body straight like a pencil",
      "Release and fall straight down",
      "Silk unwraps to catch you",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_pencil_drop",
  },
  {
    id: "debele-drop",
    name: "Debélé Drop",
    aliases: ["debeley", "debélé"],
    apparatus: ["silks"],
    category: "drops",
    difficulty: "advanced",
    description:
      "A drop from open s-wrap after belly wraps. Can be done as single or multiple drops.",
    cues: [
      "From open s-wrap with belly wraps",
      "Release into the drop",
      "The belly wraps unravel to catch",
      "Can chain multiple Debélé drops",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_debele_drop",
  },
  {
    id: "rebecca-split-salto-drop",
    name: "Rebecca Split Salto Drop",
    aliases: ["rebecca salto"],
    apparatus: ["silks"],
    category: "drops",
    difficulty: "elite",
    description:
      "A salto drop from the rebecca split position on single foot lock single silk.",
    cues: [
      "From rebecca split position",
      "Initiate salto rotation",
      "The footlock unwraps during the drop",
      "Land in the catch position",
    ],
    videoUrl: "https://www.youtube.com/shorts/wF5tZQjlvhw",
  },
  {
    id: "figure-four-drop",
    name: "Figure Four Drop",
    aliases: ["figure 4 drop"],
    apparatus: ["silks"],
    category: "drops",
    difficulty: "advanced",
    description:
      "From single foot lock single silk: hook other leg and split balance, then drop to figure four position.",
    cues: [
      "From single footlock, hook other leg",
      "Create split balance position",
      "Release into figure four",
      "Silk catches at the figure four",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_figure_four_drop",
  },

  // =============================================
  // S-WRAP ENTRIES
  // =============================================
  {
    id: "lasso-entry",
    name: "Lasso Entry",
    aliases: ["lasso"],
    apparatus: ["silks"],
    category: "entries",
    difficulty: "intermediate",
    description:
      "An entry into s-wrap using a lasso motion with the silk.",
    cues: [
      "Cast the silk in a lasso motion",
      "Catch and wrap around the body",
      "Settle into the s-wrap position",
    ],
    videoUrl: "https://www.youtube.com/shorts/imEUvIK_g7w",
  },
  {
    id: "beats-entry",
    name: "Beats Entry",
    aliases: ["beats"],
    apparatus: ["silks"],
    category: "entries",
    difficulty: "intermediate",
    description:
      "Entering s-wrap through beating (swinging) legs to build momentum.",
    cues: [
      "Swing legs forward and back (beats)",
      "Use the momentum to wrap",
      "Settle into s-wrap position",
    ],
    videoUrl: "https://www.youtube.com/watch?v=zIfIUgrqfCE",
  },
  {
    id: "back-tuck-entry",
    name: "Back Tuck Entry",
    aliases: ["back tuck to s-wrap"],
    apparatus: ["silks"],
    category: "entries",
    difficulty: "advanced",
    description:
      "A back tuck (backward somersault) used as a dynamic entry into the s-wrap.",
    cues: [
      "Build momentum",
      "Tuck backward into a somersault",
      "Catch the silk mid-rotation",
      "Land in s-wrap position",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_back_tuck_entry",
  },
  {
    id: "rollup-entry",
    name: "Roll-Up Entry",
    aliases: ["roll up to s-wrap"],
    apparatus: ["silks"],
    category: "entries",
    difficulty: "intermediate",
    description:
      "A controlled rolling motion used to enter the s-wrap from below.",
    cues: [
      "Start seated or lying back in the silk",
      "Engage core to roll upward",
      "Thread into the s-wrap as you roll",
      "Finish in s-wrap position",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_rollup_entry",
  },

  // =============================================
  // POSES
  // =============================================
  {
    id: "rebecca-split",
    name: "Rebecca Split",
    aliases: ["Rebecca"],
    apparatus: ["silks"],
    category: "poses",
    difficulty: "advanced",
    description:
      "A dramatic split pose from single foot lock on single silk. Can lead to rebecca split salto drop.",
    cues: [
      "From single footlock on one silk",
      "Extend into a split position",
      "Back leg wraps for support",
      "Arms reach for drama",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_rebecca_split",
  },
  {
    id: "gazelle",
    name: "Gazelle",
    aliases: ["gazelle pose"],
    apparatus: ["silks"],
    category: "poses",
    difficulty: "intermediate",
    description:
      "An elegant one-legged balance pose on silks, from single foot lock on double silk.",
    cues: [
      "From a foot lock, extend the free leg behind",
      "Arch the back",
      "Reach arms overhead or to the sides",
      "Create a long curved line",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_gazelle",
  },
  {
    id: "candy-cane-rollup",
    name: "Candy Cane Roll-Up",
    aliases: ["candy cane"],
    apparatus: ["silks"],
    category: "poses",
    difficulty: "intermediate",
    description:
      "A rolling pose from single foot lock on double silk, creating a candy-cane visual as you roll up.",
    cues: [
      "From single footlock on double silk",
      "Initiate a rolling motion upward",
      "Keep body alignment through the roll",
      "Finish in a wrapped candy-cane shape",
    ],
    videoUrl: "https://www.youtube.com/watch?v=i6h365e1prI",
  },
  {
    id: "belay",
    name: "Belay",
    aliases: ["belay wrap"],
    apparatus: ["silks"],
    category: "poses",
    difficulty: "intermediate",
    description:
      "A secure wrapped resting position. Accessible from single foot lock single silk or double foot lock.",
    cues: [
      "From footlock position",
      "Wrap the silk around the body for security",
      "Can release hands briefly",
      "Good resting position for recovery",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_belay",
  },
  {
    id: "music-box-rolls",
    name: "Music Box Rolls",
    aliases: ["music box"],
    apparatus: ["silks"],
    category: "poses",
    difficulty: "intermediate",
    description:
      "Spinning rolls from single foot lock on single silk, creating a music-box-like rotation.",
    cues: [
      "From single footlock on one silk",
      "Initiate a spin",
      "Keep body in a consistent shape",
      "Control the speed of rotation",
    ],
    videoUrl: "https://www.youtube.com/watch?v=OOmdQIMazig",
  },
  {
    id: "crossback-straddle",
    name: "Cross-Back Straddle",
    aliases: ["X on the back", "cross-back"],
    apparatus: ["silks"],
    category: "poses",
    difficulty: "beginner",
    description:
      "A foundational pose where silks cross behind the back and support a straddle. From double foot lock: split → split roll-ups → crossback straddle → hook outside leg → undo footlock → belay.",
    cues: [
      "From a straddle, take one silk in each hand",
      "Cross them behind your back",
      "Lean back into the cross",
      "Open legs into a wide straddle",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_crossback_straddle",
  },
  {
    id: "split-rollup",
    name: "Split Roll-Up",
    aliases: ["split rollup"],
    apparatus: ["silks"],
    category: "poses",
    difficulty: "intermediate",
    description:
      "A rolling motion from a split position on double foot locks, creating a dramatic visual.",
    cues: [
      "From double footlock split position",
      "Engage core to initiate the roll",
      "Keep legs in split throughout",
      "Return to starting position",
    ],
    videoUrl: "https://www.youtube.com/watch?v=IVbEEGBc26M",
  },
];
