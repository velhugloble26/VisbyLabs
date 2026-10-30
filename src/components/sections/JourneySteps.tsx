import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";

const steps = [
  { title: "Attract relevant interest", text: "Use paid campaigns with a clear offer and a useful destination." },
  { title: "Capture the context", text: "Record the enquiry and the details your team needs to assess it." },
  {
    title: "Move it forward",
    text: "Route the lead, prompt the next action and send approved follow-ups where appropriate.",
  },
  {
    title: "Keep people involved",
    text: "Give your team ownership of sales conversations, unusual requests and decisions that need judgement.",
  },
];

export function JourneySteps() {
  return (
    <Section labelledBy="journey-title">
      <SectionHeading
        id="journey-title"
        eyebrow="A connected customer journey"
        title="Give every enquiry a clear next step"
        text="Keep people involved. Give your team ownership of sales conversations, unusual requests and decisions that need judgement."
      />
      <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <li key={step.title} className="relative rounded-2xl border border-line bg-card/70 p-6">
            <span className="font-display text-sm font-semibold text-brand">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm text-muted">{step.text}</p>
          </li>
        ))}
      </ol>
      <Link
        href="/ai-automation/crm-lead-management"
        className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline"
      >
        See CRM and lead management
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </Section>
  );
}
