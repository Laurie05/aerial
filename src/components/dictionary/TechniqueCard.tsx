import { Technique } from "@/types";

const difficultyColors = {
  beginner: "bg-green-50 text-green-700 border-green-200",
  intermediate: "bg-amber-50 text-amber-700 border-amber-200",
  advanced: "bg-orange-50 text-orange-700 border-orange-200",
  elite: "bg-red-50 text-red-700 border-red-200",
};

const categoryColors: Record<string, string> = {
  wraps: "text-purple-600",
  drops: "text-red-500",
  climbs: "text-blue-500",
  locks: "text-green-600",
  poses: "text-pink-500",
  transitions: "text-cyan-600",
  entries: "text-amber-600",
};

export function TechniqueCard({
  technique,
  onClick,
}: {
  technique: Technique;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-white border border-purple-100 rounded-xl p-4 text-left hover:border-aerial-300 hover:shadow-md transition-all group shadow-sm"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-900 group-hover:text-aerial-600 transition-colors">
          {technique.name}
        </h3>
        <span
          className={`text-xs px-2 py-0.5 rounded-full border ${difficultyColors[technique.difficulty]}`}
        >
          {technique.difficulty}
        </span>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <span
          className={`text-xs font-medium ${categoryColors[technique.category] ?? "text-gray-500"}`}
        >
          {technique.category}
        </span>
        {technique.apparatus.length > 1 && (
          <span className="text-xs text-gray-400">
            {technique.apparatus.join(", ")}
          </span>
        )}
      </div>
      <p className="text-sm text-gray-500 line-clamp-2">
        {technique.description}
      </p>
      {technique.aliases.length > 0 && (
        <p className="text-xs text-gray-400 mt-2">
          aka: {technique.aliases.join(", ")}
        </p>
      )}
    </button>
  );
}
