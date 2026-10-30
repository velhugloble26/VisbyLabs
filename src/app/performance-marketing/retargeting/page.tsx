import { ServicePage, serviceMetadata } from "@/components/sections/ServicePageTemplate";

export const metadata = serviceMetadata("retargeting");

export default function Page() {
  return <ServicePage slug="retargeting" />;
}
