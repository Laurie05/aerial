"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  NodeMouseHandler,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { techniques } from "@/data/techniques";
import { progressionEdges } from "@/data/progressions";
import { getLayoutedElements, findAncestors } from "@/lib/graph";
import { TechniqueNode } from "./TechniqueNode";
import { useApparatus } from "@/components/ApparatusContext";
import { Apparatus, Technique } from "@/types";

function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtube.com") && u.searchParams.get("v")) {
      const id = u.searchParams.get("v")!;
      if (id.startsWith("REPLACE_")) return null;
      return `https://www.youtube.com/embed/${id}`;
    }
    if (u.hostname.includes("youtube.com") && u.pathname.startsWith("/shorts/")) {
      const id = u.pathname.split("/shorts/")[1];
      if (id.startsWith("REPLACE_")) return null;
      return `https://www.youtube.com/embed/${id}`;
    }
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

const difficultyColor: Record<string, string> = {
  beginner: "#2dd4bf",
  intermediate: "#38bdf8",
  advanced: "#818cf8",
  elite: "#a855f7",
};

const nodeTypes = { technique: TechniqueNode };

function buildFlowElements(
  apparatus: Apparatus,
  highlightId?: string | null
) {
  const techMap = new Map(techniques.map((t) => [t.id, t]));
  const apparatusTechIds = new Set(
    techniques.filter((t) => t.apparatus.includes(apparatus)).map((t) => t.id)
  );

  const filteredEdges = progressionEdges.filter(
    (e) => apparatusTechIds.has(e.from) && apparatusTechIds.has(e.to)
  );

  const highlightedIds = new Set<string>();
  if (highlightId) {
    highlightedIds.add(highlightId);
    const ancestors = findAncestors(highlightId, filteredEdges);
    ancestors.forEach((id) => highlightedIds.add(id));
  }

  const usedIds = new Set<string>();
  filteredEdges.forEach((e) => {
    usedIds.add(e.from);
    usedIds.add(e.to);
  });

  const nodes: Node[] = Array.from(usedIds)
    .filter((id) => techMap.has(id))
    .map((id) => {
      const tech = techMap.get(id)!;
      const isHighlighted = highlightId ? highlightedIds.has(id) : true;
      return {
        id,
        type: "technique",
        position: { x: 0, y: 0 },
        data: {
          label: tech.name,
          difficulty: tech.difficulty,
          category: tech.category,
          isHighlighted,
          isSelected: id === highlightId,
        },
      };
    });

  const edges: Edge[] = filteredEdges.map((e, i) => {
    const isHighlighted = highlightId
      ? highlightedIds.has(e.from) && highlightedIds.has(e.to)
      : true;
    return {
      id: `e-${i}`,
      source: e.from,
      target: e.to,
      animated: isHighlighted && !!highlightId,
      style: {
        stroke: isHighlighted
          ? difficultyColor[techMap.get(e.to)?.difficulty ?? "beginner"]
          : "#e5e7eb",
        strokeWidth: isHighlighted ? 2 : 1,
        opacity: isHighlighted ? 1 : 0.3,
      },
    };
  });

  return getLayoutedElements(nodes, edges, "TB");
}

