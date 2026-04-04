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
    "Read field notes, local stories, and native-plant articles from the Live Oak Chapter.",
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
        title="Field Notes, Local Stories, and Native-Plant Articles"
        description="Seasonal reading for beginners, gardeners, volunteers, and anyone paying closer attention to native plants in Fayette, Colorado, and Lavaca Counties."
        serviceArea={siteConfig.serviceAreaLabel}
        variant="fieldnotes"
        layout="banner"
        actions={[
          { href: "/events", label: "View events" },
          { href: "/contact", label: "Share a question", variant: "secondary" },
        ]}
      />

      <SectionShell
        eyebrow="Featured Article"
        title="Start With the Current Feature"
        intro="Begin with the lead story, then browse the rest of the archive by topic, season, or question."
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
              Browse by topic below
            </h2>
            <p className="mt-3 text-base leading-7 text-foreground/72">
              Use the article browser below to narrow the list by topic,
              category, or keyword.
            </p>
            <p className="mt-5 text-sm leading-7 text-foreground/64">
              Browse {categories.length} categories and {tags.length} recurring
              topics in the filters.
            </p>
          </MotionReveal>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Recent Reading"
        title="Recent Articles and Field Notes"
        intro="Browse by topic, filter by tag, or search article titles and local themes."
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
