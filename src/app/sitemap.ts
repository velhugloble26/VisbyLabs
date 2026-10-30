import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { groups, servicePath, services } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "/",
    "/services",
    groups["performance-marketing"].href,
    groups["ai-automation"].href,
    "/our-work",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
  ];
  const paths = [...staticPaths, ...services.map(servicePath)];
  return paths.map((path) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
