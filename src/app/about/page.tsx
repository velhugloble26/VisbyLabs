import { buildMetadata } from "@/lib/metadata";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { HeroBackground } from "@/components/ui/HeroBackground";

export const metadata = buildMetadata({
  title: "About Us",
  description:
    "Visby Labs pairs performance marketing with practical AI automation, with people staying in charge of decisions.",
  path: "/about",
});

const principles = [
  { title: "Practical first", text: "We start with the campaign or workflow that needs attention most, not with the most impressive technology." },
  { title: "People stay in charge", text: "Automation handles routine steps. Your team keeps sales conversations, unusual requests and decisions that need judgement." },
  { title: "Honest about limits", text: "We tell you what automation can and cannot do for your business, and we do not promise results we cannot control." },
];

const process = [
  { title: "Listen", text: "You tell us where enquiries arrive, where customer details live and how your team works today." },
  { title: "Assess", text: "We look at what can connect and what needs to change before proposing anything." },
  { title: "Build", text: "We set up campaigns and workflows in small steps you can review." },
  { title: "Review", text: "We check what is working, explain the results plainly and adjust." },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line" aria-labelledby="about-title">
        <HeroBackground />
        <Container className="relative py-16 sm:py-24">
          <SectionHeading
            as="h1"
            id="about-title"
            eyebrow="About Us"
            title="Marketing that brings in demand, and workflows that are ready for it"
            text="Visby Labs helps businesses attract customers through paid campaigns and handle everyday work with practical AI automation."
          />
        </Container>
      </section>

      <Section labelledBy="mission-title">
        <SectionHeading
          id="mission-title"
          title="Our mission"
          text="Too many businesses pay for clicks and then lose the enquiry between tools. Our mission is to connect the campaign with the follow-up, so every enquiry has a clear next step and your team can spend its time on the conversations that matter."
        />
      </Section>

      <Section labelledBy="approach-title" className="border-y border-line bg-card/30">
        <SectionHeading id="approach-title" title="Our approach" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {principles.map((p) => (
            <Card key={p.title}>
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted">{p.text}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section labelledBy="process-title">
        <SectionHeading id="process-title" title="How we work with you" />
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <li key={p.title} className="rounded-2xl border border-line bg-card/70 p-6">
              <span className="font-display text-sm font-semibold text-brand">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted">{p.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <CtaBanner />
    </>
  );
}
