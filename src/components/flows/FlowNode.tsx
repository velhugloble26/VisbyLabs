import { cn } from "@/lib/utils";
import type { FlowStep } from "@/data/flows";
import { flowIcons } from "./icons";

export type NodeState = "idle" | "active" | "done";

interface FlowNodeProps {
  step: FlowStep;
  state: NodeState;
  compact?: boolean;
}

function iconTone(state: NodeState, human: boolean) {
  if (state === "active") return human ? "bg-amber/15 text-amber" : "bg-brand/15 text-brand";
  if (state === "done") return "bg-success/10 text-success";
  return "bg-line/40 text-muted";
}

export function FlowNode({ step, state, compact = false }: FlowNodeProps) {
  const Icon = flowIcons[step.icon];
  const human = Boolean(step.human);
  const active = state === "active";

  if (compact) {
    return (
      <div className="flex w-14 shrink-0 flex-col items-center gap-1.5 text-center sm:w-16">
        <span
          className={cn(
            "grid h-11 w-11 place-items-center rounded-xl border bg-card transition-[transform,box-shadow,border-color] duration-300",
            active
              ? human
                ? "-translate-y-0.5 border-amber shadow-[0_0_22px_rgb(var(--amber)/0.35)]"
                : "-translate-y-0.5 border-brand shadow-[0_0_22px_rgb(var(--brand)/0.4)]"
              : state === "done"
                ? "border-success/40"
                : "border-line",
            iconTone(state, human),
          )}
        >
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <span
          className={cn(
            "text-[11px] font-medium leading-tight transition-colors",
            active ? "text-ink" : "text-muted",
          )}
        >
          {step.label}
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex w-full items-center gap-3 rounded-2xl border bg-card p-3 transition-[transform,box-shadow,border-color] duration-300",
        "md:w-[7.5rem] md:shrink-0 md:flex-col md:gap-2 md:px-2 md:py-4 md:text-center",
        active
          ? human
            ? "border-amber shadow-[0_0_28px_rgb(var(--amber)/0.3)] md:-translate-y-1"
            : "border-brand shadow-[0_0_28px_rgb(var(--brand)/0.35)] md:-translate-y-1"
          : state === "done"
            ? "border-success/40"
            : "border-line",
      )}
    >
      <span
        className={cn(
          "grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors duration-300",
          iconTone(state, human),
        )}
      >
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold leading-tight text-ink">{step.label}</span>
        {human && (
          <span className="mt-1 block text-[10px] font-semibold uppercase tracking-wide text-amber">
            Person in charge
          </span>
        )}
      </span>
    </div>
  );
}
