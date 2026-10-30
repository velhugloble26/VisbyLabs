"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { Check, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function PanelCard({
  title,
  tag,
  children,
  className,
}: {
  title: string;
  tag?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-2xl border border-line bg-bg/60 p-4", className)}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-ink">{title}</p>
        {tag && (
          <span className="rounded-full border border-line px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted">
            {tag}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

type Tone = "brand" | "success" | "amber";

const toneClass: Record<Tone, string> = {
  brand: "text-brand",
  success: "text-success",
  amber: "text-amber",
};

/** A labelled value in a sample record. Shows a dash until it has a value. */
export function RecordRow({ label, value, tone = "brand" }: { label: string; value?: string; tone?: Tone }) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-line/60 py-2 text-sm first:border-t-0">
      <span className="text-muted">{label}</span>
      {value ? (
        <motion.span
          key={value}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={cn("text-right font-medium", toneClass[tone])}
        >
          {value}
        </motion.span>
      ) : (
        <span className="text-muted/60" aria-label="Not yet captured">
          &mdash;
        </span>
      )}
    </div>
  );
}

export function ChatBubble({
  from,
  children,
  read = false,
}: {
  from: "customer" | "assistant";
  children: ReactNode;
  read?: boolean;
}) {
  const customer = from === "customer";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("flex", customer ? "justify-end" : "justify-start")}
    >
      <p
        className={cn(
          "max-w-[85%] rounded-2xl px-3 py-2 text-sm",
          customer
            ? "rounded-br-sm bg-brand/15 text-ink"
            : "rounded-bl-sm border border-line bg-card text-ink",
        )}
      >
        {children}
        {customer && (
          <span className="ml-1.5 inline-flex align-middle text-brand">
            {read ? <CheckCheck className="h-3.5 w-3.5" aria-label="Read" /> : <Check className="h-3.5 w-3.5" aria-label="Sent" />}
          </span>
        )}
      </p>
    </motion.div>
  );
}

export function TypingDots() {
  return (
    <div className="flex justify-start" role="status" aria-label="Assistant is typing">
      <span className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-line bg-card px-3 py-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted"
            style={{ animationDelay: `${i * 140}ms` }}
          />
        ))}
      </span>
    </div>
  );
}
