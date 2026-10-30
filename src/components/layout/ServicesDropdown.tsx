"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { groups, servicePath, servicesByGroup, type ServiceGroup } from "@/data/services";

const order: ServiceGroup[] = ["performance-marketing", "ai-automation"];

export function ServicesDropdown() {
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!wrapper.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={wrapper}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((o) => !o)}
        className="inline-flex items-center gap-1 text-sm font-medium text-muted transition-colors hover:text-ink"
      >
        Services
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} aria-hidden />
      </button>

      {open && (
        <div className="absolute left-1/2 top-full z-50 w-[36rem] -translate-x-1/2 pt-3">
          <div className="grid grid-cols-2 gap-6 rounded-2xl border border-line bg-card p-6 shadow-2xl">
            {order.map((key) => {
              const group = groups[key];
              return (
                <div key={key}>
                  <Link
                    href={group.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-sm font-semibold text-ink hover:text-brand"
                  >
                    {group.title}
                  </Link>
                  <ul className="mt-3 space-y-2">
                    {servicesByGroup(key).map((service) => (
                      <li key={service.slug}>
                        <Link
                          href={servicePath(service)}
                          onClick={() => setOpen(false)}
                          className="text-sm text-muted transition-colors hover:text-ink"
                        >
                          {service.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
