import { Handle, Position, type NodeProps } from "@xyflow/react";

export function SequenceNode({ data }: NodeProps) {
  const {
    label,
    connections,
    isHighlighted,
    isSelected,
    isOutgoing,
    isIncoming,
  } = data as {
    label: string;
    difficulty: string;
    connections: number;
    isHighlighted: boolean;
    isSelected: boolean;
    isOutgoing: boolean;
    isIncoming: boolean;
  };

  const borderColor = isSelected
    ? "border-purple-600"
    : isOutgoing
    ? "border-purple-400"
    : isIncoming
    ? "border-violet-400"
    : "border-purple-200";

  const bgColor = isSelected
    ? "bg-purple-50"
    : isOutgoing
    ? "bg-purple-50/60"
    : isIncoming
    ? "bg-violet-50/60"
    : "bg-white";

  return (
    <>
      <Handle type="target" position={Position.Left} className="!bg-gray-300 !w-2 !h-2" />
      <div
        className={`px-4 py-2 rounded-lg border-2 text-center min-w-[130px] transition-all cursor-pointer shadow-sm
          ${borderColor} ${bgColor}
          ${!isHighlighted ? "opacity-20" : ""}
          ${isSelected ? "ring-2 ring-purple-400 ring-offset-2 ring-offset-white scale-110" : ""}
          hover:scale-105
        `}
      >
        <div className="text-sm font-semibold text-gray-800">{label}</div>
        <div className="text-xs text-gray-400">
          {connections} connection{connections !== 1 ? "s" : ""}
        </div>
      </div>
      <Handle type="source" position={Position.Right} className="!bg-gray-300 !w-2 !h-2" />
    </>
  );
}
