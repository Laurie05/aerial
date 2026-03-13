import Fuse, { IFuseOptions } from "fuse.js";
import { Technique, Category, Difficulty } from "@/types";

const fuseOptions: IFuseOptions<Technique> = {
  keys: [
    { name: "name", weight: 2 },
    { name: "aliases", weight: 1.5 },
    { name: "description", weight: 0.5 },
  ],
  threshold: 0.3,
  includeScore: true,
};

export function searchTechniques(
  techniques: Technique[],
  query: string,
  filters: {
    categories?: Category[];
    difficulties?: Difficulty[];
  }
): Technique[] {
  let results = techniques;

  // Apply text search
  if (query.trim()) {
    const fuse = new Fuse(techniques, fuseOptions);
    results = fuse.search(query).map((r) => r.item);
  }

  // Apply category filter
  if (filters.categories && filters.categories.length > 0) {
    results = results.filter((t) => filters.categories!.includes(t.category));
  }

  // Apply difficulty filter
  if (filters.difficulties && filters.difficulties.length > 0) {
    results = results.filter((t) =>
      filters.difficulties!.includes(t.difficulty)
    );
  }

  return results;
}
