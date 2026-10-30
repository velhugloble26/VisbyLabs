import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { AnimatedText } from "@/components/ui/AnimatedText";

export function CtaBanner({
  title = "Tell us what is slowing your business down",
  text = "Share your goal, your current setup and the part that needs attention. We will use that context to discuss a practical starting point.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section aria-labelledby="cta-title" className="py-16 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-line bg-card px-6 py-14 text-center sm:px-12">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(var(--brand)/0.18),transparent_65%)]"
          />
          <div className="relative">
            <AnimatedText as="h2" id="cta-title" text={title} className="mx-auto max-w-2xl text-3xl font-semibold sm:text-4xl" />
            <p className="mx-auto mt-4 max-w-2xl text-muted">{text}</p>
            <Button href="/contact" size="lg" className="mt-8">
              Start a Conversation
            </Button>
            <p className="mt-4 text-sm text-muted">You do not need a technical brief to get in touch.</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
