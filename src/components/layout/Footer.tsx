import Link from "next/link";
import { footerCompany, footerExplore } from "@/data/navigation";
import { groups, servicePath, servicesByGroup } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";

function LinkList({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="font-display text-sm font-semibold text-ink">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-muted transition-colors hover:text-ink">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const pm = servicesByGroup("performance-marketing").map((s) => ({ label: s.title, href: servicePath(s) }));
  const ai = servicesByGroup("ai-automation").map((s) => ({ label: s.title, href: servicePath(s) }));

  return (
    <footer className="border-t border-line bg-card/40">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr_1.3fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted">
              Performance marketing and practical AI automation for businesses improving how they attract customers and
              handle everyday work.
            </p>
          </div>
          <LinkList title="Explore" links={footerExplore} />
          <LinkList title="Company" links={footerCompany} />
          <LinkList title={groups["performance-marketing"].title} links={pm} />
          <LinkList title={groups["ai-automation"].title} links={ai} />
        </div>
        <p className="mt-12 border-t border-line pt-6 text-xs text-muted">
          &copy; {new Date().getFullYear()} Visby Labs. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
