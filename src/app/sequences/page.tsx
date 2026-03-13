"use client";

import { Suspense, useState } from "react";
import { SequenceFlow } from "@/components/sequences/SequenceFlow";
import { SequencePlayground } from "@/components/sequences/SequencePlayground";

export default function SequencesPage() {
  const [mode, setMode] = useState<"explore" | "playground">("explore");

  return (
    <div className="h-full flex flex-col">
      {/* Mode toggle */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-purple-100 bg-white/50">
        <button
          onClick={() => setMode("explore")}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            mode === "explore"
              ? "bg-purple-600 text-white shadow-sm"
              : "bg-purple-50 text-gray-500 hover:text-gray-700 border border-purple-200"
          }`}
        >
          Explore Sequences
        </button>
        <button
          onClick={() => setMode("playground")}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            mode === "playground"
              ? "bg-purple-600 text-white shadow-sm"
              : "bg-purple-50 text-gray-500 hover:text-gray-700 border border-purple-200"
          }`}
        >
          Sequence Playground
        </button>
      </div>

      <div className="flex-1">
        {mode === "explore" ? (
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-full text-gray-400">
                Loading sequence map...
              </div>
            }
          >
            <SequenceFlow />
          </Suspense>
        ) : (
          <SequencePlayground />
        )}
      </div>
    </div>
  );
}
