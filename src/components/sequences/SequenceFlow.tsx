"use client";

import { useCallback, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ReactFlow,
  Background,
  Controls,
  Node,
  Edge,
  NodeMouseHandler,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { techniques } from "@/data/techniques";
import { sequenceEdges } from "@/data/sequences";
import { getLayoutedElements } from "@/lib/graph";
import { SequenceNode } from "./SequenceNode";
import { useApparatus } from "@/components/ApparatusContext";
import { Apparatus } from "@/types";

const nodeTypes = { sequence: SequenceNode };

function buildFlowElements(
  apparatus: Apparatus,
  highlightId?: string | null
) {
  const techMap = new Map(techniques.map((t) => [t.id, t]));
  const apparatusTechIds = new Set(
    techniques.filter((t) => t.apparatus.includes(apparatus)).map((t) => t.id)
  );

  const filteredEdges = sequenceEdges.filter(
    (e) => apparatusTechIds.has(e.from) && apparatusTechIds.has(e.to)
  );

  const usedIds = new Set<string>();
  filteredEdges.forEach((e) => {
    usedIds.add(e.from);
    usedIds.add(e.to);
  });

  const connectionCount = new Map<string, number>();
  filteredEdges.forEach((e) => {
    connectionCount.set(e.from, (connectionCount.get(e.from) ?? 0) + 1);
    connectionCount.set(e.to, (connectionCount.get(e.to) ?? 0) + 1);
  });

  const directConnections = new Set<string>();
  if (highlightId) {
    directConnections.add(highlightId);
    filteredEdges.forEach((e) => {
      if (e.from === highlightId) directConnections.add(e.to);
      if (e.to === highlightId) directConnections.add(e.from);
    });
  }

  const nodes: Node[] = Array.from(usedIds)
    .filter((id) => techMap.has(id))
    .map((id) => {
      const tech = techMap.get(id)!;
      const isHighlighted = highlightId ? directConnections.has(id) : true;
      return {
        id,
        type: "sequence",
        position: { x: 0, y: 0 },
        data: {
          label: tech.name,
          difficulty: tech.difficulty,
          category: tech.category,
          connections: connectionCount.get(id) ?? 0,
          isHighlighted,
          isSelected: id === highlightId,
          isOutgoing: highlightId
            ? filteredEdges.some(
                (e) => e.from === highlightId && e.to === id
              )
            : false,
          isIncoming: highlightId
            ? filteredEdges.some(
                (e) => e.to === highlightId && e.from === id
              )
            : false,
        },
      };
    });

  const edges: Edge[] = filteredEdges.map((e, i) => {
    const isHighlighted = highlightId
      ? e.from === highlightId || e.to === highlightId
      : true;
    const isOutgoing = highlightId ? e.from === highlightId : false;
    const isIncoming = highlightId ? e.to === highlightId : false;
    return {
      id: `se-${i}`,
      source: e.from,
      target: e.to,
      animated: isOutgoing,
      label: e.notes,
      labelStyle: { fill: "#6b7280", fontSize: 10 },
      labelBgStyle: { fill: "#ffffff", fillOpacity: 0.9 },
      style: {
        stroke: isOutgoing
          ? "#d946ef"
          : isIncoming
          ? "#a855f7"
          : isHighlighted
          ? "#9ca3af"
          : "#e5e7eb",
        strokeWidth: isHighlighted ? 2 : 1,
        opacity: isHighlighted ? 1 : 0.2,
      },
    };
  });

  return getLayoutedElements(nodes, edges, "LR");
}

export function SequenceFlow() {
  const { apparatus } = useApparatus();
  const searchParams = useSearchParams();
  const initialHighlight = searchParams.get("highlight");
  const [highlightId, setHighlightId] = useState<string | null>(
    initialHighlight
  );

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

  const onNodeClick: NodeMouseHandler = useCallback((_event, node) => {
    setHighlightId((prev) => (prev === node.id ? null : node.id));
  }, []);

  return (
    <div className="w-full h-full relative">
      {/* Legend */}
      <div className="absolute top-4 left-4 z-10 bg-white/90 border border-purple-100 rounded-lg p-3 backdrop-blur-sm shadow-sm">
        <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">
          Click a technique to explore
        </p>
        {highlightId && (
          <>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-0.5 bg-silk-500" />
              <span className="text-xs text-gray-500">Can do next</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-0.5 bg-aerial-500" />
              <span className="text-xs text-gray-500">Can come from</span>
            </div>
            <button
              onClick={() => setHighlightId(null)}
              className="text-xs text-silk-500 hover:text-silk-700"
            >
              Clear selection
            </button>
          </>
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
        minZoom={0.2}
        maxZoom={2}
      >
        <Background color="#e5e7eb" gap={20} />
        <Controls />
      </ReactFlow>
    </div>
  );
}
