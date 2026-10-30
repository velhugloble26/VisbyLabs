import { Badge } from "@/components/ui/Badge";
import { Section, SectionHeading } from "@/components/ui/Section";

const pains = [
  "Unclear ad performance",
  "Missed follow-ups",
  "Disconnected customer records",
  "Repeated manual work",
];

export function ProblemSection() {
  return (
    <Section labelledBy="problem-title" className="border-y border-line bg-card/30">
      <div className="grid items-start gap-10 lg:grid-cols-2">
        <SectionHeading id="problem-title" title="Where does the next step break down?" />
        <div>
          <p className="text-lg text-muted">
            Someone clicks your ad, sends an enquiry and waits. Their details land in one tool, the conversation
            happens in another, and nobody is sure who should follow up.
          </p>
          <p className="mt-4 text-lg text-muted">
            That is a marketing problem and an operational problem. Understanding the full journey helps you decide
            whether to improve the campaign, the handover or both.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Common problems">
            {pains.map((p) => (
              <li key={p}>
                <Badge tone="amber">{p}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
