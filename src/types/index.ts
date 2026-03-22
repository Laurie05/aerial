export type Difficulty = "beginner" | "intermediate" | "advanced" | "elite";

export type Apparatus = "silks" | "lyra" | "hammock" | "rope";

export type Category =
  | "wraps"
  | "drops"
  | "climbs"
  | "locks"
  | "poses"
  | "transitions"
  | "entries";

export type Style =
  | "flexibility"
  | "strength"
  | "balance"
  | "dynamic";

export interface Technique {
  id: string;
  name: string;
  aliases: string[];
  apparatus: Apparatus[];
  category: Category;
  difficulty: Difficulty;
  description: string;
  cues: string[];
  imageUrl?: string;
  videoUrl?: string;
  style?: Style;
}

export interface ProgressionEdge {
  from: string;
  to: string;
}

export interface SequenceEdge {
  from: string;
  to: string;
  notes?: string;
  oneWay?: boolean;
}

export interface Studio {
  id: string;
  name: string;
  lat: number;
  lng: number;
  city: string;
  country: string;
  website?: string;
  address?: string;
  ceilingHeight?: string;
  types: ("silks" | "trapeze" | "lyra" | "rope" | "hammock" | "straps" | "pole" | "handstand" | "acrobatics" | "spanish-web" | "flying-trapeze")[];
}

export interface UserProgress {
  visitorId: string;
  completedTechniques: string[];
  homeStudioId?: string;
  savedSequences: SavedSequence[];
}

export interface SavedSequence {
  id: string;
  name: string;
  techniqueIds: string[];
  createdAt: string;
}
