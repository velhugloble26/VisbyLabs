export type IconName =
  | "Megaphone"
  | "MessageSquare"
  | "Bot"
  | "Database"
  | "CalendarCheck"
  | "BookOpen"
  | "Send"
  | "UserCheck"
  | "ListChecks"
  | "ClipboardList"
  | "Filter"
  | "UserPlus"
  | "Clock"
  | "Users"
  | "Inbox"
  | "Calendar"
  | "Bell"
  | "Zap"
  | "FileText"
  | "GitBranch"
  | "Plug"
  | "ShieldCheck"
  | "PhoneCall"
  | "Mic"
  | "Tags"
  | "PenLine"
  | "CalendarClock";

export type FlowKey =
  | "journey"
  | "ai-agents"
  | "whatsapp"
  | "crm"
  | "appointment"
  | "process"
  | "voice"
  | "email"
  | "hero";

export interface FlowStep {
  label: string;
  caption: string;
  icon: IconName;
  /** A person is in charge at this step. */
  human?: boolean;
}

export interface FlowDef {
  id: FlowKey;
  title: string;
  ariaLabel: string;
  steps: FlowStep[];
}

export const flows: Record<FlowKey, FlowDef> = {
  journey: {
    id: "journey",
    title: "From first message to confirmed booking",
    ariaLabel:
      "Animated workflow: a message reaches an AI assistant, then the CRM, then appointment booking, with a person reviewing.",
    steps: [
      { label: "Message", icon: "MessageSquare", caption: "A customer sends an enquiry on WhatsApp." },
      { label: "AI assistant", icon: "Bot", caption: "The assistant understands the need and replies." },
      {
        label: "CRM",
        icon: "Database",
        human: true,
        caption: "The CRM record is created and a person reviews it where needed.",
      },
      { label: "Booking", icon: "CalendarCheck", caption: "A slot is confirmed and a reminder is sent." },
    ],
  },
  "ai-agents": {
    id: "ai-agents",
    title: "AI assistant",
    ariaLabel:
      "Animated workflow: a customer question is understood, answered from business knowledge, and sensitive requests are handed to a person.",
    steps: [
      { label: "Customer question", icon: "MessageSquare", caption: "A customer asks a question on your website or messaging channel." },
      { label: "Understand intent", icon: "Bot", caption: "The assistant works out what the person actually needs." },
      { label: "Check knowledge", icon: "BookOpen", caption: "It looks up approved answers from your own business information." },
      { label: "Reply instantly", icon: "Send", caption: "A clear reply goes out straight away, at any hour." },
      {
        label: "Hand to a person",
        icon: "UserCheck",
        human: true,
        caption: "Unusual or sensitive requests are passed to your team, with the conversation attached.",
      },
    ],
  },
  whatsapp: {
    id: "whatsapp",
    title: "WhatsApp automation",
    ariaLabel:
      "Animated workflow: a WhatsApp message is answered by an assistant, details are captured into the CRM, and the team follows up.",
    steps: [
      { label: "Customer message", icon: "MessageSquare", caption: "A customer messages your business on WhatsApp." },
      { label: "Assistant replies", icon: "Bot", caption: "An approved reply asks a qualifying question." },
      { label: "Details captured", icon: "ListChecks", caption: "The customer's answers are turned into structured details." },
      { label: "CRM updated", icon: "Database", caption: "The record is created or updated, so the next person is informed." },
      {
        label: "Team follows up",
        icon: "UserCheck",
        human: true,
        caption: "A person reviews the record and takes over the sales conversation.",
      },
    ],
  },
  crm: {
    id: "crm",
    title: "CRM and lead management",
    ariaLabel:
      "Animated workflow: a lead is captured with context, qualified by rules, routed to an owner, and a person owns the sales conversation.",
    steps: [
      { label: "Lead arrives", icon: "Megaphone", caption: "An enquiry comes in from a website form, a Meta ad or a Google ad." },
      { label: "Context captured", icon: "ClipboardList", caption: "The enquiry and the details your team needs are recorded together." },
      { label: "Rules applied", icon: "Filter", caption: "Your qualification rules score the enquiry." },
      { label: "Routed to owner", icon: "UserPlus", caption: "The lead is assigned, so someone clearly owns it." },
      { label: "Next action set", icon: "CalendarClock", caption: "A follow-up is scheduled and a reminder is prepared." },
      {
        label: "Team owns it",
        icon: "Users",
        human: true,
        caption: "Your team owns the sales conversation, unusual requests and decisions.",
      },
    ],
  },
  appointment: {
    id: "appointment",
    title: "Appointment booking",
    ariaLabel:
      "Animated workflow: an appointment request leads to an availability check, a selected slot, a confirmation and a reminder, with exceptions sent to a person.",
    steps: [
      { label: "Request received", icon: "Inbox", caption: "A customer asks for an appointment." },
      { label: "Check availability", icon: "Calendar", caption: "Open times are checked against your calendar rules." },
      { label: "Select a slot", icon: "Clock", caption: "The customer picks from the available slots." },
      { label: "Confirm", icon: "CalendarCheck", caption: "A confirmation message is prepared." },
      { label: "Send reminder", icon: "Bell", caption: "A reminder goes out before the appointment." },
      {
        label: "Exceptions",
        icon: "UserCheck",
        human: true,
        caption: "Anything unusual, such as a clash or a special request, goes to a person.",
      },
    ],
  },
  process: {
    id: "process",
    title: "Business process automation",
    ariaLabel:
      "Animated workflow: a trigger starts a process, data is extracted, rules are applied, tools are updated, the team is notified and important steps wait for human approval.",
    steps: [
      { label: "Trigger", icon: "Zap", caption: "A new form, email or message starts the process." },
      { label: "Extract data", icon: "FileText", caption: "The useful details are pulled out and checked." },
      { label: "Apply rules", icon: "GitBranch", caption: "Conditions decide which path the work takes." },
      { label: "Update tools", icon: "Plug", caption: "Your sheet, CRM, email or invoice tool is updated." },
      { label: "Notify team", icon: "Bell", caption: "The right person is told what happened and what is next." },
      {
        label: "Approval gate",
        icon: "ShieldCheck",
        human: true,
        caption: "Important steps wait for a person to approve them.",
      },
    ],
  },
  voice: {
    id: "voice",
    title: "AI voice agent",
    ariaLabel:
      "Animated workflow: a call is answered, the caller's intent is captured, a summary is written to the CRM, and a person calls back if needed.",
    steps: [
      { label: "Call answered", icon: "PhoneCall", caption: "The voice assistant answers the call and greets the caller." },
      { label: "Intent captured", icon: "Mic", caption: "It listens for what the caller needs and key details." },
      { label: "Summary written", icon: "FileText", caption: "A short transcript summary is prepared." },
      { label: "CRM note added", icon: "Database", caption: "The summary is saved against the customer's record." },
      {
        label: "Callback",
        icon: "UserCheck",
        human: true,
        caption: "A person calls back when the request needs judgement.",
      },
    ],
  },
  email: {
    id: "email",
    title: "Email and workflow automation",
    ariaLabel:
      "Animated workflow: an inbound email is classified, a draft reply is prepared, a person approves it, and it is sent and logged.",
    steps: [
      { label: "Email arrives", icon: "Inbox", caption: "A new email reaches your shared inbox." },
      { label: "Classified", icon: "Tags", caption: "It is sorted by type, such as enquiry, support or invoice." },
      { label: "Draft prepared", icon: "PenLine", caption: "A reply draft is prepared from approved wording." },
      {
        label: "Person approves",
        icon: "UserCheck",
        human: true,
        caption: "A person reviews and approves before anything is sent.",
      },
      { label: "Sent and logged", icon: "Send", caption: "The reply is sent and the conversation is logged." },
    ],
  },
  hero: {
    id: "hero",
    title: "Google / Meta advertising to enquiry",
    ariaLabel:
      "Animated workflow: advertising brings an enquiry, an AI assistant responds, the CRM records it, and a booking is arranged.",
    steps: [
      { label: "Google / Meta ads", icon: "Megaphone", caption: "Paid campaigns bring in people who may need what you offer." },
      { label: "Enquiry", icon: "MessageSquare", caption: "A new customer enquiry is captured." },
      { label: "AI assistant", icon: "Bot", caption: "The assistant replies and asks what they would like to improve." },
      { label: "CRM", icon: "Database", human: true, caption: "A sample record is ready for your team to review." },
      { label: "Booking", icon: "CalendarCheck", caption: "A follow-up is prepared. A person confirms the details." },
    ],
  },
};
