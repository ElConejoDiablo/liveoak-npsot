"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import type { BlogPostSummary } from "@/lib/blog";
import { ArticleCard } from "@/components/cards/article-card";
import { Input } from "@/components/ui/input";

type NewsBrowserProps = {
  posts: BlogPostSummary[];
  categories: string[];
  tags: string[];
};

export function NewsBrowser({
  posts,
  categories,
  tags,
}: NewsBrowserProps) {
  const [category, setCategory] = useState("All categories");
  const [tag, setTag] = useState("All tags");
  const [query, setQuery] = useState("");

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesCategory =
        category === "All categories" || post.category === category;
      const matchesTag = tag === "All tags" || post.tags.includes(tag);
      const haystack = [
        post.title,
        post.excerpt,
        post.category,
        ...(post.tags ?? []),
        ...(post.counties ?? []),
      ]
        .join(" ")
        .toLowerCase();
      const matchesQuery =
        normalizedQuery.length === 0 || haystack.includes(normalizedQuery);

      return matchesCategory && matchesTag && matchesQuery;
    });
  }, [category, posts, query, tag]);

  return (
    <div className="space-y-6">
      <div className="rounded-[1.8rem] border border-primary/10 bg-[#F5F0E1] p-5 shadow-[0_18px_60px_rgba(39,59,42,0.08)] sm:p-6">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary/72">
          <SlidersHorizontal className="h-4 w-4" />
          Filter articles
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_repeat(2,minmax(180px,0.4fr))]">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-foreground/74">
              Search articles
            </span>
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/45" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search titles, counties, and topics"
                className="h-12 rounded-full border-primary/12 bg-white pl-11"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-foreground/74">
              Category
            </span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="h-12 w-full rounded-full border border-primary/12 bg-white px-4 text-sm text-foreground shadow-sm"
            >
              <option>All categories</option>
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-foreground/74">
              Tag
            </span>
            <select
              value={tag}
              onChange={(event) => setTag(event.target.value)}
              className="h-12 w-full rounded-full border border-primary/12 bg-white px-4 text-sm text-foreground shadow-sm"
            >
              <option>All tags</option>
              {tags.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>
        <p className="mt-4 text-sm leading-7 text-foreground/66">
          Showing {filteredPosts.length} article{filteredPosts.length === 1 ? "" : "s"}.
        </p>
      </div>

      {filteredPosts.length ? (
        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {filteredPosts.map((post) => (
            <ArticleCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="rounded-[1.8rem] border border-dashed border-primary/20 bg-[#F7F4E8] p-6">
          <h3 className="font-heading text-2xl text-foreground">
            No articles match that search
          </h3>
          <p className="mt-3 text-base leading-7 text-foreground/72">
            Try a broader keyword or reset the category and tag filters to see
            more chapter articles.
          </p>
        </div>
      )}
    </div>
  );
}
