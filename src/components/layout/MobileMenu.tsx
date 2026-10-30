"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { groups, servicePath, servicesByGroup, type ServiceGroup } from "@/data/services";
import { Button } from "@/components/ui/Button";
import { getLenis } from "@/lib/lenis";

const order: ServiceGroup[] = ["performance-marketing", "ai-automation"];

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    getLenis()?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      getLenis()?.start();
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 md:hidden"
            aria-hidden
          />
          <motion.aside
            key="panel"
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            data-lenis-prevent
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            className="fixed inset-y-0 right-0 z-50 flex w-[min(22rem,90vw)] flex-col overflow-y-auto border-l border-line bg-bg p-6 md:hidden"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="mb-6 ml-auto grid h-10 w-10 place-items-center rounded-full border border-line"
            >
              <X className="h-5 w-5" />
            </button>

            <nav aria-label="Mobile">
              <ul className="space-y-1">
                {mainNav.slice(0, 1).map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} onClick={onClose} className="block py-2 text-lg font-medium">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {order.map((key) => (
                <div key={key} className="mt-5">
                  <Link
                    href={groups[key].href}
                    onClick={onClose}
                    className="text-xs font-semibold uppercase tracking-widest text-brand"
                  >
                    {groups[key].title}
                  </Link>
                  <ul className="mt-2 space-y-1">
                    {servicesByGroup(key).map((s) => (
                      <li key={s.slug}>
                        <Link href={servicePath(s)} onClick={onClose} className="block py-1.5 text-muted hover:text-ink">
                          {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <ul className="mt-5 space-y-1 border-t border-line pt-4">
                {mainNav.slice(1).map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} onClick={onClose} className="block py-2 text-lg font-medium">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <Button href="/contact" size="lg" className="mt-8 w-full">
              Start a Conversation
            </Button>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
