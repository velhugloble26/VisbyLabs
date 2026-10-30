"use client";

import { flows } from "@/data/flows";
import { FlowCanvas } from "./FlowCanvas";
import { ChatBubble, PanelCard, RecordRow } from "./FlowPanel";

function HeroPanel({ active }: { active: number }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <PanelCard title="Customer conversation" tag="Example only">
        <div className="min-h-[7rem] space-y-2">
          {active >= 1 && <ChatBubble from="customer" read={active >= 2}>I&rsquo;d like to discuss your services.</ChatBubble>}
          {active >= 2 && <ChatBubble from="assistant">Of course. What would you like to improve?</ChatBubble>}
        </div>
      </PanelCard>
      <PanelCard title="A clear next step." tag="CRM / sample record">
        <RecordRow label="Interest" value={active >= 2 ? "Advertising" : undefined} />
        <RecordRow label="Status" value={active >= 3 ? "Ready for review" : undefined} tone="success" />
        <RecordRow label="Owner" value={active >= 3 ? "Human team" : undefined} tone="amber" />
        {active >= 4 && (
          <p className="mt-2 text-xs text-muted">
            <span className="font-semibold text-ink">Follow-up prepared.</span> Check availability. Confirm with a person.
          </p>
        )}
      </PanelCard>
    </div>
  );
}

export function HeroFlow() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgb(var(--brand)/0.22),transparent_70%)]"
      />
      <FlowCanvas
        flow={flows.hero}
        variant="compact"
        renderPanel={(active) => <HeroPanel active={active} />}
      />
    </div>
  );
}
