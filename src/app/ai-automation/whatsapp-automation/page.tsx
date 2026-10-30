import { ServicePage, serviceMetadata } from "@/components/sections/ServicePageTemplate";

export const metadata = serviceMetadata("whatsapp-automation");

export default function Page() {
  return <ServicePage slug="whatsapp-automation" />;
}
