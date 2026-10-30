"use client";

import { Fragment, useCallback, useEffect, useState, type ReactNode } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { site } from "@/data/site";
import type { FlowDef } from "@/data/flows";
import { cn } from "@/lib/utils";
import { useInViewLoop } from "@/hooks/useInViewLoop";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { FlowCaption } from "./FlowCaption";
import { FlowConnector } from "./FlowConnector";
import { FlowNode, type NodeState } from "./FlowNode";

/**
 * full    - nodes, caption, controls and a visual panel.
 * compact - small icon nodes in one row (hero).
 * mini    - compact nodes only, no controls or caption (inside cards).
 */
export type FlowVariant = "full" | "compact" | "mini";

export interface FlowProps {
  variant?: FlowVariant;
}

interface FlowCanvasProps extends FlowProps {
  flow: FlowDef;
  /** Time spent on each step, in milliseconds. */
  stepMs?: number;
  /** Visual shown under the diagram, driven by the active step index. */
  renderPanel?: (active: number) => ReactNode;
}

export function FlowCanvas({ flow, variant = "full", stepMs = 2800, renderPanel }: FlowCanvasProps) {
  const steps = flow.steps;
  const count = steps.length;
  const compact = variant !== "full";

  const reduced = useReducedMotion();
  const { ref, inView } = useInViewLoop<HTMLElement>();
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [held, setHeld] = useState(false);
  const [run, setRun] = useState(0);

  const running = playing && inView && !held && !reduced;

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setActive((a) => (a + 1) % count), stepMs);
    return () => window.clearInterval(id);
  }, [running, count, stepMs, run]);

  const replay = useCallback(() => {
    setActive(0);
    setRun((r) => r + 1);
    setPlaying(true);
  }, []);

  // With reduced motion the diagram is static and shows its finished state.
  const shown = reduced ? count - 1 : active;

  const stateOf = (index: number): NodeState => {
    if (reduced) return "done";
    if (index === shown) return "active";
    return index < shown ? "done" : "idle";
  };

  return (
    <section
      ref={ref}
      data-no-motion
      aria-label={flow.ariaLabel}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={() => setHeld(false)}
      className={cn(
        "rounded-3xl border border-line bg-card/70 backdrop-blur-sm",
        variant === "mini" ? "p-3 sm:p-4" : "p-4 sm:p-6",
      )}
    >
      {variant !== "mini" && (
        <div className="mb-5 flex items-center justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand">{flow.title}</p>
          {!reduced && (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Pause animation" : "Play animation"}
                className="grid h-8 w-8 place-items-center rounded-full border border-line text-muted transition-colors hover:text-ink"
              >
                {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              </button>
              <button
                type="button"
                onClick={replay}
                className="inline-flex h-8 items-center gap-1.5 rounded-full border border-line px-3 text-xs font-medium text-muted transition-colors hover:text-ink"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden />
                Replay
              </button>
            </div>
          )}
        </div>
      )}

      <div
        className={cn(
          "flex",
          compact ? "flex-row items-start" : "flex-col items-stretch md:flex-row md:items-stretch",
        )}
      >
        {steps.map((step, i) => (
          <Fragment key={step.label}>
            <FlowNode step={step} state={stateOf(i)} compact={compact} />
            {i < count - 1 && (
              <FlowConnector
                compact={compact}
                on={reduced || i < shown}
                packet={!reduced && shown === i + 1}
                packetKey={`${run}-${shown}`}
              />
            )}
          </Fragment>
        ))}
      </div>

      {variant !== "mini" && !reduced && (
        <FlowCaption index={shown} total={count} step={steps[shown]} />
      )}

      {/* Text alternative: always available to screen readers, shown to everyone with reduced motion. */}
      <ol className={cn(reduced ? "mt-5 space-y-1.5 text-sm text-muted" : "sr-only")}>
        {steps.map((step) => (
          <li key={step.label}>
            <span className="font-semibold text-ink">{step.label}.</span> {step.caption}
          </li>
        ))}
      </ol>

      {renderPanel && variant !== "mini" && <div className="mt-6">{renderPanel(shown)}</div>}

      <p className="mt-4 text-center text-xs text-muted">{site.flowDisclaimer}</p>
    </section>
  );
}
