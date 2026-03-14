"use client";

import { useState, useMemo } from "react";
import { techniques } from "@/data/techniques";
import { searchTechniques } from "@/lib/search";
import { Category, Difficulty, Style, Technique } from "@/types";
import { TechniqueCard } from "@/components/dictionary/TechniqueCard";
import { TechniqueDetail } from "@/components/dictionary/TechniqueDetail";
import { useApparatus } from "@/components/ApparatusContext";

const categories: Category[] = [
  "wraps",
  "drops",
  "climbs",
  "locks",
  "poses",
  "transitions",
  "entries",
];
const difficulties: Difficulty[] = [
  "beginner",
  "intermediate",
  "advanced",
  "elite",
];
const classifications: Style[] = [
  "flexibility",
  "strength",
  "balance",
  "dynamic",
];

export default function DictionaryPage() {
  const { apparatus } = useApparatus();
  const [query, setQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<
    Difficulty[]
  >([]);
  const [selectedClassifications, setSelectedClassifications] = useState<
    Style[]
  >([]);
  const [selectedTechnique, setSelectedTechnique] = useState<Technique | null>(
    null
  );

  const filteredByApparatus = useMemo(
    () => techniques.filter((t) => t.apparatus.includes(apparatus)),
    [apparatus]
  );

  const results = useMemo(() => {
    const searched = searchTechniques(filteredByApparatus, query, {
      categories: selectedCategories,
      difficulties: selectedDifficulties,
    });
    if (selectedClassifications.length === 0) return searched;
    return searched.filter(
      (t) =>
        t.style &&
        selectedClassifications.includes(t.style)
    );
  }, [filteredByApparatus, query, selectedCategories, selectedDifficulties, selectedClassifications]);

  const toggleCategory = (cat: Category) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleDifficulty = (diff: Difficulty) => {
    setSelectedDifficulties((prev) =>
      prev.includes(diff) ? prev.filter((d) => d !== diff) : [...prev, diff]
    );
  };

  const toggleClassification = (cls: Style) => {
    setSelectedClassifications((prev) =>
      prev.includes(cls) ? prev.filter((c) => c !== cls) : [...prev, cls]
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search techniques..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-white border border-purple-200 rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:border-aerial-500 focus:ring-1 focus:ring-aerial-500 transition-colors shadow-sm"
        />
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-4">
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          <span className="text-xs text-gray-500 uppercase tracking-wide self-center mr-1">
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                selectedCategories.includes(cat)
                  ? "bg-aerial-500 text-white"
                  : "bg-purple-50 text-gray-600 hover:text-gray-800 border border-purple-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          <span className="text-xs text-gray-500 uppercase tracking-wide self-center mr-1">
            Level:
          </span>
          {difficulties.map((diff) => (
            <button
              key={diff}
              onClick={() => toggleDifficulty(diff)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                selectedDifficulties.includes(diff)
                  ? "bg-silk-500 text-white"
                  : "bg-pink-50 text-gray-600 hover:text-gray-800 border border-pink-200"
              }`}
            >
              {diff}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          <span className="text-xs text-gray-500 uppercase tracking-wide self-center mr-1">
            Style:
          </span>
          {classifications.map((cls) => (
            <button
              key={cls}
              onClick={() => toggleClassification(cls)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                selectedClassifications.includes(cls)
                  ? "bg-fuchsia-500 text-white"
                  : "bg-fuchsia-50 text-gray-600 hover:text-gray-800 border border-fuchsia-200"
              }`}
            >
              {cls}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-4">
        {results.length} technique{results.length !== 1 ? "s" : ""}
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {results.map((technique) => (
          <TechniqueCard
            key={technique.id}
            technique={technique}
            onClick={() => setSelectedTechnique(technique)}
          />
        ))}
      </div>

      {/* Detail Modal */}
      {selectedTechnique && (
        <TechniqueDetail
          technique={selectedTechnique}
          onClose={() => setSelectedTechnique(null)}
        />
      )}
    </div>
  );
}
