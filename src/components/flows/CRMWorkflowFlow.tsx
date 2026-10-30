"use client";

import { motion } from "motion/react";
import { flows } from "@/data/flows";
import { FlowCanvas, type FlowProps } from "./FlowCanvas";
import { PanelCard, RecordRow } from "./FlowPanel";

const statuses = ["New", "Captured", "Qualified", "Assigned", "Follow-up scheduled", "With the human team"];

function CRMPanel({ active }: { active: number }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <PanelCard title="Sample enquiry: Alex" tag="CRM / sample record">
        <RecordRow label="Source" value="Meta ad" />
        <RecordRow label="Interest" value={active >= 1 ? "Advertising" : undefined} />
        <RecordRow label="Status" value={statuses[active]} tone={active === 5 ? "amber" : "success"} />
        <RecordRow label="Owner" value={active >= 3 ? "Sales team" : undefined} tone="amber" />
        <RecordRow label="Next action" value={active >= 4 ? "Call tomorrow, 10:00" : undefined} />
      </PanelCard>
      <PanelCard title="Qualification rules" tag="Sample">
        <ul className="space-y-2 text-sm text-muted">
          <li>Service is one we offer</li>
          <li>Location is one we serve</li>
          <li>Wants to start within three months</li>
        </ul>
        <div className="mt-4 flex min-h-[2rem] items-center">
          {active >= 2 ? (
            <motion.span
              key="score"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="inline-flex items-center gap-2 rounded-full border border-success/50 bg-success/10 px-3 py-1 text-xs font-semibold text-success"
            >
              Score: High fit
            </motion.span>
          ) : (
            <span className="text-xs text-muted">Waiting for rules to run</span>
          )}
        </div>
      </PanelCard>
    </div>
  );
}

export function CRMWorkflowFlow({ variant }: FlowProps) {
  return (
    <FlowCanvas flow={flows.crm} variant={variant} renderPanel={(active) => <CRMPanel active={active} />} />
  );
}
