import { CategoryPage, categoryMetadata } from "@/components/sections/CategoryPage";

export const metadata = categoryMetadata("performance-marketing");

export default function PerformanceMarketingPage() {
  return <CategoryPage group="performance-marketing" />;
}
