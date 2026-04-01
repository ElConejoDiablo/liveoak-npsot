import { ArrowRight, CalendarDays, Clock3, Tag, UserRound } from "lucide-react";
import { notFound } from "next/navigation";

import { ArticleCard } from "@/components/cards/article-card";
import { CtaBanner } from "@/components/sections/cta-banner";
import { ArticleCover } from "@/components/shared/article-cover";
import { Container } from "@/components/shared/container";
import { SmartLink } from "@/components/shared/smart-link";
import { siteConfig } from "@/data/site";
import {
  getPostBySlug,
  getPostSummaries,
  getRelatedPosts,
} from "@/lib/blog";
import { formatFullDate } from "@/lib/format";
import { createMetadata } from "@/lib/metadata";

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const posts = await getPostSummaries();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return createMetadata({
      title: "Article not found",
      description: siteConfig.description,
      path: `/news/${slug}`,
    });
  }

  return createMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/news/${post.slug}`,
    type: "article",
    publishedTime: post.date,
    tags: post.tags,
    eyebrow: post.category,
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(
    post.slug,
    post.category,
    post.tags,
    post.counties ?? [],
  );

  return (
    <>
      <Container className="py-10 sm:py-14">
        <SmartLink
          href="/news"
          className="text-sm font-semibold text-primary underline decoration-primary/30 underline-offset-4"
        >
          Back to articles
        </SmartLink>

        <div className="mt-6 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <div className="text-sm font-semibold uppercase tracking-[0.24em] text-primary/74">
              {post.category}
            </div>
            {post.counties?.map((county) => (
              <span
                key={county}
                className="rounded-full border border-primary/10 bg-[#F7F4E8] px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-foreground/72"
              >
                {county}
              </span>
            ))}
          </div>
          <h1 className="mt-4 font-heading text-4xl leading-tight text-foreground sm:text-5xl lg:text-[4rem]">
            {post.title}
          </h1>
          <p className="mt-5 text-xl leading-9 text-foreground/74">
            {post.excerpt}
          </p>
          <div className="mt-7 grid gap-3 rounded-[1.5rem] border border-primary/10 bg-white/70 p-5 text-sm text-foreground/66 sm:grid-cols-3">
            <div className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-primary/75" />
              <span>{formatFullDate(post.date)}</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-primary/75" />
              <span>{post.readingTime} min read</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <UserRound className="h-4 w-4 text-primary/75" />
              <span>{post.author}</span>
            </div>
          </div>
        </div>

        <ArticleCover
          title={post.title}
          category={post.category}
          variant={post.coverTheme}
          counties={post.counties}
          coverNote={post.coverNote}
          className="mt-8"
        />

        <div className="mx-auto mt-10 grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(260px,0.28fr)] lg:items-start">
          <article className="max-w-3xl">
            <div
              className="rich-content"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />

            <div className="mt-10 flex flex-wrap gap-2 border-t border-primary/10 pt-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 rounded-full border border-primary/10 bg-primary/6 px-3 py-1 text-xs font-medium text-foreground/72"
                >
                  <Tag className="h-3.5 w-3.5 text-primary/75" />
                  {tag}
                </span>
              ))}
            </div>
          </article>

          <aside className="space-y-4 lg:sticky lg:top-28">
            <div className="rounded-[1.6rem] border border-primary/10 bg-[#F5F0E1] p-5 shadow-[0_18px_60px_rgba(39,59,42,0.08)]">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary/72">
                Next steps
              </p>
              <h2 className="mt-3 font-heading text-2xl text-foreground">
                Turn reading into local action
              </h2>
              <div className="mt-5 space-y-3">
                <SmartLink
                  href="/events"
                  className="flex items-center justify-between rounded-2xl border border-primary/10 bg-white/80 px-4 py-3 text-sm font-semibold text-foreground transition hover:border-primary/20 hover:bg-white"
                >
                  <span>Attend an event</span>
                  <ArrowRight className="h-4 w-4 text-primary" />
                </SmartLink>
                <SmartLink
                  href={siteConfig.joinUrl}
                  className="flex items-center justify-between rounded-2xl border border-primary/10 bg-white/80 px-4 py-3 text-sm font-semibold text-foreground transition hover:border-primary/20 hover:bg-white"
                >
                  <span>Join NPSOT</span>
                  <ArrowRight className="h-4 w-4 text-primary" />
                </SmartLink>
                <SmartLink
                  href="/contact"
                  className="flex items-center justify-between rounded-2xl border border-primary/10 bg-white/80 px-4 py-3 text-sm font-semibold text-foreground transition hover:border-primary/20 hover:bg-white"
                >
                  <span>Contact the chapter</span>
                  <ArrowRight className="h-4 w-4 text-primary" />
                </SmartLink>
              </div>
            </div>

            {post.counties?.length ? (
              <div className="rounded-[1.6rem] border border-primary/10 bg-white/78 p-5 shadow-[0_18px_60px_rgba(39,59,42,0.08)]">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary/72">
                  Local relevance
                </p>
                <p className="mt-3 text-base leading-7 text-foreground/74">
                  This article is especially useful for readers across{" "}
                  {post.counties.join(", ")} and the broader Live Oak Chapter
                  service area.
                </p>
              </div>
            ) : null}
          </aside>
        </div>
      </Container>

      {relatedPosts.length ? (
        <section className="pb-20">
          <Container>
            <div className="mb-8 max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary/74">
                Continue reading
              </p>
              <h2 className="mt-3 font-heading text-3xl text-foreground sm:text-4xl">
                Related reading from the chapter
              </h2>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <ArticleCard key={related.slug} post={related} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <Container className="pb-20">
        <CtaBanner
          eyebrow="Keep going"
          title="Keep learning with the chapter"
          description="Attend an event, join NPSOT, or reach out to the chapter when you are ready for the next step."
          primaryAction={{ href: "/events", label: "Attend an event" }}
          secondaryAction={{ href: siteConfig.joinUrl, label: "Join NPSOT" }}
          variant="pollinator"
        />
      </Container>
    </>
  );
}
