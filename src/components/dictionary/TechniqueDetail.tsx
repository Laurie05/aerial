import { Technique } from "@/types";
import Link from "next/link";

function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    // Standard watch URLs
    if (u.hostname.includes("youtube.com") && u.searchParams.get("v")) {
      const id = u.searchParams.get("v")!;
      if (id.startsWith("REPLACE_")) return null;
      return `https://www.youtube.com/embed/${id}`;
    }
    // Shorts URLs
    if (u.hostname.includes("youtube.com") && u.pathname.startsWith("/shorts/")) {
      const id = u.pathname.split("/shorts/")[1];
      if (id.startsWith("REPLACE_")) return null;
      return `https://www.youtube.com/embed/${id}`;
    }
    // youtu.be short links
    if (u.hostname === "youtu.be") {
      const id = u.pathname.slice(1);
      if (id.startsWith("REPLACE_")) return null;
      return `https://www.youtube.com/embed/${id}`;
    }
  } catch {
    return null;
  }
  return null;
}

const difficultyColors = {
  beginner: "text-teal-600",
  intermediate: "text-sky-600",
  advanced: "text-indigo-600",
  elite: "text-purple-600",
};

const classificationColors: Record<string, string> = {
  flexibility: "bg-orange-50 text-orange-700 border-orange-200",
  strength: "bg-red-50 text-red-700 border-red-200",
  balance: "bg-emerald-50 text-emerald-700 border-emerald-200",
  dynamic: "bg-violet-50 text-violet-700 border-violet-200",
};

export function TechniqueDetail({
  technique,
  onClose,
}: {
  technique: Technique;
  onClose: () => void;
}) {
  const searchQuery = encodeURIComponent(
    `aerial ${technique.apparatus[0]} ${technique.name} tutorial`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white border border-purple-100 rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {technique.name}
          </h2>
          {technique.aliases.length > 0 && (
            <p className="text-sm text-gray-400 mt-1">
              Also known as: {technique.aliases.join(", ")}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-3 mb-4">
          <span
            className={`text-sm font-medium ${difficultyColors[technique.difficulty]}`}
          >
            {technique.difficulty}
          </span>
          <span className="text-sm text-gray-300">|</span>
          <span className="text-sm text-gray-500 capitalize">
            {technique.category}
          </span>
          <span className="text-sm text-gray-300">|</span>
          <span className="text-sm text-gray-500">
            {technique.apparatus.join(", ")}
          </span>
          {technique.style && (
            <>
              <span className="text-sm text-gray-300">|</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full border font-medium ${classificationColors[technique.style]}`}
              >
                {technique.style}
              </span>
            </>
          )}
        </div>

        <p className="text-gray-600 mb-6">{technique.description}</p>

        {technique.cues.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
              Teaching Cues
            </h3>
            <ol className="space-y-2">
              {technique.cues.map((cue, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <span className="text-aerial-500 font-bold shrink-0">
                    {i + 1}.
                  </span>
                  <span className="text-gray-600">{cue}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Illustration image */}
        {technique.imageUrl && (
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
              Illustration
            </h3>
            <div className="flex justify-center bg-gray-50 rounded-lg border border-purple-100 p-4">
              <img
                src={technique.imageUrl}
                alt={`${technique.name} illustration`}
                className="max-h-64 object-contain"
              />
            </div>
          </div>
        )}

        {/* Video embed or search link */}
        {technique.videoUrl && getYouTubeEmbedUrl(technique.videoUrl) ? (
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
              Video Tutorial
            </h3>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-purple-100">
              <iframe
                src={getYouTubeEmbedUrl(technique.videoUrl)!}
                title={`${technique.name} tutorial`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        ) : (
          <div className="mb-4">
            <a
              href={`https://www.youtube.com/results?search_query=${searchQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-aerial-600 transition-colors inline-flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
                <path
                  fill="#fff"
                  d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                />
              </svg>
              Search tutorials on YouTube
            </a>
          </div>
        )}

        <div className="flex gap-3 pt-4 border-t border-purple-100">
          <Link
            href={`/progressions?highlight=${technique.id}`}
            className="text-sm text-aerial-500 hover:text-aerial-700 transition-colors"
          >
            View in Progression Map &rarr;
          </Link>
          <Link
            href={`/sequences?highlight=${technique.id}`}
            className="text-sm text-silk-500 hover:text-silk-700 transition-colors"
          >
            View in Sequence Tree &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
