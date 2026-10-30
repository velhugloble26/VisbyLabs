import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";

const options = [
  {
    title: "More qualified enquiries",
    text: "Review the offer, campaign and qualification journey.",
    href: "/performance-marketing/lead-generation",
  },
  {
    title: "Clearer ad reporting",
    text: "Understand which actions you measure and where the gaps are.",
    href: "/performance-marketing/conversion-tracking-analytics",
  },
  {
    title: "More consistent follow-up",
    text: "Give leads an owner and a visible next action.",
    href: "/ai-automation/crm-lead-management",
  },
  {
    title: "Less manual work",
    text: "Identify a repeatable process that is worth automating.",
    href: "/ai-automation/business-process-automation",
  },
];

export function ImproveFirst() {
  return (
    <Section labelledBy="improve-title" className="border-y border-line bg-card/30">
      <SectionHeading id="improve-title" title="What would you like to improve first?" />
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {options.map((o) => (
          <Link
            key={o.href}
            href={o.href}
            data-motion className="group flex items-start justify-between gap-4 rounded-2xl border border-line bg-card/70 p-6 transition-colors hover:border-brand"
          >
            <span>
              <span className="block text-lg font-semibold">{o.title}</span>
              <span className="mt-1 block text-sm text-muted">{o.text}</span>
            </span>
            <ArrowUpRight
              className="mt-1 h-5 w-5 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
              aria-hidden
            />
          </Link>
        ))}
      </div>
    </Section>
  );
}
