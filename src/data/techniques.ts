import { Technique } from "@/types";
import { silksTechniques } from "./silks-techniques";
import { lyraTechniques } from "./lyra-techniques";
import { hammockTechniques } from "./hammock-techniques";
import { ropeTechniques } from "./rope-techniques";

export const techniques: Technique[] = [
  ...silksTechniques,
  ...lyraTechniques,
  ...hammockTechniques,
  ...ropeTechniques,
];
