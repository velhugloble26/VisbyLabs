"use client";

import { useEffect, useRef } from "react";

/**
 * Animated backdrop for every page header: a drifting aurora, a moving grid, a light
 * sweep, and a live network of connected nodes with signals travelling along the links,
 * which also reacts to the cursor. Pauses when off screen or in a background tab, uses
 * the active theme colours, and draws one still frame for reduced motion.
 * Place it as the first child of a `relative overflow-hidden` wrapper.
 */

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}
interface Pulse {
  from: number;
  to: number;
  t: number;
  speed: number;
}

const LINK_DISTANCE = 150;
const MOUSE_RADIUS = 190;
const MAX_PULSES = 7;

/** Reads a theme token like "79 140 255" and returns "79,140,255". */
function token(name: string, fallback: string): string {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return raw ? raw.split(/\s+/).join(",") : fallback;
}

export function HeroBackground() {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const cv = canvas.current;
    const ctx = cv?.getContext("2d");
    if (!el || !cv || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let colors = { brand: "79,140,255", success: "34,211,166" };
    const mouse = { x: 0, y: 0, active: false };
    let visible = false;
    let raf = 0;
    let last = 0;

    const makeNode = (): Node => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.28,
      vy: (Math.random() - 0.5) * 0.28,
      r: 1.2 + Math.random() * 1.8,
    });

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, width, height);

      // Move nodes, nudging them away from the cursor.
      if (dt > 0) {
        for (const n of nodes) {
          if (mouse.active) {
            const dx = n.x - mouse.x;
            const dy = n.y - mouse.y;
            const d = Math.hypot(dx, dy);
            if (d < MOUSE_RADIUS && d > 0.001) {
              const push = (1 - d / MOUSE_RADIUS) * 0.035 * dt;
              n.vx += (dx / d) * push;
              n.vy += (dy / d) * push;
            }
          }
          const speed = Math.hypot(n.vx, n.vy);
          if (speed > 0.55) {
            n.vx *= 0.55 / speed;
            n.vy *= 0.55 / speed;
          }
          n.x += n.vx * dt;
          n.y += n.vy * dt;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;
          n.x = Math.min(Math.max(n.x, 0), width);
          n.y = Math.min(Math.max(n.y, 0), height);
        }
      }

      // Links between nearby nodes.
      const neighbours: number[][] = nodes.map(() => []);
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < LINK_DISTANCE) {
            neighbours[i].push(j);
            neighbours[j].push(i);
            ctx.strokeStyle = `rgba(${colors.brand},${(1 - d / LINK_DISTANCE) * 0.38})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // The cursor connects to nearby nodes.
      if (mouse.active) {
        for (const n of nodes) {
          const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
          if (d < MOUSE_RADIUS) {
            ctx.strokeStyle = `rgba(${colors.success},${(1 - d / MOUSE_RADIUS) * 0.6})`;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(n.x, n.y);
            ctx.stroke();
          }
        }
      }

      // Nodes.
      ctx.fillStyle = `rgba(${colors.brand},0.85)`;
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Signals travelling along links, hopping from node to node like a workflow.
      if (dt > 0) {
        if (pulses.length < MAX_PULSES && Math.random() < 0.03 * dt) {
          const from = Math.floor(Math.random() * nodes.length);
          const options = neighbours[from];
          if (options.length) {
            pulses.push({ from, to: options[Math.floor(Math.random() * options.length)], t: 0, speed: 0.012 + Math.random() * 0.012 });
          }
        }
        pulses = pulses.filter((p) => {
          p.t += p.speed * dt;
          if (p.t < 1) return true;
          const options = (neighbours[p.to] ?? []).filter((k) => k !== p.from);
          if (options.length && Math.random() < 0.75) {
            p.from = p.to;
            p.to = options[Math.floor(Math.random() * options.length)];
            p.t = 0;
            return true;
          }
          return false;
        });
      }
      for (const p of pulses) {
        const a = nodes[p.from];
        const b = nodes[p.to];
        if (!a || !b) continue;
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        const glow = ctx.createRadialGradient(x, y, 0, x, y, 12);
        glow.addColorStop(0, `rgba(${colors.success},0.95)`);
        glow.addColorStop(1, `rgba(${colors.success},0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.fill();
      }

      if (mouse.active) {
        el.style.setProperty("--mx", `${mouse.x}px`);
        el.style.setProperty("--my", `${mouse.y}px`);
      }
    };

    const readColors = () => {
      colors = { brand: token("--brand", colors.brand), success: token("--success", colors.success) };
      if (reduced) draw(0);
    };

    const resize = () => {
      const rect = el.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(width * dpr);
      cv.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = Math.round(Math.min(Math.max((width * height) / 15000, 20), 80));
      while (nodes.length < target) nodes.push(makeNode());
      nodes = nodes.slice(0, target);
      pulses = [];
      if (reduced) draw(0);
    };

    const frame = (now: number) => {
      const dt = last ? Math.min((now - last) / 16.67, 3) : 1;
      last = now;
      draw(dt);
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (reduced || raf || !visible || document.hidden) return;
      last = 0;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = el.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = mouse.x >= 0 && mouse.y >= 0 && mouse.x <= rect.width && mouse.y <= rect.height;
      el.dataset.hover = mouse.active ? "true" : "false";
    };
    const onLeave = () => {
      mouse.active = false;
      el.dataset.hover = "false";
    };

    const sizeObserver = new ResizeObserver(resize);
    const viewObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    const themeObserver = new MutationObserver(readColors);
    const colorScheme = window.matchMedia("(prefers-color-scheme: light)");
    const onVisibility = () => (document.hidden ? stop() : start());

    readColors();
    resize();
    sizeObserver.observe(el);
    viewObserver.observe(el);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    colorScheme.addEventListener("change", readColors);
    document.addEventListener("visibilitychange", onVisibility);
    if (!reduced) {
      window.addEventListener("pointermove", onPointer, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }

    return () => {
      stop();
      sizeObserver.disconnect();
      viewObserver.disconnect();
      themeObserver.disconnect();
      colorScheme.removeEventListener("change", readColors);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div ref={wrap} aria-hidden className="hero-bg">
      <span className="hero-bg__orb hero-bg__orb--a" />
      <span className="hero-bg__orb hero-bg__orb--b" />
      <span className="hero-bg__orb hero-bg__orb--c" />
      <span className="hero-bg__orb hero-bg__orb--d" />
      <span className="hero-bg__grid" />
      <span className="hero-bg__beam" />
      <canvas ref={canvas} className="hero-bg__canvas" />
      <span className="hero-bg__spot" />
    </div>
  );
}
