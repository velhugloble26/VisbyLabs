"use client";

import { flows } from "@/data/flows";
import { FlowCanvas, type FlowProps } from "./FlowCanvas";

/** Message to AI assistant to CRM to Booking, with a person reviewing at the CRM. */
export function JourneyFlow({ variant }: FlowProps) {
  return <FlowCanvas flow={flows.journey} variant={variant} />;
}
