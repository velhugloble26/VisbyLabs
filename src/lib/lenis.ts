import type Lenis from "lenis";

// The single Lenis instance, so other components (like the mobile menu) can pause scrolling.
let instance: Lenis | null = null;

export function setLenis(next: Lenis | null) {
  instance = next;
}

export function getLenis(): Lenis | null {
  return instance;
}
