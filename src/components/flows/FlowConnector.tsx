import { cn } from "@/lib/utils";
import { FlowPacket } from "./FlowPacket";

interface FlowConnectorProps {
  /** The packet has already passed through this connector. */
  on: boolean;
  /** The packet is travelling along this connector right now. */
  packet: boolean;
  packetKey: string;
  compact?: boolean;
}

export function FlowConnector({ on, packet, packetKey, compact = false }: FlowConnectorProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative flex items-center justify-center",
        compact
          ? "h-11 min-w-3 flex-1"
          : "h-8 w-full md:h-auto md:w-auto md:min-w-6 md:flex-1 md:self-center",
      )}
    >
      <span
        className={cn(
          "flow-line",
          compact ? "flow-line--h" : "flow-line--v flow-line--md-h",
          on && "is-on",
        )}
      />
      {packet && <FlowPacket key={packetKey} compact={compact} />}
    </div>
  );
}
