import { Technique } from "@/types";

function getYouTubeThumbnail(url: string): string | null {
  try {
    const u = new URL(url);
    let id: string | null = null;
    if (u.hostname.includes("youtube.com") && u.searchParams.get("v")) {
      id = u.searchParams.get("v");
    } else if (u.hostname.includes("youtube.com") && u.pathname.startsWith("/shorts/")) {
      id = u.pathname.split("/shorts/")[1];
    } else if (u.hostname === "youtu.be") {
      id = u.pathname.slice(1);
    }
    if (id && !id.startsWith("REPLACE_")) {
      return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
    }
  } catch {
    return null;
  }
  return null;
}

const difficultyColors = {
  beginner: "bg-teal-50 text-teal-700 border-teal-200",
  intermediate: "bg-sky-50 text-sky-700 border-sky-200",
  advanced: "bg-indigo-50 text-indigo-700 border-indigo-200",
  elite: "bg-purple-50 text-purple-700 border-purple-200",
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

const classificationColors: Record<string, string> = {
  flexibility: "bg-orange-50 text-orange-600 border-orange-200",
  strength: "bg-red-50 text-red-600 border-red-200",
  balance: "bg-emerald-50 text-emerald-600 border-emerald-200",
  dynamic: "bg-violet-50 text-violet-600 border-violet-200",
};

export function TechniqueCard({
  technique,
  onClick,
}: {
  technique: Technique;
  onClick: () => void;
}) {
  const thumbnail = technique.videoUrl
    ? getYouTubeThumbnail(technique.videoUrl)
    : null;
  const hasVideo = !!thumbnail;
  const previewImage = thumbnail || technique.imageUrl || null;

  return (
    <button
      onClick={onClick}
      className="bg-white border border-purple-100 rounded-xl overflow-hidden text-left hover:border-aerial-300 hover:shadow-md transition-all group shadow-sm"
    >
      {previewImage && (
        <div className={`relative w-full ${hasVideo ? "aspect-video" : "aspect-square"} bg-gray-50`}>
          <img
            src={previewImage}
            alt={`${technique.name} preview`}
            className={`w-full h-full ${hasVideo ? "object-cover" : "object-contain p-2"}`}
            loading="lazy"
          />
          {hasVideo && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 bg-black/60 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
        </div>
      )}
      <div className="p-4">
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
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <span
          className={`text-xs font-medium ${categoryColors[technique.category] ?? "text-gray-500"}`}
        >
          {technique.category}{technique.style ? `, ${technique.style}` : ""}
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
      </div>
    </button>
  );
}
