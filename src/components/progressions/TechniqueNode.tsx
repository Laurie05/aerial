import { Handle, Position, type NodeProps } from "@xyflow/react";

const difficultyBorder: Record<string, string> = {
  beginner: "border-green-400",
  intermediate: "border-amber-400",
  advanced: "border-orange-400",
  elite: "border-red-400",
};

const difficultyBg: Record<string, string> = {
  beginner: "bg-green-50",
  intermediate: "bg-amber-50",
  advanced: "bg-orange-50",
  elite: "bg-red-50",
};

export function TechniqueNode({ data }: NodeProps) {
  const { label, difficulty, category, isHighlighted, isSelected } = data as {
    label: string;
    difficulty: string;
    category: string;
    isHighlighted: boolean;
    isSelected: boolean;
  };

  return (
    <>
      <Handle type="target" position={Position.Top} className="!bg-gray-300 !w-2 !h-2" />
      <div
        className={`px-4 py-2 rounded-lg border-2 text-center min-w-[140px] transition-all cursor-pointer shadow-sm
          ${difficultyBorder[difficulty]} ${difficultyBg[difficulty]}
          ${!isHighlighted ? "opacity-30" : ""}
          ${isSelected ? "ring-2 ring-aerial-400 ring-offset-2 ring-offset-white scale-110" : ""}
          hover:scale-105
        `}
      >
        <div className="text-sm font-semibold text-gray-800">{label}</div>
        <div className="text-xs text-gray-500 capitalize">{category}</div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-gray-300 !w-2 !h-2" />
    </>
  );
}
