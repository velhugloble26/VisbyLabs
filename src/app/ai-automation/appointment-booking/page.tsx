import { ServicePage, serviceMetadata } from "@/components/sections/ServicePageTemplate";

export const metadata = serviceMetadata("appointment-booking");

export default function Page() {
  return <ServicePage slug="appointment-booking" />;
}
