"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tracks whether an element is on screen, so loops can start when it scrolls
 * into view and pause when it leaves.
 */
export function useInViewLoop<T extends Element>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}
