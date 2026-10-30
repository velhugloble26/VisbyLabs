"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { animate } from "motion/react";

/**
 * Site-wide text and block animation. On every page it finds the headings, paragraphs,
 * list items, cards, forms and figures and eases each in as it reaches the viewport,
 * so new pages are covered automatically.
 *
 * Opt out with `data-no-motion` on a wrapper. Elements that animate themselves
 * (AnimatedText) carry `data-animated`; elements marked `data-motion` animate as one block.
 *
 * Elements are revealed by scroll position, not by an observer, so jumping straight to
 * an anchor or the bottom of the page never leaves anything above you hidden.
 */
const SELECTOR = [
  "main h2",
  "main h3",
  "main h4",
  "main p",
  "main li",
  "main details",
  "main figure",
  "main form",
  "main [data-motion]",
  "footer h3",
  "footer p",
  "footer li",
].join(",");

const EASE = [0.22, 1, 0.36, 1] as const;

export function GlobalMotion() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const candidates = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR)).filter(
      (el) =>
        !el.closest("[data-no-motion]") &&
        !el.closest("[data-animated]") &&
        !el.closest("[aria-hidden='true']") &&
        !el.closest(".sr-only"),
    );
    // Keep only the outermost element of any nested group, so nothing fades twice.
    const targets = candidates.filter((el) => !candidates.some((other) => other !== el && other.contains(el)));

    const pending = new Set(targets);
    targets.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translate3d(0, 20px, 0)";
    });

    let batch = 0;
    let resetBatch: number | undefined;
    const reveal = (el: HTMLElement) => {
      pending.delete(el);
      const delay = Math.min(batch++, 6) * 0.06;
      window.clearTimeout(resetBatch);
      resetBatch = window.setTimeout(() => (batch = 0), 150);
      animate(el, { opacity: 1, transform: "translate3d(0, 0, 0)" }, { duration: 0.65, delay, ease: EASE }).then(() => {
        el.style.removeProperty("opacity");
        el.style.removeProperty("transform");
      });
    };

    const check = () => {
      const line = window.innerHeight * 0.95;
      pending.forEach((el) => {
        if (el.getBoundingClientRect().top < line) reveal(el);
      });
    };

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(check);
    };

    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(resetBatch);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      targets.forEach((el) => {
        el.style.removeProperty("opacity");
        el.style.removeProperty("transform");
      });
    };
  }, [pathname]);

  return null;
}
