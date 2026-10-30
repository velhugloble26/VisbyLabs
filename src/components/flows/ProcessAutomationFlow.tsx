"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { flows } from "@/data/flows";
import { FlowCanvas, type FlowProps } from "./FlowCanvas";
import { PanelCard } from "./FlowPanel";

const tools = ["Sheet", "CRM", "Email", "Invoice"];

const comparison = {
  manual: {
    label: "Manual: 6 steps, 3 handoffs",
    steps: ["Read the new request", "Copy details into a sheet", "Update the CRM", "Email the team", "Create the invoice", "Check nothing was missed"],
  },
  automated: {
    label: "Automated: 2 steps, 1 approval",
    steps: ["Review the prepared record", "Approve the important step"],
  },
} as const;

type Mode = keyof typeof comparison;

function ProcessPanel({ active }: { active: number }) {
  const [mode, setMode] = useState<Mode>("automated");
  const current = comparison[mode];
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <PanelCard title="Tools updated" tag="Sample">
        <div className="flex flex-wrap gap-2">
          {tools.map((tool) => (
            <span
              key={tool}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors duration-300",
                active >= 3 ? "border-success/60 bg-success/10 text-success" : "border-line text-muted/60",
              )}
            >
              {tool}
            </span>
          ))}
        </div>
        <p className={cn("mt-4 text-sm", active >= 5 ? "text-amber" : "text-muted/60")}>
          {active >= 5 ? "Waiting for a person to approve the important step." : "Approval gate not reached yet."}
        </p>
      </PanelCard>
      <PanelCard title="Before and after" tag="Illustrative">
        <div className="mb-3 inline-flex rounded-full border border-line p-0.5" role="group" aria-label="Compare ways of working">
          {(Object.keys(comparison) as Mode[]).map((key) => (
            <button
              key={key}
              type="button"
              aria-pressed={mode === key}
              onClick={() => setMode(key)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors",
                mode === key ? "bg-brand text-bg" : "text-muted hover:text-ink",
              )}
            >
              {key}
            </button>
          ))}
        </div>
        <p className="text-sm font-semibold text-ink">{current.label}</p>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-muted">
          {current.steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
        <p className="mt-3 text-xs text-muted">Example only, not a measured result.</p>
      </PanelCard>
    </div>
  );
}

export function ProcessAutomationFlow({ variant }: FlowProps) {
  return (
    <FlowCanvas
      flow={flows.process}
      variant={variant}
      renderPanel={(active) => <ProcessPanel active={active} />}
    />
  );
}
