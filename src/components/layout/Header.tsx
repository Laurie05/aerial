"use client";

import Link from "next/link";
import { useApparatus } from "@/components/ApparatusContext";
import { Apparatus } from "@/types";

const apparatusOptions: { value: Apparatus; label: string }[] = [
  { value: "silks", label: "Silks" },
  { value: "lyra", label: "Lyra" },
  { value: "hammock", label: "Hammock" },
  { value: "rope", label: "Rope" },
];

export function Header() {
  const { apparatus, setApparatus } = useApparatus();

  return (
    <header className="border-b border-purple-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold bg-gradient-to-r from-silk-500 to-aerial-500 bg-clip-text text-transparent">
            Aerial Atlas
          </span>
        </Link>

        {/* Apparatus toggle */}
        <div className="flex items-center gap-1 bg-purple-50 border border-purple-200 rounded-lg p-0.5">
          {apparatusOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setApparatus(opt.value)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
                apparatus === opt.value
                  ? "bg-aerial-500 text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <button className="text-sm text-gray-500 hover:text-gray-700 border border-purple-200 rounded-lg px-3 py-1.5 hover:border-purple-400 transition-colors">
          Sign In
        </button>
      </div>
    </header>
  );
}
