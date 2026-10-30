import { ServicePage, serviceMetadata } from "@/components/sections/ServicePageTemplate";

export const metadata = serviceMetadata("lead-generation");

export default function Page() {
  return <ServicePage slug="lead-generation" />;
}
