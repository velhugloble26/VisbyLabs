import { ServicePage, serviceMetadata } from "@/components/sections/ServicePageTemplate";

export const metadata = serviceMetadata("ai-agents");

export default function Page() {
  return <ServicePage slug="ai-agents" />;
}
