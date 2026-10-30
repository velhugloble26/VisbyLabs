"use client";

import { flows } from "@/data/flows";
import { FlowCanvas, type FlowProps } from "./FlowCanvas";
import { PanelCard, RecordRow } from "./FlowPanel";

function EmailPanel({ active }: { active: number }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <PanelCard title="Inbound email" tag="Example only">
        <p className="text-sm font-semibold text-ink">Question about your services</p>
        <p className="mt-1 text-sm text-muted">Hello, could you tell me how your onboarding works and what it costs to start?</p>
        {active >= 2 && (
          <p className="mt-3 rounded-xl border border-line bg-card p-3 text-sm text-ink">
            Draft: Thanks for getting in touch. Onboarding starts with a short call about your goals&hellip;
          </p>
        )}
      </PanelCard>
      <PanelCard title="Workflow record" tag="Sample record">
        <RecordRow label="Category" value={active >= 1 ? "New enquiry" : undefined} />
        <RecordRow label="Draft" value={active >= 2 ? "Prepared" : undefined} tone="success" />
        <RecordRow label="Approval" value={active >= 3 ? "Approved by a person" : undefined} tone="amber" />
        <RecordRow label="Logged" value={active >= 4 ? "Sent and saved" : undefined} tone="success" />
      </PanelCard>
    </div>
  );
}

export function EmailWorkflowFlow({ variant }: FlowProps) {
  return (
    <FlowCanvas flow={flows.email} variant={variant} renderPanel={(active) => <EmailPanel active={active} />} />
  );
}
