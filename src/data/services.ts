import type { FlowKey } from "./flows";

export type ServiceGroup = "performance-marketing" | "ai-automation";

export interface Faq {
  q: string;
  a: string;
}

export interface Service {
  slug: string;
  group: ServiceGroup;
  title: string;
  summary: string;
  heroTitle: string;
  heroText: string;
  what: string;
  helps: string[];
  how: { title: string; text: string }[];
  people: string;
  faqs: Faq[];
  related: string[];
  /** Animated flow shown on the page. Performance Marketing pages use a campaign visual instead. */
  flow?: FlowKey;
}

export interface GroupInfo {
  slug: ServiceGroup;
  title: string;
  href: string;
  summary: string;
  intro: string;
  tags: string[];
  faqs: Faq[];
}

export const groups: Record<ServiceGroup, GroupInfo> = {
  "performance-marketing": {
    slug: "performance-marketing",
    title: "Performance Marketing",
    href: "/performance-marketing",
    summary:
      "Reach people who could become customers. Connect campaign strategy, ad testing and conversion tracking so you can understand what your budget is doing.",
    intro:
      "Paid campaigns work best when the offer, the audience, the landing page and the measurement all agree with each other. We look at the whole path from ad to enquiry, so you know which part to improve.",
    tags: ["Google Ads", "Meta Ads", "Lead Generation", "Conversion Tracking", "Retargeting"],
    faqs: [
      {
        q: "Do I need an existing website or ad account?",
        a: "It helps, but it is not required. If you already have accounts, we review them first. If not, we help you set them up under your own ownership.",
      },
      {
        q: "Who owns the ad accounts and the data?",
        a: "You do. Accounts are created in your name or shared with us through standard access, so you can see everything and revoke access at any time.",
      },
      {
        q: "Can you promise a number of leads?",
        a: "No. Results depend on your offer, market, budget and follow-up. We set measurable objectives, track them properly and report honestly on what the data shows.",
      },
      {
        q: "What should I decide before we talk?",
        a: "Only the outcome you care about most, such as more enquiries or clearer reporting. You do not need a technical brief.",
      },
    ],
  },
  "ai-automation": {
    slug: "ai-automation",
    title: "AI Automation",
    href: "/ai-automation",
    summary:
      "Give repetitive work a defined process. Connect enquiries, messages and business tools so routine tasks move forward and your team can handle the decisions.",
    intro:
      "Automation should remove repeated steps, not remove people. We map where enquiries arrive, where details live and who decides what, then connect the routine parts and keep a person in charge of the rest.",
    tags: ["AI Assistants", "WhatsApp", "CRM Workflows", "Appointment Booking", "Process Automation"],
    faqs: [
      {
        q: "Will automation replace my team?",
        a: "No. It handles routine, repeatable steps such as capturing details or sending approved follow-ups. Your team keeps sales conversations, unusual requests and decisions that need judgement.",
      },
      {
        q: "Can it work with the tools I already use?",
        a: "Often, yes. We first assess where your enquiries arrive and where customer details live, then tell you what can connect and what needs to change before proposing anything.",
      },
      {
        q: "What happens when the assistant is unsure?",
        a: "It hands the conversation to a person with the context attached, rather than guessing. You decide which topics always go to your team.",
      },
      {
        q: "Are the demos on this site live?",
        a: "No. They are illustrative, use fictional data and are not connected to any live platform, message service, CRM or calendar.",
      },
    ],
  },
};

