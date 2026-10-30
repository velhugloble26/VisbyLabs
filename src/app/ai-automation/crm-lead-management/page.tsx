import { ServicePage, serviceMetadata } from "@/components/sections/ServicePageTemplate";

export const metadata = serviceMetadata("crm-lead-management");

export default function Page() {
  return <ServicePage slug="crm-lead-management" />;
}
