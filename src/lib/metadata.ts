import type { Metadata } from "next";
import { site } from "@/data/site";

interface BuildMetadataInput {
  title: string;
  description: string;
  path?: string;
  /** Use the title as-is, without the " | Visby Labs" suffix. */
  absoluteTitle?: boolean;
}

export function buildMetadata({
  title,
  description,
  path = "/",
  absoluteTitle = false,
}: BuildMetadataInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: site.name,
      type: "website",
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}
