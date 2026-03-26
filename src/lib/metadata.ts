import type { Metadata } from "next";

import { siteConfig } from "@/data/site";

type MetadataOptions = {
  title?: string;
  description: string;
  path?: string;
  type?: "website" | "article";
  publishedTime?: string;
  tags?: string[];
};

export function createMetadata({
  title,
  description,
  path = "/",
  type = "website",
  publishedTime,
  tags = [],
}: MetadataOptions): Metadata {
  const metadataTitle = title
    ? `${title} | ${siteConfig.shortName}`
    : siteConfig.chapterName;
  const canonicalUrl = new URL(path, siteConfig.siteUrl).toString();

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
          url: `${siteConfig.siteUrl}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: siteConfig.chapterName,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: metadataTitle,
      description,
      images: [`${siteConfig.siteUrl}/opengraph-image`],
    },
  };
}

