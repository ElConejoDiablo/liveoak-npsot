import { ArrowRight, Hash, Newspaper } from "lucide-react";

import { ArticleCard } from "@/components/cards/article-card";
import { NewsBrowser } from "@/components/news/news-browser";
import { PageHero } from "@/components/sections/page-hero";
import { SectionShell } from "@/components/sections/section-shell";
import { SmartLink } from "@/components/shared/smart-link";
import { MotionReveal } from "@/components/shared/motion-reveal";
import { siteConfig } from "@/data/site";
import { getAllCategories, getAllTags, getPostSummaries } from "@/lib/blog";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "News and Blog",
  description:
    "Read chapter updates, field notes, and practical native-plant articles for Fayette, Colorado, and Lavaca Counties.",
  path: "/news",
  eyebrow: "News and Blog",
});

export default async function NewsPage() {
  const [posts, tags, categories] = await Promise.all([
    getPostSummaries(),
    getAllTags(),
    getAllCategories(),
  ]);
  const featuredPost = posts.find((post) => post.featured) ?? posts[0];
  const remainingPosts = posts.filter((post) => post.slug !== featuredPost.slug);

  return (
    <>
      <PageHero
        eyebrow="News and blog"
        title="Local articles, chapter updates, and practical guidance that reward a return visit"
        description="The Live Oak Chapter blog is meant to be useful: regional reading for beginners, gardeners, volunteers, and anyone paying closer attention to native plants in Fayette, Colorado, and Lavaca Counties."
        serviceArea={siteConfig.serviceAreaLabel}
        variant="monarch"
        actions={[
          { href: "/events", label: "See chapter events" },
          { href: "/contact", label: "Share a question", variant: "secondary" },
        ]}
      />

      <SectionShell
        eyebrow="Featured article"
        title="A stronger editorial front door for the chapter"
        intro="The featured story gives visitors an easy place to start, while the rest of the index keeps seasonal guidance, educational posts, and chapter updates easy to scan."
      >
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <MotionReveal>
            <ArticleCard post={featuredPost} variant="featured" />
          </MotionReveal>
          <div className="grid gap-4">
            <MotionReveal className="rounded-[1.7rem] border border-primary/10 bg-white/78 p-6 shadow-[0_18px_60px_rgba(39,59,42,0.08)]">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/8 text-primary">
                  <Newspaper className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="font-heading text-2xl text-foreground">
                    Browse by category
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-foreground/68">
                    Quick entry points for local reading.
                  </p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                {categories.map((category) => (
                  <span
                    key={category}
                    className="rounded-full border border-primary/10 bg-[#F7F4E8] px-4 py-2 text-sm font-medium text-foreground/76"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </MotionReveal>

            <MotionReveal
              delay={0.05}
              className="rounded-[1.7rem] border border-primary/10 bg-[#F5F0E1] p-6 shadow-[0_18px_60px_rgba(39,59,42,0.08)]"
            >
              <h2 className="font-heading text-2xl text-foreground">
                Popular tags
              </h2>
              <div className="mt-5 flex flex-wrap gap-3">
                {tags.map((tag) => (
                  <div
                    key={tag}
                    className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white/75 px-4 py-2 text-sm font-medium text-foreground/76"
                  >
                    <Hash className="h-4 w-4 text-primary/75" />
                    <span>{tag}</span>
                  </div>
                ))}
              </div>
              <SmartLink
                href="/events"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
              >
                <span>Pair articles with upcoming events</span>
                <ArrowRight className="h-4 w-4" />
              </SmartLink>
            </MotionReveal>
          </div>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Recent reading"
        title="Chapter updates and practical field notes"
        intro="Use the filters to browse by topic, narrow the list by tag, or search across article titles and local themes."
      >
        <NewsBrowser
          posts={remainingPosts}
          categories={categories}
          tags={tags}
        />
      </SectionShell>
    </>
  );
}
