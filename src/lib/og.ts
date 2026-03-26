import { siteConfig } from "@/data/site";

type OgImageOptions = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
};

export function buildOgImageUrl({
  title,
  subtitle,
  eyebrow,
}: OgImageOptions) {
  const url = new URL("/api/og", siteConfig.siteUrl);
  url.searchParams.set("title", title);

  if (subtitle) {
    url.searchParams.set("subtitle", subtitle);
  }

  if (eyebrow) {
    url.searchParams.set("eyebrow", eyebrow);
  }

  return url.toString();
}