export const services: Service[] = [
  // ---------------- Performance Marketing ----------------
  {
    slug: "google-ads",
    group: "performance-marketing",
    title: "Google Ads",
    summary: "Reach people who are already searching for what you offer.",
    heroTitle: "Google Ads built around the enquiries you want",
    heroText:
      "Show up when people search for your service, then send them to a page that makes the next step clear.",
    what: "Search and display campaigns on Google, planned around your offer, your location and the action you want people to take.",
    helps: [
      "Reaching people who are actively searching for your service",
      "Keeping spend focused with clear keywords, locations and exclusions",
      "Matching each ad to a landing page with one clear action",
      "Reviewing search terms regularly so budget is not wasted",
    ],
    how: [
      { title: "Understand the offer", text: "We agree who you want to reach, where, and what a good enquiry looks like." },
      { title: "Structure the account", text: "Campaigns, keywords and locations are organised around your services." },
      { title: "Launch and test ads", text: "Ads and landing pages are tested against each other with clear tracking." },
      { title: "Review and adjust", text: "We review search terms and results on a regular rhythm and explain what changed." },
    ],
    people: "You approve the budget, the offer and any claims used in ads. We recommend changes and explain them in plain language.",
    faqs: [
      { q: "How much should I spend?", a: "It depends on your market and goals. We help you choose a starting budget you are comfortable testing with, then adjust from evidence." },
      { q: "Do you run search and display?", a: "We plan the campaign types that fit your goal. Search is often the starting point because it reaches people who are already looking." },
      { q: "Can you work with my existing account?", a: "Yes. We review what is there first and tell you what to keep, fix or rebuild." },
      { q: "How will I see results?", a: "Through reporting tied to the actions you care about, such as enquiries, calls or bookings, not just clicks." },
    ],
    related: ["conversion-tracking-analytics", "lead-generation", "retargeting"],
  },
  {
    slug: "meta-ads",
    group: "performance-marketing",
    title: "Meta Ads",
    summary: "Introduce your business to the right people on Facebook and Instagram.",
    heroTitle: "Meta Ads that start useful conversations",
    heroText:
      "Reach people on Facebook and Instagram with clear creative and an offer that makes it easy to get in touch.",
    what: "Paid campaigns on Meta platforms, built around audience, creative and a simple route from interest to enquiry.",
    helps: [
      "Introducing your business to people who may not be searching yet",
      "Testing different creative and messages to learn what resonates",
      "Collecting enquiries through forms or messaging",
      "Keeping audiences and exclusions tidy as campaigns grow",
    ],
    how: [
      { title: "Choose the audience", text: "We agree who the campaign is for and what would make them respond." },
      { title: "Shape the creative", text: "Messages and visuals are planned in small sets that are easy to compare." },
      { title: "Capture the enquiry", text: "A form, landing page or message route is set up with the right details captured." },
      { title: "Learn and refine", text: "We review which creative and audiences lead to useful enquiries and adjust." },
    ],
    people: "You approve creative and claims before anything goes live. People on your team handle the conversations that follow.",
    faqs: [
      { q: "Do I need professional creative?", a: "Not always. Clear, honest creative often works well. We help you decide what to produce first." },
      { q: "Can enquiries go to WhatsApp?", a: "Campaigns can be set up to start conversations on messaging where it fits. Our WhatsApp automation can help handle what follows." },
      { q: "How quickly will I know if it works?", a: "Early signals appear fairly quickly, but we avoid judging too soon. We agree a testing window and what we will look at." },
      { q: "Do you handle audience privacy?", a: "We follow platform policies and applicable rules, and we only ask for the customer information needed for the campaign." },
    ],
    related: ["lead-generation", "retargeting", "whatsapp-automation"],
  },
  {
    slug: "lead-generation",
    group: "performance-marketing",
    title: "Lead Generation",
    summary: "Turn campaign interest into enquiries your team can act on.",
    heroTitle: "Lead generation with a clear next step",
    heroText:
      "Review the offer, the campaign and the qualification journey together, so enquiries arrive with the context your team needs.",
    what: "A connected approach to attracting, capturing and qualifying enquiries, from the first click to the handover to a person.",
    helps: [
      "Clarifying the offer so the right people respond",
      "Capturing the details your team needs to assess an enquiry",
      "Applying simple qualification rules before a person steps in",
      "Giving every enquiry an owner and a visible next action",
    ],
    how: [
      { title: "Attract relevant interest", text: "Paid campaigns point to a clear offer and a useful destination." },
      { title: "Capture the context", text: "Forms and conversations record the details that matter for assessing fit." },
      { title: "Move it forward", text: "Enquiries are routed, and approved follow-ups are prepared." },
      { title: "Keep people involved", text: "Your team owns sales conversations and decisions that need judgement." },
    ],
    people: "People review qualified enquiries and hold the sales conversation. Rules only prepare and route the work.",
    faqs: [
      { q: "What counts as a qualified lead?", a: "That is defined with you. We turn your own criteria, such as service, location or timeline, into simple rules." },
      { q: "Can I keep my current form or CRM?", a: "Often, yes. We assess how enquiries arrive today and what can connect before suggesting changes." },
      { q: "How do you reduce low-quality enquiries?", a: "By tightening the offer and targeting, asking the right questions up front and reviewing what the data shows." },
      { q: "Does this include follow-up?", a: "It can, through CRM and lead management automation, with a person reviewing important steps." },
    ],
    related: ["crm-lead-management", "google-ads", "conversion-tracking-analytics"],
  },
  {
    slug: "conversion-tracking-analytics",
    group: "performance-marketing",
    title: "Conversion Tracking and Analytics",
    summary: "Understand which actions you measure and where the gaps are.",
    heroTitle: "Clearer ad reporting you can trust",
    heroText:
      "Set up the tracking that shows what your budget is doing, and find the gaps between a click and a real enquiry.",
    what: "Measurement setup and reporting that connects ad platforms, your website and your enquiry process.",
    helps: [
      "Tracking the actions that matter, such as forms, calls and messages",
      "Finding where enquiries are lost between the ad and your team",
      "Comparing campaigns on the same, agreed measures",
      "Giving you reporting that is easy to read and easy to question",
    ],
    how: [
      { title: "Audit what exists", text: "We check which actions are tracked today and whether they fire correctly." },
      { title: "Agree the measures", text: "We decide which actions count as success for your business." },
      { title: "Set up tracking", text: "Events and conversions are configured and tested across platforms." },
      { title: "Report in plain language", text: "You get a simple view of results, caveats and suggested next steps." },
    ],
    people: "You decide what success means. We explain what the numbers can and cannot tell you.",
    faqs: [
      { q: "Do I need special software?", a: "Usually the standard analytics and ad platform tools are enough. We tell you if anything else is worth adding." },
      { q: "Can you track phone calls and messages?", a: "Often, depending on your setup. We check what is possible before promising anything." },
      { q: "Why do platforms show different numbers?", a: "They measure differently. We help you pick a primary source of truth and understand the differences." },
      { q: "Will you change my website?", a: "Only with your agreement, and only as needed to measure the actions you care about." },
    ],
    related: ["google-ads", "meta-ads", "lead-generation"],
  },
  {
    slug: "retargeting",
    group: "performance-marketing",
    title: "Retargeting",
    summary: "Stay in front of people who have already shown interest.",
    heroTitle: "Retargeting that respects the visitor",
    heroText:
      "Follow up with people who visited or engaged, with relevant reminders instead of repeated generic ads.",
    what: "Campaigns aimed at people who have already interacted with your website or content, planned with sensible limits.",
    helps: [
      "Reminding interested visitors about the next step",
      "Showing different messages to different stages of interest",
      "Limiting how often the same person sees an ad",
      "Excluding people who have already enquired or bought",
    ],
    how: [
      { title: "Define the audiences", text: "We group visitors by what they did, such as viewed a service or started a form." },
      { title: "Match the message", text: "Each group sees a message that fits where they are." },
      { title: "Set sensible limits", text: "Frequency caps and exclusions keep campaigns useful and respectful." },
      { title: "Review the effect", text: "We look at whether retargeting adds enquiries, not just impressions." },
    ],
    people: "You approve audiences and messages. We make sure consent and platform rules are respected.",
    faqs: [
      { q: "Is retargeting right for every business?", a: "Not always. It works best when you already have steady website visits. We tell you honestly if it is too early." },
      { q: "Does it need cookie consent?", a: "Tracking and consent rules vary by region. We set it up in line with applicable rules and your consent tools." },
      { q: "How long do audiences last?", a: "We choose windows that fit your buying cycle, and refresh them as you learn." },
      { q: "Will people feel followed?", a: "Frequency limits and varied messages help avoid that. Respectful retargeting is part of the plan." },
    ],
    related: ["meta-ads", "google-ads", "conversion-tracking-analytics"],
  },

  // ---------------- AI Automation ----------------
  {
    slug: "whatsapp-automation",
    group: "ai-automation",
    title: "WhatsApp Automation",
    summary: "Answer, qualify and route WhatsApp enquiries without losing the personal touch.",
    heroTitle: "WhatsApp conversations that stay connected",
    heroText:
      "See how an approved message and a CRM update can keep the next person informed, with your team in charge of the real conversation.",
    what: "Approved message flows on WhatsApp that reply to common questions, ask qualifying questions and record the details in your CRM.",
    helps: [
      "Replying quickly to common questions at any hour",
      "Collecting the details your team needs before they step in",
      "Keeping chats and customer records in sync",
      "Handing over to a person for anything that needs judgement",
    ],
    how: [
      { title: "Map your conversations", text: "We list the questions customers ask and the details you need from them." },
      { title: "Write approved replies", text: "Messages are drafted in your voice and approved by you." },
      { title: "Connect the record", text: "Captured details flow into your CRM or sheet." },
      { title: "Set handover rules", text: "You decide which topics always go straight to a person." },
    ],
    people: "People take over sales conversations, unusual requests and sensitive topics. Automation prepares and records.",
    faqs: [
      { q: "Do I need the WhatsApp Business API?", a: "Automated flows generally need an approved business setup. We explain the options and what they involve for your situation." },
      { q: "Can customers still talk to a person?", a: "Yes. Handover to your team is part of the design." },
      { q: "Can messages be sent without consent?", a: "No. We design around platform rules and customer consent, and use approved templates where required." },
      { q: "Does the demo send real messages?", a: "No. It is an illustration with fictional data." },
    ],
    related: ["ai-agents", "crm-lead-management", "appointment-booking"],
    flow: "whatsapp",
  },
  {
    slug: "ai-agents",
    group: "ai-automation",
    title: "AI Agents and Assistants",
    summary: "Assistants that answer from your own approved information.",
    heroTitle: "AI assistants that know when to hand over",
    heroText:
      "Give customers quick, consistent answers from information you have approved, and pass anything unusual to your team.",
    what: "Assistants for your website or messaging channels that understand a request, look up approved answers and reply, with clear handover rules.",
    helps: [
      "Answering repeat questions consistently",
      "Replying outside working hours",
      "Capturing the context before your team joins",
      "Keeping sensitive or unusual requests with a person",
    ],
    how: [
      { title: "Gather your knowledge", text: "We collect the answers, policies and wording you want the assistant to use." },
      { title: "Define boundaries", text: "You decide what it may answer and what must go to a person." },
      { title: "Test with real questions", text: "We try common and awkward questions before launch." },
      { title: "Review and improve", text: "Conversations are reviewed so answers get better over time." },
    ],
    people: "You approve the knowledge it uses. Sensitive requests and decisions go to your team with the conversation attached.",
    faqs: [
      { q: "Can it make things up?", a: "We limit it to approved information and set it to hand over when unsure. No system is perfect, so we also review conversations." },
      { q: "Where can it run?", a: "On your website or messaging channels, depending on your setup." },
      { q: "Can it book or change things?", a: "Only where we connect it to a tool and you have agreed the rules. Important actions can require a person's approval." },
      { q: "What about customer data?", a: "We collect only what is needed, and we explain how it is stored and who can see it." },
    ],
    related: ["whatsapp-automation", "ai-voice-agents", "crm-lead-management"],
    flow: "ai-agents",
  },
  {
    slug: "ai-voice-agents",
    group: "ai-automation",
    title: "AI Voice Agents",
    summary: "Answer calls, capture details and pass the right ones to your team.",
    heroTitle: "Voice agents for calls that would be missed",
    heroText:
      "Answer the call, capture what the caller needs and leave a clear note for the person who calls back.",
    what: "A voice assistant that answers calls within agreed limits, records the key details and updates your CRM.",
    helps: [
      "Answering calls when your team is busy or away",
      "Capturing name, need and preferred callback time",
      "Leaving short summaries instead of unclear voicemails",
      "Routing urgent or complex calls to a person",
    ],
    how: [
      { title: "Define the call types", text: "We list the calls you get and what you need from each." },
      { title: "Script and test", text: "Greetings and questions are written, approved and tested." },
      { title: "Connect the notes", text: "Summaries are saved to your CRM or sent to the right person." },
      { title: "Set escalation rules", text: "You decide when a call is passed straight to a person." },
    ],
    people: "People return calls, handle sensitive topics and make decisions. The voice agent answers and records.",
    faqs: [
      { q: "Do callers know it is automated?", a: "We recommend being open about it at the start of the call and following applicable rules." },
      { q: "Can it handle accents and noise?", a: "Performance varies. We test with realistic calls and keep a clear route to a person." },
      { q: "Are calls recorded?", a: "Only if you choose to, and with the notices and consent that your region requires." },
      { q: "Is the demo a real call?", a: "No. It is an illustration with fictional data." },
    ],
    related: ["ai-agents", "crm-lead-management", "appointment-booking"],
    flow: "voice",
  },
  {
    slug: "crm-lead-management",
    group: "ai-automation",
    title: "CRM and Lead Management",
    summary: "Give leads an owner and a visible next action.",
    heroTitle: "Every enquiry with a clear next step",
    heroText:
      "Capture each enquiry with context, apply your qualification rules and make sure someone owns what happens next.",
    what: "Workflows in your CRM that record leads, score them with your rules, assign owners and schedule follow-ups.",
    helps: [
      "Keeping every lead in one place with its source",
      "Applying consistent qualification rules",
      "Assigning an owner and a next action automatically",
      "Reminding the team before follow-ups slip",
    ],
    how: [
      { title: "Map the journey", text: "We follow an enquiry from the first click to a sales conversation." },
      { title: "Agree the rules", text: "Your criteria become simple scoring and routing rules." },
      { title: "Build the workflow", text: "Statuses, owners, reminders and approved follow-ups are set up." },
      { title: "Review together", text: "We check what works and adjust the rules as you learn." },
    ],
    people: "Your team owns the sales conversation, unusual requests and decisions that need judgement.",
    faqs: [
      { q: "Which CRM do you work with?", a: "It depends on what you use. We check what can connect and tell you plainly if a change is worth making." },
      { q: "Can I change the rules later?", a: "Yes. Rules are written so you can understand and adjust them." },
      { q: "Do you send automatic follow-ups?", a: "Only approved ones, where appropriate, with exceptions going to a person." },
      { q: "Can ad leads flow in automatically?", a: "Often, yes, from forms and lead ads, depending on your tools." },
    ],
    related: ["lead-generation", "whatsapp-automation", "business-process-automation"],
    flow: "crm",
  },
  {
    slug: "appointment-booking",
    group: "ai-automation",
    title: "Appointment Booking",
    summary: "Make the step from request to confirmed time clearer.",
    heroTitle: "A clearer booking step",
    heroText:
      "Explore a journey from an appointment request to a confirmation and reminder, with exceptions going to a person.",
    what: "A booking workflow that checks availability, offers slots, confirms and reminds, within rules you set.",
    helps: [
      "Offering only times you are actually free",
      "Confirming quickly so people do not drift away",
      "Reducing no-shows with timely reminders",
      "Passing clashes and special requests to a person",
    ],
    how: [
      { title: "Set the rules", text: "Working hours, durations, buffers and limits are agreed with you." },
      { title: "Connect the calendar", text: "Availability is read from the calendar you already use." },
      { title: "Confirm and remind", text: "Approved confirmation and reminder messages are prepared." },
      { title: "Handle exceptions", text: "Anything unusual goes to a person with the details." },
    ],
    people: "People handle exceptions, special requests and changes that need judgement.",
    faqs: [
      { q: "Which calendars can it use?", a: "Common calendar tools are often supported. We check yours before proposing a setup." },
      { q: "Can people reschedule?", a: "Yes, within the rules you set, with a person handling anything outside them." },
      { q: "Does the demo book anything?", a: "No. The sample calendar is an illustration and makes no booking." },
      { q: "Can it take payments?", a: "Payments are outside this demo. We can discuss options separately." },
    ],
    related: ["whatsapp-automation", "crm-lead-management", "ai-voice-agents"],
    flow: "appointment",
  },
  {
    slug: "email-workflow-automation",
    group: "ai-automation",
    title: "Email and Workflow Automation",
    summary: "Sort, draft and log routine email with a person approving.",
    heroTitle: "Routine email, handled with care",
    heroText:
      "Sort incoming email, prepare draft replies from approved wording and log everything, while a person approves what is sent.",
    what: "Workflows that classify incoming email, prepare drafts, route work to the right person and keep a record.",
    helps: [
      "Sorting email by type so it reaches the right person",
      "Preparing drafts for common questions",
      "Logging conversations against customer records",
      "Reducing copy-and-paste between inbox and tools",
    ],
    how: [
      { title: "Review your inbox", text: "We look at the kinds of email you receive and the replies you give." },
      { title: "Define categories", text: "Simple categories decide where each email goes." },
      { title: "Prepare drafts", text: "Approved wording becomes reply drafts a person can edit." },
      { title: "Log and track", text: "Sent replies and decisions are recorded in your tools." },
    ],
    people: "A person approves what is sent. Automation sorts, drafts and logs.",
    faqs: [
      { q: "Will it send emails by itself?", a: "Only where you choose, for low-risk messages. By default a person approves." },
      { q: "Does it work with shared inboxes?", a: "Often, yes, depending on your email provider and tools." },
      { q: "Can it read attachments?", a: "In some cases. We assess what you receive and what is practical." },
      { q: "Who can see the emails?", a: "Only the people and systems you authorise. We explain access clearly before setup." },
    ],
    related: ["business-process-automation", "crm-lead-management", "ai-agents"],
    flow: "email",
  },
  {
    slug: "business-process-automation",
    group: "ai-automation",
    title: "Business Process Automation",
    summary: "Identify a repeatable process that is worth automating.",
    heroTitle: "Less manual work, with people in control",
    heroText:
      "Put a practical process around recurring work so fewer tasks depend on someone remembering every step.",
    what: "Workflows that connect your tools, apply rules and notify the right people, with approval gates where they matter.",
    helps: [
      "Removing repeated copy-and-paste between tools",
      "Making handovers visible and consistent",
      "Notifying the right person at the right time",
      "Adding approval steps for anything important",
    ],
    how: [
      { title: "Pick one process", text: "We start with a single repeatable process that is clearly worth improving." },
      { title: "Map every step", text: "We write down triggers, rules, tools and who decides." },
      { title: "Automate the routine", text: "Routine steps are connected, with approval gates for important ones." },
      { title: "Measure and extend", text: "We check how it works in practice before adding more." },
    ],
    people: "People approve important steps and handle exceptions. Automation moves the routine work along.",
    faqs: [
      { q: "How do I know what to automate first?", a: "Look for steps that repeat often, follow clear rules and cause delays. We help you list and rank them." },
      { q: "What if the process changes?", a: "Workflows are documented so they can be updated without starting again." },
      { q: "Is the before and after comparison real?", a: "It is an illustration of how steps can reduce. Your own results depend on your process." },
      { q: "Do you need access to everything?", a: "No. We ask only for the access needed for the process we are improving." },
    ],
    related: ["email-workflow-automation", "crm-lead-management", "ai-agents"],
    flow: "process",
  },
];

export function getService(slug: string): Service {
  const service = services.find((s) => s.slug === slug);
  if (!service) throw new Error(`Unknown service: ${slug}`);
  return service;
}

export function servicesByGroup(group: ServiceGroup): Service[] {
  return services.filter((s) => s.group === group);
}

export function servicePath(service: Pick<Service, "group" | "slug">): string {
  return `/${service.group}/${service.slug}`;
}
