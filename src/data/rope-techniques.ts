import { Technique } from "@/types";

export const ropeTechniques: Technique[] = [
  {
    id: "rope-hip-key",
    name: "Rope Hip Key",
    aliases: ["hip key on rope"],
    apparatus: ["rope"],
    category: "wraps",
    difficulty: "beginner",
    description:
      "The hip key performed on rope. Same concept as silks but on a single apparatus — rope techniques are essentially silks without split-silk movements.",
    cues: [
      "Hook leg over the rope",
      "Thread behind the back",
      "Sit into the wrap at the hip",
      "Secure before releasing hands",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_rope_hip_key",
  },
  {
    id: "rope-s-wrap",
    name: "S-Wrap",
    aliases: ["s-wrap"],
    apparatus: ["rope"],
    category: "wraps",
    difficulty: "intermediate",
    description:
      "The s-wrap performed on rope. Creates the same S-shape pattern as on silks.",
    cues: [
      "From hip key",
      "Thread the rope over the shoulder",
      "Around the back",
      "Creates an S-shape",
    ],
    videoUrl: "https://www.youtube.com/watch?v=REPLACE_rope_s_wrap",
  },
];
