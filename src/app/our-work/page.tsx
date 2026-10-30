import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { site } from "@/data/site";
import type { FlowKey } from "@/data/flows";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FlowByKey } from "@/components/flows/FlowByKey";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { HeroBackground } from "@/components/ui/HeroBackground";

export const metadata = buildMetadata({
  title: "Our Work",
  description:
    "Explore illustrative demonstrations of how enquiries, messages, CRM records and bookings could work together. Fictional data only.",
  path: "/our-work",
});

const demos: { flow: FlowKey; title: string; text: string; href: string }[] = [
  { flow: "crm", title: "Lead qualification", text: "From a new enquiry to a useful sales conversation.", href: "/ai-automation/crm-lead-management" },
  { flow: "whatsapp", title: "WhatsApp and CRM", text: "Keep the conversation and the customer record connected.", href: "/ai-automation/whatsapp-automation" },
  { flow: "appointment", title: "Appointment booking", text: "From a request to a confirmation and reminder.", href: "/ai-automation/appointment-booking" },
  { flow: "ai-agents", title: "AI assistant", text: "Quick answers from approved information, with handover.", href: "/ai-automation/ai-agents" },
  { flow: "process", title: "Business process automation", text: "Routine steps move on, important steps wait for approval.", href: "/ai-automation/business-process-automation" },
  { flow: "voice", title: "AI voice agent", text: "Answer calls, capture details and pass the right ones on.", href: "/ai-automation/ai-voice-agents" },
  { flow: "email", title: "Email workflow", text: "Sort and draft routine email with a person approving.", href: "/ai-automation/email-workflow-automation" },
];

export default function OurWorkPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line" aria-labelledby="work-title">
        <HeroBackground />
        <Container className="relative py-16 sm:py-24">
          <SectionHeading
            as="h1"
            id="work-title"
            eyebrow="Our Work"
            title="See how the pieces could work together"
            text="These are illustrative demonstrations. They show how a workflow could look, not results for any real client."
          />
          <p className="mt-4 text-sm text-muted">{site.demoNote}</p>
        </Container>
      </section>

      <Section>
        <div className="space-y-16">
          {demos.map((d) => (
            <article key={d.flow} aria-labelledby={`demo-${d.flow}`} className="grid items-start gap-8 lg:grid-cols-[1fr_2fr]">
              <div>
                <h2 id={`demo-${d.flow}`} className="text-2xl font-semibold">
                  {d.title}
                </h2>
                <p className="mt-3 text-muted">{d.text}</p>
                <Link href={d.href} className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline">
                  Learn about this service
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
              <FlowByKey id={d.flow} />
            </article>
          ))}
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
