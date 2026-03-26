import { ArrowRight, Clock3 } from "lucide-react";

import type { BlogPostSummary } from "@/lib/blog";
import { formatShortDate } from "@/lib/format";

import { ArticleCover } from "@/components/shared/article-cover";
import { SmartLink } from "@/components/shared/smart-link";

type ArticleCardProps = {
  post: BlogPostSummary;
};

export function ArticleCard({ post }: ArticleCardProps) {
  return (
    <article className="overflow-hidden rounded-[1.8rem] border border-primary/10 bg-white/78 shadow-[0_18px_60px_rgba(39,59,42,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_80px_rgba(39,59,42,0.12)]">
      <SmartLink href={`/news/${post.slug}`} className="block">
        <ArticleCover
          title={post.title}
          category={post.category}
          variant={post.coverTheme}
          compact
        />
      </SmartLink>
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-3 text-sm text-foreground/62">
          <span>{formatShortDate(post.date)}</span>
          <span className="h-1 w-1 rounded-full bg-foreground/24" />
          <span className="inline-flex items-center gap-1.5">
            <Clock3 className="h-4 w-4 text-primary/75" />
            {post.readingTime} min read
          </span>
          {post.sample ? (
            <>
              <span className="h-1 w-1 rounded-full bg-foreground/24" />
              <span className="rounded-full bg-[#EBCF87]/35 px-2 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#765724]">
                Sample recap
              </span>
            </>
          ) : null}
        </div>
        <SmartLink
          href={`/news/${post.slug}`}
          className="mt-4 inline-block font-heading text-2xl leading-tight text-foreground hover:text-primary"
        >
          {post.title}
        </SmartLink>
        <p className="mt-3 line-clamp-3 text-base leading-7 text-foreground/74">
          {post.excerpt}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-primary/10 bg-primary/6 px-3 py-1 text-xs font-medium text-foreground/72"
            >
              {tag}
            </span>
          ))}
        </div>
        <SmartLink
          href={`/news/${post.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
        >
          <span>Read article</span>
          <ArrowRight className="h-4 w-4" />
        </SmartLink>
      </div>
    </article>
  );
}