function ProgressionFlowInner() {
  const { apparatus } = useApparatus();
  const searchParams = useSearchParams();
  const initialHighlight = searchParams.get("highlight");
  const [highlightId, setHighlightId] = useState<string | null>(
    initialHighlight
  );
  const { fitView } = useReactFlow();

  const { nodes: layoutedNodes, edges: layoutedEdges } = useMemo(
    () => buildFlowElements(apparatus, highlightId),
    [apparatus, highlightId]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  useMemo(() => {
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [layoutedNodes, layoutedEdges, setNodes, setEdges]);

  useEffect(() => {
    requestAnimationFrame(() => {
      fitView({ padding: 0.2, duration: 300 });
    });
  }, [layoutedNodes, layoutedEdges, fitView]);

  const techMap = useMemo(
    () => new Map(techniques.map((t) => [t.id, t])),
    []
  );

  const selectedTechnique: Technique | null = highlightId
    ? techMap.get(highlightId) ?? null
    : null;

  const onNodeClick: NodeMouseHandler = useCallback((_event, node) => {
    setHighlightId((prev) => (prev === node.id ? null : node.id));
  }, []);

  return (
    <div className="w-full h-full relative">
      {/* Legend */}
      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10 bg-white/90 border border-purple-100 rounded-lg p-2 sm:p-3 backdrop-blur-sm shadow-sm">
        <p className="text-[10px] sm:text-xs text-gray-500 mb-1 sm:mb-2 font-medium uppercase tracking-wide">
          Difficulty
        </p>
        <div className="flex sm:flex-col gap-2 sm:gap-1">
          {Object.entries(difficultyColor).map(([level, color]) => (
            <div key={level} className="flex items-center gap-1 sm:gap-2">
              <div
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-[10px] sm:text-xs text-gray-600 capitalize">{level}</span>
            </div>
          ))}
        </div>
        {highlightId && (
          <button
            onClick={() => setHighlightId(null)}
            className="mt-2 sm:mt-3 text-[10px] sm:text-xs text-purple-600 hover:text-purple-800"
          >
            Clear highlight
          </button>
        )}
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.3}
        maxZoom={2}
        style={{ background: "#fafafa" }}
      >
        <Background color="#ede9fe" gap={20} />
        <Controls className="!bottom-2 !left-2 sm:!bottom-4 sm:!left-4" />
        <MiniMap className="hidden sm:block"
          nodeColor={(node) =>
            difficultyColor[(node.data?.difficulty as string)] ?? "#9ca3af"
          }
        />
      </ReactFlow>

      {/* Technique detail panel — bottom sheet on mobile, side panel on desktop */}
      {selectedTechnique && (
        <div className="absolute inset-x-0 bottom-0 z-20 max-h-[60vh] sm:max-h-none sm:inset-x-auto sm:top-0 sm:right-0 sm:bottom-0 sm:w-80 bg-white border-t sm:border-t-0 sm:border-l border-purple-100 shadow-lg overflow-y-auto rounded-t-2xl sm:rounded-none">
          {/* Drag handle for mobile */}
          <div className="sm:hidden flex justify-center pt-2 pb-1">
            <div className="w-10 h-1 bg-gray-300 rounded-full" />
          </div>
          <div className="p-4 pt-2 sm:pt-4">
            <button
              onClick={() => setHighlightId(null)}
              className="absolute top-3 right-3 sm:top-3 sm:right-3 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Image */}
            {selectedTechnique.imageUrl && (
              <div className="flex justify-center bg-gray-50 rounded-lg border border-purple-100 p-3 mb-4">
                <img
                  src={selectedTechnique.imageUrl}
                  alt={`${selectedTechnique.name} illustration`}
                  className="max-h-48 object-contain"
                />
              </div>
            )}

            <h3 className="text-lg font-bold text-gray-900 mb-1 pr-6">
              {selectedTechnique.name}
            </h3>

            {selectedTechnique.aliases.length > 0 && (
              <p className="text-xs text-gray-400 mb-3">
                aka: {selectedTechnique.aliases.join(", ")}
              </p>
            )}

            <div className="flex flex-wrap gap-2 mb-3">
              <span className={`text-xs px-2 py-0.5 rounded-full border ${
                {
                  beginner: "bg-teal-50 text-teal-700 border-teal-200",
                  intermediate: "bg-sky-50 text-sky-700 border-sky-200",
                  advanced: "bg-indigo-50 text-indigo-700 border-indigo-200",
                  elite: "bg-purple-50 text-purple-700 border-purple-200",
                }[selectedTechnique.difficulty]
              }`}>
                {selectedTechnique.difficulty}
              </span>
              <span className="text-xs text-gray-500 capitalize">
                {selectedTechnique.category}
              </span>
              {selectedTechnique.style && (
                <span className="text-xs text-gray-500">
                  {selectedTechnique.style}
                </span>
              )}
            </div>

            <p className="text-sm text-gray-600 mb-4">
              {selectedTechnique.description}
            </p>

            {selectedTechnique.cues.length > 0 && (
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  Teaching Cues
                </h4>
                <ol className="space-y-1.5">
                  {selectedTechnique.cues.map((cue, i) => (
                    <li key={i} className="flex gap-2 text-xs">
                      <span className="text-aerial-500 font-bold shrink-0">{i + 1}.</span>
                      <span className="text-gray-600">{cue}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Video embed or search link */}
            {selectedTechnique.videoUrl && getYouTubeEmbedUrl(selectedTechnique.videoUrl) ? (
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                  Video Tutorial
                </h4>
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-purple-100">
                  <iframe
                    src={getYouTubeEmbedUrl(selectedTechnique.videoUrl)!}
                    title={`${selectedTechnique.name} tutorial`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>
            ) : (
              <div className="mb-4">
                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(`aerial ${selectedTechnique.name} tutorial`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-400 hover:text-aerial-600 transition-colors inline-flex items-center gap-1.5"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" />
                    <path fill="#fff" d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  Search tutorials on YouTube
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function ProgressionFlow() {
  return (
    <ReactFlowProvider>
      <ProgressionFlowInner />
    </ReactFlowProvider>
  );
}
