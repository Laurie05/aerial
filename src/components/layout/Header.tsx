"use client";

import Link from "next/link";
import Image from "next/image";
import { useApparatus } from "@/components/ApparatusContext";
import { Apparatus } from "@/types";
import iconImg from "@/app/icon.png";

const apparatusOptions: { value: Apparatus; label: string }[] = [
  { value: "silks", label: "Silks" },
  { value: "lyra", label: "Lyra" },
  { value: "hammock", label: "Hammock" },
  { value: "rope", label: "Rope" },
];

export function Header() {
  const { apparatus, setApparatus } = useApparatus();

  return (
    <header className="border-b border-purple-100 bg-white/80 backdrop-blur-sm shrink-0">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src={iconImg} alt="Aerial Atlas" width={32} height={32} className="rounded" />
          <span className="text-xl font-bold bg-gradient-to-r from-silk-500 to-aerial-500 bg-clip-text text-transparent">
            Aerial Atlas
          </span>
        </Link>

        {/* Apparatus toggle */}
        <div className="flex items-center gap-0.5 sm:gap-1 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-full p-0.5 sm:p-1 shadow-sm">
          {apparatusOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setApparatus(opt.value)}
              className={`px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                apparatus === opt.value
                  ? "bg-gradient-to-r from-aerial-500 to-silk-500 text-white shadow-md scale-105"
                  : "text-gray-500 hover:text-gray-800 hover:bg-white/60"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
