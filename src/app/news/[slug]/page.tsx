import { Clock3, Tag } from "lucide-react";
import { notFound } from "next/navigation";

import { ArticleCard } from "@/components/cards/article-card";
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
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.slug, post.category);

  return (
    <>
      <Container className="py-10 sm:py-14">
        <SmartLink
          href="/news"
          className="text-sm font-semibold text-primary underline decoration-primary/30 underline-offset-4"
        >
          Back to news
        </SmartLink>

        <div className="mt-6 max-w-4xl">
          <div className="text-sm font-semibold uppercase tracking-[0.24em] text-primary/74">
            {post.category}
          </div>
          <h1 className="mt-4 font-heading text-4xl leading-tight text-foreground sm:text-5xl lg:text-[4rem]">
            {post.title}
          </h1>
          <p className="mt-5 text-xl leading-9 text-foreground/74">
            {post.excerpt}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-foreground/62">
            <span>{formatFullDate(post.date)}</span>
            <span className="h-1 w-1 rounded-full bg-foreground/24" />
            <span>{post.author}</span>
            <span className="h-1 w-1 rounded-full bg-foreground/24" />
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-4 w-4 text-primary/75" />
              {post.readingTime} min read
            </span>
          </div>
          {post.sample ? (
            <p className="mt-5 rounded-[1.2rem] border border-dashed border-primary/18 bg-[#F7F4E8] px-4 py-3 text-sm leading-7 text-foreground/72">
              This article is intentionally marked as sample chapter copy so it
              can be updated with final event details later.
            </p>
          ) : null}
        </div>

        <ArticleCover
          title={post.title}
          category={post.category}
          variant={post.coverTheme}
          className="mt-8"
        />

        <article className="mx-auto mt-10 max-w-3xl">
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
      </Container>

      {relatedPosts.length ? (
        <section className="pb-20">
          <Container>
            <div className="mb-8 max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary/74">
                Continue reading
              </p>
              <h2 className="mt-3 font-heading text-3xl text-foreground sm:text-4xl">
                More from the chapter blog
              </h2>
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              {relatedPosts.map((related) => (
                <ArticleCard key={related.slug} post={related} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
