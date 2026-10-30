"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";
import { ServicesDropdown } from "./ServicesDropdown";
import { ThemeToggle } from "./ThemeToggle";

function NavItem({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "text-sm font-medium transition-colors hover:text-ink",
        active ? "text-ink" : "text-muted",
      )}
    >
      {label}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const [home, ...rest] = mainNav;

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-bg/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          <NavItem href={home.href} label={home.label} active={pathname === home.href} />
          <ServicesDropdown />
          {rest.map((l) => (
            <NavItem key={l.href} href={l.href} label={l.label} active={pathname === l.href} />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button href="/contact" className="hidden sm:inline-flex">
            Start a Conversation
          </Button>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-line md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </Container>
      <MobileMenu open={open} onClose={close} />
    </header>
  );
}
