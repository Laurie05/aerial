import dagre from "@dagrejs/dagre";
import type { Node, Edge } from "@xyflow/react";

export function getLayoutedElements(
  nodes: Node[],
  edges: Edge[],
  direction: "TB" | "LR" = "TB"
): { nodes: Node[]; edges: Edge[] } {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({ rankdir: direction, nodesep: 60, ranksep: 100 });

  nodes.forEach((node) => {
    g.setNode(node.id, { width: 180, height: 60 });
  });

  edges.forEach((edge) => {
    g.setEdge(edge.source, edge.target);
  });

  dagre.layout(g);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = g.node(node.id);
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - 90,
        y: nodeWithPosition.y - 30,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
}

// Find all ancestors of a technique in the graph
export function findAncestors(
  techniqueId: string,
  edges: { from: string; to: string }[]
): Set<string> {
  const ancestors = new Set<string>();
  const queue = [techniqueId];

  while (queue.length > 0) {
    const current = queue.shift()!;
    const parents = edges
      .filter((e) => e.to === current)
      .map((e) => e.from);
    for (const parent of parents) {
      if (!ancestors.has(parent)) {
        ancestors.add(parent);
        queue.push(parent);
      }
    }
  }

  return ancestors;
}

// Find all descendants of a technique
export function findDescendants(
  techniqueId: string,
  edges: { from: string; to: string }[]
): Set<string> {
  const descendants = new Set<string>();
  const queue = [techniqueId];

  while (queue.length > 0) {
    const current = queue.shift()!;
    const children = edges
      .filter((e) => e.from === current)
      .map((e) => e.to);
    for (const child of children) {
      if (!descendants.has(child)) {
        descendants.add(child);
        queue.push(child);
      }
    }
  }

  return descendants;
}
