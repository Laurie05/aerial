"use client";

import { useState, useMemo } from "react";
import { techniques } from "@/data/techniques";
import { sequenceEdges, exampleSequences } from "@/data/sequences";
import { useApparatus } from "@/components/ApparatusContext";

const techMap = new Map(techniques.map((t) => [t.id, t]));

const difficultyColors: Record<string, string> = {
  beginner: "border-green-300 bg-green-50",
  intermediate: "border-amber-300 bg-amber-50",
  advanced: "border-orange-300 bg-orange-50",
  elite: "border-red-300 bg-red-50",
};

export function SequencePlayground() {
  const { apparatus } = useApparatus();
  const [sequence, setSequence] = useState<string[]>([]);
  const [sequenceName, setSequenceName] = useState("");
  const [savedSequences, setSavedSequences] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("aerial-sequences");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const apparatusTechniques = useMemo(
    () => techniques.filter((t) => t.apparatus.includes(apparatus)),
    [apparatus]
  );

  const apparatusTechIds = useMemo(
    () => new Set(apparatusTechniques.map((t) => t.id)),
    [apparatusTechniques]
  );

  const filteredEdges = useMemo(
    () =>
      sequenceEdges.filter(
        (e) => apparatusTechIds.has(e.from) && apparatusTechIds.has(e.to)
      ),
    [apparatusTechIds]
  );

  // Get valid next moves based on current last technique
  const validNextMoves = useMemo(() => {
    if (sequence.length === 0) {
      return apparatusTechniques;
    }
    const lastId = sequence[sequence.length - 1];
    const nextIds = filteredEdges
      .filter((e) => e.from === lastId)
      .map((e) => e.to);
    return apparatusTechniques.filter((t) => nextIds.includes(t.id));
  }, [sequence, apparatusTechniques, filteredEdges]);

  const addToSequence = (techniqueId: string) => {
    setSequence((prev) => [...prev, techniqueId]);
  };

  const removeLastFromSequence = () => {
    setSequence((prev) => prev.slice(0, -1));
  };

  const clearSequence = () => {
    setSequence([]);
    setSequenceName("");
  };

  const saveSequence = () => {
    if (sequence.length < 2) return;
    const newSeq = {
      id: `custom-${Date.now()}`,
      name: sequenceName || `Sequence ${savedSequences.length + 1}`,
      techniqueIds: sequence,
      createdAt: new Date().toISOString(),
    };
    const updated = [...savedSequences, newSeq];
    setSavedSequences(updated);
    localStorage.setItem("aerial-sequences", JSON.stringify(updated));
    clearSequence();
  };

  const loadSequence = (techniqueIds: string[]) => {
    setSequence(techniqueIds);
  };

  const deleteSavedSequence = (id: string) => {
    const updated = savedSequences.filter((s: { id: string }) => s.id !== id);
    setSavedSequences(updated);
    localStorage.setItem("aerial-sequences", JSON.stringify(updated));
  };

  return (
    <div className="h-full flex">
      {/* Main playground area */}
      <div className="flex-1 flex flex-col p-6 overflow-y-auto">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          Build Your Sequence
        </h2>

        {/* Current sequence chain */}
        <div className="mb-6 min-h-[80px] bg-purple-50/50 border border-purple-100 rounded-xl p-4">
          {sequence.length === 0 ? (
            <p className="text-gray-400 text-sm">
              Pick a starting technique below to begin building your sequence.
            </p>
          ) : (
            <div className="flex flex-wrap items-center gap-2">
              {sequence.map((id, i) => {
                const tech = techMap.get(id);
                if (!tech) return null;
                return (
                  <div key={`${id}-${i}`} className="flex items-center gap-2">
                    {i > 0 && (
                      <svg
                        className="w-4 h-4 text-silk-500 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    )}
                    <span
                      className={`px-3 py-1.5 rounded-lg border text-sm font-medium text-gray-800 ${
                        difficultyColors[tech.difficulty]
                      }`}
                    >
                      {tech.name}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={removeLastFromSequence}
            disabled={sequence.length === 0}
            className="px-3 py-1.5 text-sm bg-purple-50 text-gray-500 rounded-lg border border-purple-200 hover:bg-purple-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Undo
          </button>
          <button
            onClick={clearSequence}
            disabled={sequence.length === 0}
            className="px-3 py-1.5 text-sm bg-purple-50 text-gray-500 rounded-lg border border-purple-200 hover:bg-purple-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Clear
          </button>
          <div className="flex-1" />
          <input
            type="text"
            placeholder="Sequence name..."
            value={sequenceName}
            onChange={(e) => setSequenceName(e.target.value)}
            className="px-3 py-1.5 text-sm bg-white border border-purple-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-silk-500"
          />
          <button
            onClick={saveSequence}
            disabled={sequence.length < 2}
            className="px-4 py-1.5 text-sm bg-silk-600 text-white rounded-lg hover:bg-silk-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Save Sequence
          </button>
        </div>

        {/* Available next moves */}
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          {sequence.length === 0 ? "Pick a starting technique" : "Available next moves"}
        </h3>

        {validNextMoves.length === 0 ? (
          <p className="text-gray-400 text-sm">
            No valid next moves from this position. Try undoing or starting
            fresh!
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
            {validNextMoves.map((tech) => (
              <button
                key={tech.id}
                onClick={() => addToSequence(tech.id)}
                className={`p-3 rounded-lg border text-left hover:scale-[1.02] transition-all shadow-sm ${
                  difficultyColors[tech.difficulty]
                } hover:shadow-md`}
              >
                <div className="text-sm font-medium text-gray-800">
                  {tech.name}
                </div>
                <div className="text-xs text-gray-500 capitalize">
                  {tech.category} &middot; {tech.difficulty}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Sidebar: saved and example sequences */}
      <div className="w-72 border-l border-purple-100 bg-purple-50/30 p-4 overflow-y-auto hidden lg:block">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Example Sequences
        </h3>
        <div className="space-y-2 mb-6">
          {exampleSequences.map((seq) => (
            <button
              key={seq.id}
              onClick={() => loadSequence(seq.techniqueIds)}
              className="w-full text-left p-3 rounded-lg bg-white border border-purple-100 hover:border-silk-400 transition-colors shadow-sm"
            >
              <div className="text-sm font-medium text-gray-800">
                {seq.name}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {seq.techniqueIds.length} moves &middot;{" "}
                {seq.techniqueIds
                  .map((id) => techMap.get(id)?.name)
                  .filter(Boolean)
                  .join(" → ")}
              </div>
            </button>
          ))}
        </div>

        {savedSequences.length > 0 && (
          <>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Your Sequences
            </h3>
            <div className="space-y-2">
              {savedSequences.map(
                (seq: {
                  id: string;
                  name: string;
                  techniqueIds: string[];
                }) => (
                  <div
                    key={seq.id}
                    className="p-3 rounded-lg bg-white border border-purple-100 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => loadSequence(seq.techniqueIds)}
                        className="text-sm font-medium text-gray-800 hover:text-silk-600"
                      >
                        {seq.name}
                      </button>
                      <button
                        onClick={() => deleteSavedSequence(seq.id)}
                        className="text-xs text-gray-400 hover:text-red-500"
                      >
                        Delete
                      </button>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {seq.techniqueIds.length} moves
                    </div>
                  </div>
                )
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
