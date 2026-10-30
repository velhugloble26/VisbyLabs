import { ServicePage, serviceMetadata } from "@/components/sections/ServicePageTemplate";

export const metadata = serviceMetadata("google-ads");

export default function Page() {
  return <ServicePage slug="google-ads" />;
}
