"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { site } from "@/data/site";
import type { FlowKey } from "@/data/flows";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FlowByKey } from "@/components/flows/FlowByKey";

interface Demo {
  id: string;
  tab: string;
  eyebrow: string;
  title: string;
  text: string;
  flow: FlowKey;
  href: string;
  cta: string;
}

const demos: Demo[] = [
  {
    id: "lead",
    tab: "Lead qualification",
    eyebrow: "01 / Lead acquisition & qualification",
    title: "From a new enquiry to a useful sales conversation",
    text: "A fictional prospect shares their needs. The sample workflow captures the details, applies qualification rules and prepares a handover for a person.",
    flow: "crm",
    href: "/performance-marketing/lead-generation",
    cta: "Explore the lead journey",
  },
  {
    id: "messaging",
    tab: "Messaging and CRM",
    eyebrow: "02 / Messaging & CRM",
    title: "Keep the conversation connected",
    text: "See how an approved message and a CRM update could keep the next person informed.",
    flow: "whatsapp",
    href: "/ai-automation/whatsapp-automation",
    cta: "Try the conversation",
  },
  {
    id: "appointments",
    tab: "Appointments",
    eyebrow: "03 / Appointments",
    title: "Make the booking step clearer",
    text: "Explore a sample journey from an appointment request to a confirmation and reminder.",
    flow: "appointment",
    href: "/ai-automation/appointment-booking",
    cta: "Try the sample calendar",
  },
];

export function DemoShowcase() {
  const [index, setIndex] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const demo = demos[index];

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (index + (e.key === "ArrowRight" ? 1 : -1) + demos.length) % demos.length;
    setIndex(next);
    tabs.current[next]?.focus();
  };

  return (
    <Section labelledBy="demo-title" className="border-y border-line bg-card/30">
      <SectionHeading
        id="demo-title"
        title="See how the pieces could work together"
        text="Explore sample journeys for qualifying an enquiry, updating a customer record and arranging a meeting."
      />

      <div
        role="tablist"
        aria-label="Sample journeys"
        onKeyDown={onKeyDown}
        className="mt-10 inline-flex max-w-full flex-wrap gap-1 rounded-full border border-line bg-bg/60 p-1"
      >
        {demos.map((d, i) => (
          <button
            key={d.id}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            role="tab"
            id={`tab-${d.id}`}
            aria-selected={i === index}
            aria-controls={`panel-${d.id}`}
            tabIndex={i === index ? 0 : -1}
            type="button"
            onClick={() => setIndex(i)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              i === index ? "bg-brand text-bg" : "text-muted hover:text-ink",
            )}
          >
            {d.tab}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`panel-${demo.id}`}
        aria-labelledby={`tab-${demo.id}`}
        className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_2fr]"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-brand">{demo.eyebrow}</p>
          <h3 className="mt-3 text-2xl font-semibold">{demo.title}</h3>
          <p className="mt-3 text-muted">{demo.text}</p>
          <Link
            href={demo.href}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
          >
            {demo.cta}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
        <FlowByKey key={demo.id} id={demo.flow} />
      </div>

      <p className="mt-8 text-sm text-muted">{site.demoNote}</p>
      <Link
        href="/our-work"
        className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
      >
        Explore All Demonstrations
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </Section>
  );
}
