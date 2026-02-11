import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("glass-card p-6 border border-white/10 bg-white/[0.03] backdrop-blur", className)}
      {...props}
    />
  );
}
