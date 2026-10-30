import { buildMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/Section";
import { ContactForm } from "@/components/forms/ContactForm";
import { HeroBackground } from "@/components/ui/HeroBackground";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Tell Visby Labs what is slowing your business down. Share your goal and current setup and we will discuss a practical starting point.",
  path: "/contact",
});

const next = [
  "A person reads your message. It is not sent to a bot.",
  "We reply with questions or a practical starting point.",
  "If it is a fit, we assess your tools and agree a first step with you.",
];

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="contact-title">
      <HeroBackground />
      <Container className="relative grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <SectionHeading
            as="h1"
            id="contact-title"
            eyebrow="Contact"
            title="Tell us what is slowing your business down"
            text="Share your goal, your current setup and the part that needs attention. You do not need a technical brief to get in touch."
          />
          <div className="mt-10">
            <ContactForm />
          </div>
        </div>
        <aside aria-labelledby="after-title" className="lg:pt-32">
          <h2 id="after-title" className="font-display text-xl font-semibold">
            What happens after you submit
          </h2>
          <ol className="mt-5 space-y-4">
            {next.map((n, i) => (
              <li key={n} className="flex gap-3 text-muted">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand/15 text-xs font-semibold text-brand">
                  {i + 1}
                </span>
                {n}
              </li>
            ))}
          </ol>
        </aside>
      </Container>
    </section>
  );
}
