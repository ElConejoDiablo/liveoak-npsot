import { Hash } from "lucide-react";

import { ArticleCard } from "@/components/cards/article-card";
import { PageHero } from "@/components/sections/page-hero";
import { SectionShell } from "@/components/sections/section-shell";
import { MotionReveal } from "@/components/shared/motion-reveal";
import { siteConfig } from "@/data/site";
import { getAllTags, getPostSummaries } from "@/lib/blog";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "News and Blog",
  description:
    "Read launch-ready blog articles and chapter updates for the Live Oak Chapter of the Native Plant Society of Texas.",
  path: "/news",
});

export default async function NewsPage() {
  const [posts, tags] = await Promise.all([getPostSummaries(), getAllTags()]);

  return (
    <>
      <PageHero
        eyebrow="News and blog"
        title="Articles that support chapter education, field observation, and practical native-plant use"
        description="The site's article system is intentionally lightweight: local markdown files, centralized metadata, and a layout that works well now while staying easy to expand later."
        serviceArea={siteConfig.serviceAreaLabel}
        variant="monarch"
        actions={[
          { href: "/events", label: "See chapter events" },
          { href: "/resources", label: "Browse resources", variant: "secondary" },
        ]}
      />

      <SectionShell
        eyebrow="Browse topics"
        title="Categories, tags, and article cards are built into the content model"
        intro="That means the chapter can keep adding posts without changing how the site browses, previews, or shares them."
      >
        <div className="flex flex-wrap gap-3">
          {tags.map((tag, index) => (
            <MotionReveal key={tag} delay={index * 0.03}>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white/75 px-4 py-2 text-sm font-medium text-foreground/76 shadow-[0_12px_40px_rgba(39,59,42,0.06)]">
                <Hash className="h-4 w-4 text-primary/75" />
                <span>{tag}</span>
              </div>
            </MotionReveal>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="All posts"
        title="Launch-ready starter articles"
        intro="These seeded posts give the chapter a credible editorial foundation from day one and can be replaced, expanded, or revised as local content grows."
      >
        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {posts.map((post, index) => (
            <MotionReveal key={post.slug} delay={index * 0.04}>
              <ArticleCard post={post} />
            </MotionReveal>
          ))}
        </div>
      </SectionShell>
    </>
  );
}
