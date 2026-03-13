import { Technique } from "@/types";

export const hammockTechniques: Technique[] = [
  {
    id: "hammock-straddle",
    name: "Straddle",
    aliases: ["straddle up", "upside down"],
    apparatus: ["hammock"],
    category: "poses",
    difficulty: "beginner",
    description:
      "A straddle position in the hammock. Three entry variations: hook outside in, hook inside out, or hook on both fabric.",
    cues: [
      "Sit in the hammock",
      "Open legs into a straddle",
      "Choose hook direction based on variation",
      "Keep core engaged for balance",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_hammock_straddle",
  },
  {
    id: "hammock-outside-in-hook",
    name: "Outside-In Hook",
    aliases: ["outside in straddle"],
    apparatus: ["hammock"],
    category: "entries",
    difficulty: "beginner",
    description:
      "Entering the hammock straddle by hooking legs from outside to inside.",
    cues: [
      "From standing, legs go outside the fabric",
      "Hook legs to the inside",
      "Sit into the straddle",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_hammock_outside_in_hook",
  },
  {
    id: "hammock-inside-out-hook",
    name: "Inside-Out Hook",
    aliases: ["inside out straddle"],
    apparatus: ["hammock"],
    category: "entries",
    difficulty: "beginner",
    description:
      "Entering the hammock straddle by hooking legs from inside to outside.",
    cues: [
      "From standing, legs start inside the fabric",
      "Hook legs to the outside",
      "Sit into the straddle",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_hammock_inside_out_hook",
  },
  {
    id: "hammock-both-fabric-hook",
    name: "Both Fabric Hook",
    aliases: ["double hook straddle"],
    apparatus: ["hammock"],
    category: "entries",
    difficulty: "intermediate",
    description:
      "Entering the hammock straddle by hooking on both layers of fabric.",
    cues: [
      "Engage both layers of the hammock",
      "Hook legs over both fabric pieces",
      "Sit into the straddle",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_hammock_both_fabric_hook",
  },
  {
    id: "hammock-diaper-wrap",
    name: "Diaper Wrap",
    aliases: ["diaper"],
    apparatus: ["hammock"],
    category: "wraps",
    difficulty: "intermediate",
    description:
      "A wrap in the hammock creating a secure 'diaper' around the hips. Reached from straddle with both legs outside-in, climb up to diaper wrap.",
    cues: [
      "From straddle with both legs outside-in",
      "Climb up within the hammock",
      "Wrap the fabric around the hips like a diaper",
      "Secure and arch back",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_hammock_diaper_wrap",
  },
  {
    id: "hammock-standing-sequence",
    name: "Standing Sequence",
    aliases: ["standing on hammock"],
    apparatus: ["hammock"],
    category: "poses",
    difficulty: "intermediate",
    description:
      "Standing on the hammock, hook one leg, straighten and point down. Foundation for many hammock sequences.",
    cues: [
      "Stand balanced on the hammock",
      "Hook one leg over the fabric",
      "Straighten the hooked leg pointing down",
      "Use arms for balance",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_hammock_standing_sequence",
  },
];
