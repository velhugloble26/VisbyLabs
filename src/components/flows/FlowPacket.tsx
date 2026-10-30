import { cn } from "@/lib/utils";

/** The glowing dot that travels along a connector. Restarts when `key` changes. */
export function FlowPacket({ compact = false }: { compact?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn("flow-packet", compact ? "flow-packet--h" : "flow-packet--v flow-packet--md-h")}
    />
  );
}
