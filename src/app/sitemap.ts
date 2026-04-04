import type { MetadataRoute } from "next";

import { getPostSummaries } from "@/lib/blog";
import { siteConfig } from "@/data/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPostSummaries();
  const staticRoutes = [
    "",
    "/about",
    "/events",
    "/news",
    "/programs",
    "/resources",
    "/resources/plants",
    "/resources/npsot",
    "/resources/sourcing-native-plants",
    "/volunteer",
    "/leadership",
    "/contact",
    "/documents",
  ];

  const lastModified = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteConfig.siteUrl}${route}`,
      lastModified,
    })),
    ...posts.map((post) => ({
      url: `${siteConfig.siteUrl}/news/${post.slug}`,
      lastModified: new Date(post.date),
    })),
  ];
}
