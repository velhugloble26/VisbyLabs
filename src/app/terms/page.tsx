import { buildMetadata } from "@/lib/metadata";
import { Container } from "@/components/ui/Container";
import { HeroBackground } from "@/components/ui/HeroBackground";
import { AnimatedText } from "@/components/ui/AnimatedText";

export const metadata = buildMetadata({
  title: "Terms",
  description: "Terms of use for the Visby Labs website. Draft, to be reviewed by a legal professional.",
  path: "/terms",
});

const sections = [
  {
    title: "Use of this website",
    text: "This website provides information about Visby Labs services. Please use it lawfully and do not attempt to disrupt it.",
  },
  {
    title: "Illustrative content",
    text: "Workflows, records and conversations shown on this site are illustrative and use fictional data. They are not results for any real client and do not represent live integrations.",
  },
  {
    title: "No guarantee of results",
    text: "Marketing and automation results depend on many factors outside our control. Nothing on this website is a guarantee of any outcome.",
  },
  {
    title: "Services",
    text: "Any services we provide will be described in a separate written agreement that sets out scope, fees and responsibilities.",
  },
  {
    title: "Changes",
    text: "We may update these terms from time to time. Continued use of the website means you accept the updated terms.",
  },
];

export default function TermsPage() {
  return (
    <div className="relative overflow-hidden">
      <HeroBackground />
      <Container className="relative max-w-3xl py-16 sm:py-24">
      <p className="mb-4 inline-block rounded-full border border-amber/50 bg-amber/10 px-3 py-1 text-xs font-semibold text-amber">
        Draft, to be reviewed by a legal professional
      </p>
      <AnimatedText as="h1" text="Terms" className="text-4xl font-semibold" />
      <div className="mt-10 space-y-8">
        {sections.map((s) => (
          <section key={s.title}>
            <h2 className="text-xl font-semibold">{s.title}</h2>
            <p className="mt-2 text-muted">{s.text}</p>
          </section>
        ))}
      </div>
      </Container>
    </div>
  );
}
