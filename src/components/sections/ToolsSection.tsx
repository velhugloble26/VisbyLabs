import { Section, SectionHeading } from "@/components/ui/Section";

export function ToolsSection() {
  return (
    <Section labelledBy="tools-title">
      <SectionHeading
        id="tools-title"
        title="Start with the tools your business already uses"
        text="Tell us where your enquiries arrive, where customer details live and how your team works today. We will assess what can connect and what needs to change before proposing a solution."
      />
    </Section>
  );
}
