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
import { Apparatus } from "@/types";

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

  const onNodeClick: NodeMouseHandler = useCallback((_event, node) => {
    setHighlightId((prev) => (prev === node.id ? null : node.id));
  }, []);

  return (
    <div className="w-full h-full relative">
      {/* Legend */}
      <div className="absolute top-4 left-4 z-10 bg-white/90 border border-purple-100 rounded-lg p-3 backdrop-blur-sm shadow-sm">
        <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">
          Difficulty
        </p>
        <div className="flex flex-col gap-1">
          {Object.entries(difficultyColor).map(([level, color]) => (
            <div key={level} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-xs text-gray-600 capitalize">{level}</span>
            </div>
          ))}
        </div>
        {highlightId && (
          <button
            onClick={() => setHighlightId(null)}
            className="mt-3 text-xs text-purple-600 hover:text-purple-800"
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
        <Controls />
        <MiniMap
          nodeColor={(node) =>
            difficultyColor[(node.data?.difficulty as string)] ?? "#9ca3af"
          }
        />
      </ReactFlow>
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
