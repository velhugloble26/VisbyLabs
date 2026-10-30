import { ArrowRight } from "lucide-react";
import { groups, type ServiceGroup } from "@/data/services";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FlowByKey } from "@/components/flows/FlowByKey";
import { CampaignVisual } from "./CampaignVisual";

function ServiceCard({ group }: { group: ServiceGroup }) {
  const info = groups[group];
  return (
    <Card className="flex flex-col">
      <h3 className="text-2xl font-semibold">{info.title}</h3>
      <p className="mt-3 text-muted">{info.summary}</p>
      <div className="my-6">
        {group === "performance-marketing" ? (
          <CampaignVisual compact />
        ) : (
          <FlowByKey id="journey" variant="mini" />
        )}
      </div>
      <ul className="flex flex-wrap gap-2" aria-label={`${info.title} services`}>
        {info.tags.map((tag) => (
          <li key={tag}>
            <Badge>{tag}</Badge>
          </li>
        ))}
      </ul>
      <Button href={info.href} variant="secondary" className="mt-8 self-start">
        Explore {info.title}
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Button>
    </Card>
  );
}

export function TwoServices() {
  return (
    <Section labelledBy="services-title">
      <SectionHeading id="services-title" title="Two services built around how your business grows" />
      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <ServiceCard group="performance-marketing" />
        <ServiceCard group="ai-automation" />
      </div>
    </Section>
  );
}
