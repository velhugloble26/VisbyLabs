"use client";

import { cn } from "@/lib/utils";
import { flows } from "@/data/flows";
import { FlowCanvas, type FlowProps } from "./FlowCanvas";
import { PanelCard } from "./FlowPanel";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const times = ["10:00", "11:30", "14:00"];
// [day][time]: true when the slot is free in this sample calendar.
const free: boolean[][] = [
  [true, false, true],
  [false, true, true],
  [true, true, false],
  [false, false, true],
  [true, false, false],
];
const chosen = { day: 2, time: 1 };

function CalendarPanel({ active }: { active: number }) {
  const showFree = active >= 1;
  const selected = active >= 2;
  return (
    <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
      <PanelCard title="Sample calendar" tag="Illustrative scheduling workflow">
        <div className="grid grid-cols-5 gap-2" role="grid" aria-label="Sample week">
          {days.map((d) => (
            <p key={d} className="text-center text-xs font-semibold text-muted">
              {d}
            </p>
          ))}
          {times.map((t, ti) =>
            days.map((d, di) => {
              const isFree = free[di][ti];
              const isChosen = selected && di === chosen.day && ti === chosen.time;
              return (
                <span
                  key={`${d}-${t}`}
                  className={cn(
                    "rounded-lg border py-2 text-center text-xs transition-[transform,background-color,border-color] duration-300",
                    isChosen
                      ? "scale-105 border-brand bg-brand text-bg"
                      : showFree && isFree
                        ? "border-success/60 bg-success/10 text-success"
                        : "border-line text-muted/60",
                  )}
                >
                  {t}
                </span>
              );
            }),
          )}
        </div>
      </PanelCard>
      <PanelCard title="Status" tag="Sample">
        <ul className="space-y-2 text-sm">
          <li className={cn(active >= 1 ? "text-ink" : "text-muted/60")}>Availability checked</li>
          <li className={cn(active >= 2 ? "text-ink" : "text-muted/60")}>Slot selected: Wed 11:30</li>
          <li className={cn(active >= 3 ? "text-success" : "text-muted/60")}>Confirmation prepared</li>
          <li className={cn(active >= 4 ? "text-success" : "text-muted/60")}>Reminder queued</li>
          <li className={cn(active >= 5 ? "text-amber" : "text-muted/60")}>Exceptions go to a person</li>
        </ul>
        <p className="mt-3 text-xs text-muted">No booking is made here.</p>
      </PanelCard>
    </div>
  );
}

export function AppointmentBookingFlow({ variant }: FlowProps) {
  return (
    <FlowCanvas
      flow={flows.appointment}
      variant={variant}
      renderPanel={(active) => <CalendarPanel active={active} />}
    />
  );
}
