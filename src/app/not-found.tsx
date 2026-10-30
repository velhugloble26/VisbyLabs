import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { HeroBackground } from "@/components/ui/HeroBackground";
import { AnimatedText } from "@/components/ui/AnimatedText";

const links = [
  { label: "Services", href: "/services" },
  { label: "Performance Marketing", href: "/performance-marketing" },
  { label: "AI Automation", href: "/ai-automation" },
  { label: "Our Work", href: "/our-work" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <div className="relative overflow-hidden">
      <HeroBackground />
      <Container className="relative py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-brand">Error 404</p>
      <AnimatedText as="h1" text="We could not find that page" className="mt-4 text-4xl font-semibold" />
      <p className="mx-auto mt-4 max-w-md text-muted">It may have moved. These pages might help.</p>
      <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-muted hover:text-ink">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
      <Button href="/" size="lg" className="mt-10">
        Back to home
      </Button>
      </Container>
    </div>
  );
}
