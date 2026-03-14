import { Handle, Position, type NodeProps } from "@xyflow/react";

const difficultyBorder: Record<string, string> = {
  beginner: "border-teal-400",
  intermediate: "border-sky-400",
  advanced: "border-indigo-400",
  elite: "border-purple-500",
};

const difficultyBg: Record<string, string> = {
  beginner: "bg-teal-50",
  intermediate: "bg-sky-50",
  advanced: "bg-indigo-50",
  elite: "bg-purple-50",
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
        className={`px-2.5 py-1.5 rounded-lg border-2 text-center min-w-[110px] transition-all cursor-pointer shadow-sm
          ${difficultyBorder[difficulty]} ${difficultyBg[difficulty]}
          ${!isHighlighted ? "opacity-30" : ""}
          ${isSelected ? "ring-2 ring-purple-400 ring-offset-2 ring-offset-white scale-110" : ""}
          hover:scale-105
        `}
      >
        <div className="text-xs font-semibold text-gray-800 leading-tight">{label}</div>
        <div className="text-[10px] text-gray-500 capitalize">{category}</div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-gray-300 !w-2 !h-2" />
    </>
  );
}
