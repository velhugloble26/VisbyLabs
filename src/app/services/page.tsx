import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/metadata";
import { groups, servicePath, servicesByGroup, type ServiceGroup } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { HeroBackground } from "@/components/ui/HeroBackground";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Performance marketing and AI automation services from Visby Labs: Google Ads, Meta Ads, lead generation, WhatsApp automation, CRM workflows and more.",
  path: "/services",
});

const order: ServiceGroup[] = ["performance-marketing", "ai-automation"];

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line" aria-labelledby="services-title">
        <HeroBackground />
        <Container className="relative py-16 sm:py-24">
          <SectionHeading
            as="h1"
            id="services-title"
            eyebrow="Services"
            title="Two services built around how your business grows"
            text="Bring in demand with paid campaigns, then give every enquiry a clear next step."
          />
        </Container>
      </section>

      {order.map((key) => {
        const group = groups[key];
        return (
          <Section key={key} labelledBy={`${key}-title`} className="even:border-t even:border-line even:bg-card/30">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading id={`${key}-title`} title={group.title} text={group.summary} />
              <Link href={group.href} className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:underline">
                Explore {group.title}
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {servicesByGroup(key).map((s) => (
                <Link
                  key={s.slug}
                  href={servicePath(s)}
                  data-motion className="group rounded-2xl border border-line bg-card/70 p-6 transition-colors hover:border-brand"
                >
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted">{s.summary}</p>
                </Link>
              ))}
            </div>
          </Section>
        );
      })}

      <CtaBanner />
    </>
  );
}
