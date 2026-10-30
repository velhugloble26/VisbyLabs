"use client";

import { flows } from "@/data/flows";
import { FlowCanvas, type FlowProps } from "./FlowCanvas";
import { ChatBubble, PanelCard, RecordRow } from "./FlowPanel";

function AssistantPanel({ active }: { active: number }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <PanelCard title="Customer conversation" tag="Example only">
        <div className="space-y-2">
          <ChatBubble from="customer" read={active >= 1}>
            What are your opening hours on Saturday?
          </ChatBubble>
          {active >= 3 && <ChatBubble from="assistant">We are open 9:00 to 13:00 on Saturdays.</ChatBubble>}
          {active >= 4 && (
            <ChatBubble from="customer" read>
              I would like to discuss a refund.
            </ChatBubble>
          )}
          {active >= 4 && (
            <ChatBubble from="assistant">Thanks. I am passing this to a member of the team.</ChatBubble>
          )}
        </div>
      </PanelCard>
      <PanelCard title="What the assistant does" tag="Sample">
        <RecordRow label="Intent" value={active >= 1 ? (active >= 4 ? "Refund request" : "Opening hours") : undefined} />
        <RecordRow label="Source" value={active >= 2 && active < 4 ? "Approved business info" : undefined} tone="success" />
        <RecordRow label="Reply" value={active >= 3 && active < 4 ? "Sent instantly" : undefined} tone="success" />
        <RecordRow label="Handover" value={active >= 4 ? "Passed to a person" : undefined} tone="amber" />
      </PanelCard>
    </div>
  );
}

export function AIAssistantFlow({ variant }: FlowProps) {
  return (
    <FlowCanvas
      flow={flows["ai-agents"]}
      variant={variant}
      renderPanel={(active) => <AssistantPanel active={active} />}
    />
  );
}
