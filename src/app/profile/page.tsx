"use client";

import { techniques } from "@/data/techniques";
import { Category } from "@/types";

const categoryIcons: Record<Category, string> = {
  wraps: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
  drops: "M19 14l-7 7m0 0l-7-7m7 7V3",
  climbs: "M5 10l7-7m0 0l7 7m-7-7v18",
  locks: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
  poses: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  transitions: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4",
  entries: "M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1",
};

export default function ProfilePage() {
  const categoryCounts = techniques.reduce(
    (acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Auth placeholder */}
      <div className="bg-white border border-purple-100 rounded-2xl p-8 text-center mb-8 shadow-sm">
        <div className="w-20 h-20 mx-auto mb-4 bg-purple-50 rounded-full flex items-center justify-center">
          <svg
            className="w-10 h-10 text-purple-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          Sign In to Track Progress
        </h2>
        <p className="text-gray-400 text-sm mb-4">
          Create an account to track which techniques you&apos;ve mastered, save
          sequences, and set your home studio.
        </p>
        <button className="px-6 py-2 bg-silk-600 text-white rounded-lg hover:bg-silk-500 transition-colors">
          Coming Soon
        </button>
      </div>

      {/* Technique overview */}
      <h3 className="text-lg font-bold text-gray-800 mb-4">
        Technique Overview
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {(Object.keys(categoryIcons) as Category[]).map((cat) => (
          <div
            key={cat}
            className="bg-white border border-purple-100 rounded-xl p-4 shadow-sm"
          >
            <svg
              className="w-6 h-6 text-silk-400 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={categoryIcons[cat]}
              />
            </svg>
            <p className="text-2xl font-bold text-gray-800">
              {categoryCounts[cat] || 0}
            </p>
            <p className="text-sm text-gray-500 capitalize">{cat}</p>
            <div className="mt-2 h-1.5 bg-purple-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-silk-600 rounded-full"
                style={{ width: "0%" }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">0 / {categoryCounts[cat] || 0} completed</p>
          </div>
        ))}
      </div>
    </div>
  );
}
