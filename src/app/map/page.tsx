"use client";

import dynamic from "next/dynamic";

const StudioMap = dynamic(() => import("@/components/map/StudioMap"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full text-gray-500">
      Loading map...
    </div>
  ),
});

export default function MapPage() {
  return (
    <div className="h-[calc(100vh-7.5rem)]">
      <StudioMap />
    </div>
  );
}
