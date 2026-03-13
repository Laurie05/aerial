"use client";

import { Suspense } from "react";
import { ProgressionFlow } from "@/components/progressions/ProgressionFlow";

export default function ProgressionsPage() {
  return (
    <div className="h-full">
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
