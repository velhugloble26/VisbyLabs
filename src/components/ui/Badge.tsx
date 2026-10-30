import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "brand" | "amber";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium",
        tone === "neutral" && "border-line text-muted",
        tone === "brand" && "border-brand/40 bg-brand/10 text-brand",
        tone === "amber" && "border-amber/50 bg-amber/10 text-amber",
        className,
      )}
    >
      {children}
    </span>
  );
}
