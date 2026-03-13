"use client";

import { Suspense } from "react";
import { ProgressionFlow } from "@/components/progressions/ProgressionFlow";

export default function ProgressionsPage() {
  return (
    <div className="h-[calc(100vh-7.5rem)]">
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-full text-gray-500">
            Loading progression map...
          </div>
        }
      >
        <ProgressionFlow />
      </Suspense>
    </div>
  );
}
