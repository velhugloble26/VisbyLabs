import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Site-wide content width: 90% of the viewport on every page. */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-[90%] max-w-[1920px]", className)}>{children}</div>;
}
