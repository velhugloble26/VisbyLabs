import { site } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";
import { AudienceGrid } from "@/components/sections/AudienceGrid";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { DemoShowcase } from "@/components/sections/DemoShowcase";
import { Hero } from "@/components/sections/Hero";
import { ImproveFirst } from "@/components/sections/ImproveFirst";
import { JourneySteps } from "@/components/sections/JourneySteps";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { ToolsSection } from "@/components/sections/ToolsSection";
import { TwoServices } from "@/components/sections/TwoServices";

export const metadata = buildMetadata({
  title: site.title,
  description: site.description,
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <TwoServices />
      <ProblemSection />
      <JourneySteps />
      <DemoShowcase />
      <AudienceGrid />
      <ImproveFirst />
      <ToolsSection />
      <CtaBanner />
    </>
  );
}
