import fs from "node:fs";
import path from "node:path";
import { cache } from "react";

import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const postsDirectory = path.join(process.cwd(), "src/content/posts");

export type PostCoverImageKey =
  | "newsmonarchid"
  | "newsbluebonnetseed"
  | "newsfrogfruithabitat";

export type CoverTheme =
  | "savanna"
  | "bluebonnet"
  | "pollinator"
  | "monarch"
  | "community";

type PostFrontmatter = {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  counties?: string[];
  coverTheme: CoverTheme;
  coverImage?: PostCoverImageKey;
  coverNote?: string;
  featured?: boolean;
  sample?: boolean;
};

export type BlogPostSummary = PostFrontmatter & {
  slug: string;
  readingTime: number;
};

export type BlogPost = BlogPostSummary & {
  contentHtml: string;
};

function getReadingTime(markdown: string) {
  const words = markdown.trim().split(/\s+/).length;
  return Math.max(3, Math.round(words / 220));
}

async function markdownToHtml(markdown: string) {
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(markdown);

  return processed.toString();
}

const loadPosts = cache(async () => {
  const filenames = fs
    .readdirSync(postsDirectory)
    .filter((filename) => filename.endsWith(".md"));

  const posts = await Promise.all(
    filenames.map(async (filename) => {
      const slug = filename.replace(/\.md$/, "");
      const filePath = path.join(postsDirectory, filename);
      const source = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(source);
      const frontmatter = data as PostFrontmatter;

      return {
        slug,
        ...frontmatter,
        readingTime: getReadingTime(content),
        contentHtml: await markdownToHtml(content),
      } satisfies BlogPost;
    }),
  );

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
});

export async function getAllPosts() {
  return loadPosts();
}

export async function getPostSummaries() {
  const posts = await loadPosts();

  return posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    author: post.author,
    category: post.category,
    tags: post.tags,
    counties: post.counties,
    coverTheme: post.coverTheme,
    coverImage: post.coverImage,
    coverNote: post.coverNote,
    featured: post.featured,
    sample: post.sample,
    readingTime: post.readingTime,
  }));
}

export async function getFeaturedPosts(limit = 3) {
  const posts = await getPostSummaries();
  const featured = posts.filter((post) => post.featured);

  return (featured.length ? featured : posts).slice(0, limit);
}

export async function getPostBySlug(slug: string) {
  const posts = await loadPosts();
  return posts.find((post) => post.slug === slug);
}

export async function getLatestPosts(limit = 4) {
  const posts = await getPostSummaries();
  return posts.slice(0, limit);
}

export async function getLatestPost() {
  const posts = await getPostSummaries();
  return posts[0];
}

export async function getAllTags() {
  const posts = await getPostSummaries();
  return Array.from(new Set(posts.flatMap((post) => post.tags))).sort();
}

export async function getAllCategories() {
  const posts = await getPostSummaries();
  return Array.from(new Set(posts.map((post) => post.category))).sort();
}

export async function getRelatedPosts(
  slug: string,
  category: string,
  tags: string[],
  counties: string[],
  limit = 3,
) {
  const posts = await getPostSummaries();

  return posts
    .filter((post) => post.slug !== slug)
    .map((post) => {
      const sharedTags = post.tags.filter((tag) => tags.includes(tag)).length;
      const sharedCounties = (post.counties ?? []).filter((county) =>
        counties.includes(county),
      ).length;
      const score =
        (post.category === category ? 4 : 0) + sharedTags * 2 + sharedCounties;

      return { ...post, score };
    })
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return a.date < b.date ? 1 : -1;
    })
    .slice(0, limit);
}
