"use client";

import { flows } from "@/data/flows";
import { FlowCanvas, type FlowProps } from "./FlowCanvas";
import { ChatBubble, PanelCard, RecordRow, TypingDots } from "./FlowPanel";

function WhatsAppPanel({ active }: { active: number }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <PanelCard title="Customer conversation" tag="Example only">
        <div className="min-h-[11rem] space-y-2">
          <ChatBubble from="customer" read={active >= 1}>
            Can you help with Google Ads?
          </ChatBubble>
          {active === 0 && <TypingDots />}
          {active >= 1 && (
            <ChatBubble from="assistant">
              Yes. Are you looking for more enquiries, or to improve a campaign you already run?
            </ChatBubble>
          )}
          {active >= 2 && (
            <ChatBubble from="customer" read>
              More enquiries for my clinic.
            </ChatBubble>
          )}
        </div>
      </PanelCard>
      <PanelCard title="CRM record" tag="Sample record">
        <RecordRow label="Name" value="Alex (sample)" />
        <RecordRow label="Service interest" value={active >= 3 ? "Advertising" : undefined} />
        <RecordRow label="Goal" value={active >= 3 ? "More enquiries" : undefined} />
        <RecordRow label="Status" value={active >= 4 ? "Ready for review" : active >= 3 ? "Captured" : undefined} tone="success" />
        <RecordRow label="Owner" value={active >= 4 ? "Human team" : undefined} tone="amber" />
        {active >= 4 && (
          <p className="mt-2 text-xs text-muted">Next: human review and follow-up.</p>
        )}
      </PanelCard>
    </div>
  );
}

export function WhatsAppFlow({ variant }: FlowProps) {
  return (
    <FlowCanvas
      flow={flows.whatsapp}
      variant={variant}
      renderPanel={(active) => <WhatsAppPanel active={active} />}
    />
  );
}
