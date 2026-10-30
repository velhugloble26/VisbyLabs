import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { getService, groups, servicePath } from "@/data/services";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { JsonLd } from "@/components/ui/JsonLd";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FlowByKey } from "@/components/flows/FlowByKey";
import { CampaignVisual } from "./CampaignVisual";
import { CtaBanner } from "./CtaBanner";
import { HeroBackground } from "@/components/ui/HeroBackground";
import { AnimatedText } from "@/components/ui/AnimatedText";

export function serviceMetadata(slug: string): Metadata {
  const service = getService(slug);
  return buildMetadata({
    title: service.title,
    description: `${service.summary} ${service.heroText}`,
    path: servicePath(service),
  });
}

export function ServicePage({ slug }: { slug: string }) {
  const service = getService(slug);
  const group = groups[service.group];
  const related = service.related.map(getService);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: service.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />

      <section className="relative overflow-hidden border-b border-line" aria-labelledby="service-title">
        <HeroBackground />
        <Container className="relative py-16 sm:py-24">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-muted">
            <Link href="/services" className="hover:text-ink">
              Services
            </Link>
            <span aria-hidden> / </span>
            <Link href={group.href} className="hover:text-ink">
              {group.title}
            </Link>
          </nav>
          <Badge tone="brand">{group.title}</Badge>
          <AnimatedText as="h1" id="service-title" text={service.heroTitle} className="mt-5 max-w-3xl text-4xl font-semibold sm:text-5xl" />
          <p className="mt-5 max-w-2xl text-lg text-muted">{service.heroText}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact" size="lg">
              Start a Conversation
            </Button>
            <Button href={group.href} size="lg" variant="secondary">
              All {group.title}
            </Button>
          </div>
        </Container>
      </section>

      <Section labelledBy="visual-title">
        <h2 id="visual-title" className="sr-only">
          {service.flow ? "How this workflow moves" : "Illustrative campaign view"}
        </h2>
        {service.flow ? <FlowByKey id={service.flow} /> : <CampaignVisual title={`${service.title}: illustrative view`} />}
      </Section>

      <Section labelledBy="what-title" className="pt-0 sm:pt-0">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading id="what-title" title="What it is" text={service.what} />
          </div>
          <div>
            <h2 className="font-display text-xl font-semibold">Where it helps</h2>
            <ul className="mt-5 space-y-3">
              {service.helps.map((h) => (
                <li key={h} className="flex gap-3 text-muted">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-success" aria-hidden />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section labelledBy="how-title" className="border-y border-line bg-card/30">
        <SectionHeading id="how-title" title="How it works" />
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {service.how.map((step, i) => (
            <li key={step.title} className="rounded-2xl border border-line bg-card/70 p-6">
              <span className="font-display text-sm font-semibold text-brand">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section labelledBy="people-title">
        <Card className="border-amber/40 bg-amber/5">
          <h2 id="people-title" className="font-display text-xl font-semibold text-amber">
            Where people stay involved
          </h2>
          <p className="mt-3 max-w-3xl text-muted">{service.people}</p>
        </Card>
      </Section>

      <Section labelledBy="faq-title" className="pt-0 sm:pt-0">
        <SectionHeading id="faq-title" title="Questions people ask" />
        <div className="mt-8 max-w-3xl">
          <FaqAccordion faqs={service.faqs} />
        </div>
      </Section>

      <Section labelledBy="related-title" className="border-t border-line bg-card/30">
        <SectionHeading id="related-title" title="Related services" />
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {related.map((r) => (
            <Link
              key={r.slug}
              href={servicePath(r)}
              data-motion className="group rounded-2xl border border-line bg-card/70 p-5 transition-colors hover:border-brand"
            >
              <span className="flex items-center justify-between font-semibold">
                {r.title}
                <ArrowRight className="h-4 w-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-brand" aria-hidden />
              </span>
              <span className="mt-2 block text-sm text-muted">{r.summary}</span>
            </Link>
          ))}
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
