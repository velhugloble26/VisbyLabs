"use client";

import { cn } from "@/lib/utils";
import { flows } from "@/data/flows";
import { FlowCanvas, type FlowProps } from "./FlowCanvas";
import { PanelCard, RecordRow } from "./FlowPanel";

const bars = Array.from({ length: 28 }, (_, i) => i);

function VoicePanel({ active }: { active: number }) {
  const listening = active <= 1;
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <PanelCard title="Incoming call" tag="Example only">
        <div className="flex h-16 items-center justify-center gap-1" aria-hidden>
          {bars.map((i) => (
            <span
              key={i}
              className={cn("w-1 rounded-full", listening ? "wave-bar bg-brand" : "bg-line")}
              style={{
                height: `${18 + ((i * 37) % 40)}px`,
                animationDelay: `${(i % 7) * 120}ms`,
                transform: listening ? undefined : "scaleY(0.3)",
              }}
            />
          ))}
        </div>
        <p className="mt-2 text-center text-xs text-muted">
          {listening ? "Listening to the caller" : "Call summarised"}
        </p>
      </PanelCard>
      <PanelCard title="Call record" tag="Sample record">
        <RecordRow label="Caller need" value={active >= 1 ? "Quote for services" : undefined} />
        <RecordRow label="Summary" value={active >= 2 ? "Written" : undefined} tone="success" />
        <RecordRow label="CRM note" value={active >= 3 ? "Added" : undefined} tone="success" />
        <RecordRow label="Callback" value={active >= 4 ? "Booked with a person" : undefined} tone="amber" />
      </PanelCard>
    </div>
  );
}

export function VoiceAgentFlow({ variant }: FlowProps) {
  return (
    <FlowCanvas flow={flows.voice} variant={variant} renderPanel={(active) => <VoicePanel active={active} />} />
  );
}
