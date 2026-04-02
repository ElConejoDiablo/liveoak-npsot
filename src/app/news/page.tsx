import { ArticleCard } from "@/components/cards/article-card";
import { NewsBrowser } from "@/components/news/news-browser";
import { PageHero } from "@/components/sections/page-hero";
import { SectionShell } from "@/components/sections/section-shell";
import { MotionReveal } from "@/components/shared/motion-reveal";
import { siteConfig } from "@/data/site";
import { getAllCategories, getAllTags, getPostSummaries } from "@/lib/blog";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Articles",
  description:
    "Read chapter updates, field notes, and practical native-plant articles for Fayette, Colorado, and Lavaca Counties.",
  path: "/news",
  eyebrow: "Articles",
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
        eyebrow="Articles"
        title="Local articles, chapter updates, and practical guidance that reward a return visit"
        description="Regional reading for beginners, gardeners, volunteers, and anyone paying closer attention to native plants in Fayette, Colorado, and Lavaca Counties."
        serviceArea={siteConfig.serviceAreaLabel}
        variant="monarch"
        visualTitle="Seasonal notes, field guides, and chapter stories"
        visualNote="Use the articles section to revisit practical guidance between events and seasons."
        actions={[
          { href: "/events", label: "See chapter events" },
          { href: "/contact", label: "Share a question", variant: "secondary" },
        ]}
      />

      <SectionShell
        eyebrow="Featured article"
        title="Featured reading from the chapter"
        intro="Start here for seasonal guidance, chapter updates, and practical native-plant reading rooted in the Live Oak Chapter region."
      >
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.72fr)]">
          <MotionReveal>
            <ArticleCard post={featuredPost} variant="featured" />
          </MotionReveal>
          <MotionReveal
            delay={0.05}
            className="rounded-[1.7rem] border border-primary/10 bg-[#F5F0E1] p-6 shadow-[0_18px_60px_rgba(39,59,42,0.08)]"
          >
            <h2 className="font-heading text-2xl text-foreground">
              Browse the archive below
            </h2>
            <p className="mt-3 text-base leading-7 text-foreground/72">
              The full article browser below is the best place to narrow by topic,
              category, or keyword without wading through decorative tag clouds.
            </p>
            <p className="mt-5 text-sm leading-7 text-foreground/64">
              {categories.length} categories and {tags.length} recurring topics
              are available in the filters.
            </p>
          </MotionReveal>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Recent reading"
        title="Chapter updates and practical field notes"
        intro="Browse by topic, narrow the list by tag, or search across article titles and local themes."
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
