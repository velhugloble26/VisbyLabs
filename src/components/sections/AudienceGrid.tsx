import { Card } from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/ui/Section";

const audiences = [
  { title: "Startups", text: "Give your first campaigns a defined objective and your first enquiries a repeatable follow-up process." },
  { title: "Small and medium businesses", text: "Connect the tools and everyday tasks that are becoming difficult to manage manually." },
  { title: "Growing brands", text: "Examine campaign performance alongside the customer experience that follows the click." },
  { title: "Entrepreneurs", text: "Put a practical process around recurring work so fewer tasks depend on you remembering every step." },
];

export function AudienceGrid() {
  return (
    <Section labelledBy="audience-title">
      <SectionHeading id="audience-title" title="For businesses building a more organised way to grow" />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {audiences.map((a) => (
          <Card key={a.title}>
            <h3 className="text-lg font-semibold">{a.title}</h3>
            <p className="mt-2 text-sm text-muted">{a.text}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
