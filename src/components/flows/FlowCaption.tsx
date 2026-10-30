"use client";

import { motion } from "motion/react";
import { UserCheck } from "lucide-react";
import type { FlowStep } from "@/data/flows";

interface FlowCaptionProps {
  index: number;
  total: number;
  step: FlowStep;
}

export function FlowCaption({ index, total, step }: FlowCaptionProps) {
  return (
    <div className="mt-5 min-h-[4.25rem] text-center" aria-live="off">
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-sm text-muted sm:text-base">
          <span className="font-semibold text-ink">
            {index + 1}/{total}
          </span>{" "}
          {step.caption}
        </p>
        {step.human && (
          <p className="mx-auto mt-2 inline-flex items-center gap-1.5 rounded-full border border-amber/50 bg-amber/10 px-3 py-1 text-xs font-semibold text-amber">
            <UserCheck className="h-3.5 w-3.5" aria-hidden />
            A person stays in charge here
          </p>
        )}
      </motion.div>
    </div>
  );
}
