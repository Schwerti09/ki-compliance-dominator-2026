"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

export function Progress({ value, className }: { value: number; className?: string }) {
  const v = Math.min(100, Math.max(0, value));
  return (
    <ProgressPrimitive.Root className={cn("relative h-3 w-full overflow-hidden rounded-full bg-white/10", className)} value={v}>
      <ProgressPrimitive.Indicator
        className="h-full w-full bg-gradient-to-r from-cyan-400/70 via-emerald-400/70 to-white/70 transition-transform"
        style={{ transform: `translateX(-${100 - v}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}
