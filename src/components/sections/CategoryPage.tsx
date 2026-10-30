import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { groups, servicePath, servicesByGroup, type ServiceGroup } from "@/data/services";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { JsonLd } from "@/components/ui/JsonLd";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FlowByKey } from "@/components/flows/FlowByKey";
import { CampaignVisual } from "./CampaignVisual";
import { CtaBanner } from "./CtaBanner";
import { HeroBackground } from "@/components/ui/HeroBackground";
import { AnimatedText } from "@/components/ui/AnimatedText";

export function categoryMetadata(group: ServiceGroup): Metadata {
  const info = groups[group];
  return buildMetadata({ title: info.title, description: info.summary, path: info.href });
}

export function CategoryPage({ group }: { group: ServiceGroup }) {
  const info = groups[group];
  const items = servicesByGroup(group);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: info.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
      <section className="relative overflow-hidden border-b border-line" aria-labelledby="category-title">
        <HeroBackground />
        <Container className="relative py-16 sm:py-24">
          <Badge tone="brand">Services</Badge>
          <AnimatedText as="h1" id="category-title" text={info.title} className="mt-5 max-w-3xl text-4xl font-semibold sm:text-5xl" />
          <p className="mt-5 max-w-2xl text-lg text-muted">{info.summary}</p>
          <p className="mt-3 max-w-2xl text-muted">{info.intro}</p>
          <Button href="/contact" size="lg" className="mt-8">
            Start a Conversation
          </Button>
        </Container>
      </section>

      <Section labelledBy="visual-title">
        <h2 id="visual-title" className="sr-only">
          How it fits together
        </h2>
        {group === "ai-automation" ? <FlowByKey id="journey" /> : <CampaignVisual />}
      </Section>

      <Section labelledBy="items-title" className="pt-0 sm:pt-0">
        <SectionHeading id="items-title" title={`What is included in ${info.title}`} />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s) => (
            <Link
              key={s.slug}
              href={servicePath(s)}
              data-motion className="group flex flex-col rounded-2xl border border-line bg-card/70 p-6 transition-colors hover:border-brand"
            >
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted">{s.summary}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                Learn more
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <Section labelledBy="faq-title" className="border-t border-line bg-card/30">
        <SectionHeading id="faq-title" title="Questions people ask" />
        <div className="mt-8 max-w-3xl">
          <FaqAccordion faqs={info.faqs} />
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
