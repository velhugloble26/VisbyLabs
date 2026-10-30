"use client";

import type { ComponentType } from "react";
import type { FlowKey } from "@/data/flows";
import type { FlowProps } from "./FlowCanvas";
import { AIAssistantFlow } from "./AIAssistantFlow";
import { AppointmentBookingFlow } from "./AppointmentBookingFlow";
import { CRMWorkflowFlow } from "./CRMWorkflowFlow";
import { EmailWorkflowFlow } from "./EmailWorkflowFlow";
import { HeroFlow } from "./HeroFlow";
import { JourneyFlow } from "./JourneyFlow";
import { ProcessAutomationFlow } from "./ProcessAutomationFlow";
import { VoiceAgentFlow } from "./VoiceAgentFlow";
import { WhatsAppFlow } from "./WhatsAppFlow";

const registry: Record<FlowKey, ComponentType<FlowProps>> = {
  journey: JourneyFlow,
  "ai-agents": AIAssistantFlow,
  whatsapp: WhatsAppFlow,
  crm: CRMWorkflowFlow,
  appointment: AppointmentBookingFlow,
  process: ProcessAutomationFlow,
  voice: VoiceAgentFlow,
  email: EmailWorkflowFlow,
  hero: HeroFlow,
};

/** Lets Server Components pick a flow by its string key. */
export function FlowByKey({ id, variant }: { id: FlowKey } & FlowProps) {
  const Flow = registry[id];
  return <Flow variant={variant} />;
}
