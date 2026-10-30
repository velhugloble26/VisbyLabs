import { site } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroFlow } from "@/components/flows/HeroFlow";
import { HeroBackground } from "@/components/ui/HeroBackground";
import { AnimatedText } from "@/components/ui/AnimatedText";

export function Hero() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      <HeroBackground />
      <Container className="relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-brand">
            Performance Marketing + AI Automation
          </p>
          <AnimatedText as="h1" id="hero-title" text={site.tagline} stagger={0.07} className="text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl" />
          <p className="mt-6 max-w-xl text-lg text-muted">
            Visby Labs helps you reach potential customers through paid campaigns and build the workflows to respond,
            follow up and keep work moving.
          </p>
          <p className="mt-3 text-sm text-muted">Start with the campaign or workflow that needs attention most.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact" size="lg">
              Start a Conversation
            </Button>
            <Button href="/services" size="lg" variant="secondary">
              Explore Services
            </Button>
          </div>
        </div>
        <HeroFlow />
      </Container>
    </section>
  );
}
