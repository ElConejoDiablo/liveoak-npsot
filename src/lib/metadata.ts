import type { Metadata } from "next";

import { siteConfig } from "@/data/site";
import { buildOgImageUrl } from "@/lib/og";

type MetadataOptions = {
  title?: string;
  description: string;
  path?: string;
  type?: "website" | "article";
  publishedTime?: string;
  tags?: string[];
  eyebrow?: string;
};

export function createMetadata({
  title,
  description,
  path = "/",
  type = "website",
  publishedTime,
  tags = [],
  eyebrow,
}: MetadataOptions): Metadata {
  const metadataTitle = title
    ? `${title} | ${siteConfig.shortName}`
    : siteConfig.chapterName;
  const canonicalUrl = new URL(path, siteConfig.siteUrl).toString();
  const ogImageUrl = buildOgImageUrl({
    title: title ?? "Native plants for Fayette, Colorado, and Lavaca Counties",
    subtitle: description,
    eyebrow: eyebrow ?? siteConfig.shortName,
  });

  return {
    title: metadataTitle,
    description,
    keywords: Array.from(new Set([...siteConfig.keywords, ...tags])),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type,
      title: metadataTitle,
      description,
      url: canonicalUrl,
      siteName: siteConfig.chapterName,
      locale: "en_US",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title ?? siteConfig.chapterName,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: metadataTitle,
      description,
      images: [ogImageUrl],
    },
  };
}
