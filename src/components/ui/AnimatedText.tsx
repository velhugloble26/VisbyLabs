"use client";

import { useEffect, useRef, useState, type ElementType } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

type Tag = "h1" | "h2" | "h3" | "p" | "span";

interface AnimatedTextProps {
  text: string;
  as?: Tag;
  id?: string;
  className?: string;
  /** Seconds before the first word appears. */
  delay?: number;
  /** Seconds between words. */
  stagger?: number;
}

const word: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: ({ delay, i, stagger }: { delay: number; i: number; stagger: number }) => ({
    y: "0%",
    opacity: 1,
    transition: { duration: 0.6, delay: delay + i * stagger, ease: [0.22, 1, 0.36, 1] },
  }),
};

/**
 * Reveals text word by word once it reaches the viewport. Position is checked on scroll
 * (not with an observer), so jumping to an anchor or the page bottom never leaves a
 * heading hidden. Screen readers get the whole sentence; reduced motion shows plain text.
 */
export function AnimatedText({ text, as = "span", id, className, delay = 0, stagger = 0.045 }: AnimatedTextProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  const Tag = as as ElementType;

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    let frame = 0;
    const check = () => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
        setShown(true);
        stop();
      }
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(check);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return stop;
  }, [reduced]);

  if (reduced) {
    return (
      <Tag id={id} className={className}>
        {text}
      </Tag>
    );
  }

  const words = text.split(" ");
  return (
    <Tag ref={ref} id={id} aria-label={text} data-animated className={className}>
      {words.map((w, i) => (
        <span key={`${w}-${i}`} aria-hidden className="inline-block overflow-hidden pb-[0.12em] align-bottom -mb-[0.12em]">
          <motion.span
            className="inline-block"
            variants={word}
            custom={{ delay, i, stagger }}
            initial="hidden"
            animate={shown ? "visible" : "hidden"}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
