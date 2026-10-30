import { ServicePage, serviceMetadata } from "@/components/sections/ServicePageTemplate";

export const metadata = serviceMetadata("meta-ads");

export default function Page() {
  return <ServicePage slug="meta-ads" />;
}
