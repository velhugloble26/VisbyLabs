import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div data-motion className={cn("rounded-2xl border border-line bg-card/70 p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-brand/60", className)}>{children}</div>;
}
