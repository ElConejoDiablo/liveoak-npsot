import { ExchangeCategory, ExchangePostStatus } from "@prisma/client";
import { PlusCircle } from "lucide-react";

import { EmptyStatePanel } from "@/components/shared/empty-state-panel";
import { SmartLink } from "@/components/shared/smart-link";
import { buttonVariants } from "@/components/ui/button-styles";
import {
  exchangeCategoryLabels,
  exchangeStatusLabels,
  getExchangeImageUrl,
  getExchangePosts,
} from "@/lib/members/exchange";
import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata = createMetadata({
  title: "Member Exchange",
  description:
    "Protected member exchange board for seeds, plants, tools, and practical help.",
  path: "/members/exchange",
  eyebrow: "Members",
});

export const dynamic = "force-dynamic";

type ExchangePageProps = {
  searchParams?: Promise<{
    category?: string;
    status?: string;
  }>;
};

function isCategory(value?: string): value is ExchangeCategory {
  return !!value && Object.values(ExchangeCategory).includes(value as ExchangeCategory);
}

function isStatus(value?: string): value is ExchangePostStatus {
  return !!value && Object.values(ExchangePostStatus).includes(value as ExchangePostStatus);
}

export default async function MemberExchangePage({ searchParams }: ExchangePageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const category = isCategory(resolvedSearchParams.category)
    ? resolvedSearchParams.category
    : undefined;
  const status = isStatus(resolvedSearchParams.status)
    ? resolvedSearchParams.status
    : undefined;
  const posts = await getExchangePosts({ category, status });

  return (
    <div className="space-y-8">
      <section className="rounded-[1.8rem] border border-primary/10 bg-white/82 p-6 shadow-[0_18px_60px_rgba(39,59,42,0.08)] sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary/72">
              Member exchange
            </p>
            <h1 className="mt-3 font-heading text-3xl text-foreground sm:text-4xl">
              Seeds, plants, tools, giveaways, and practical help
            </h1>
            <p className="mt-4 text-lg leading-8 text-foreground/72">
              This board is for straightforward member coordination. Keep posts practical,
              local, and easy to follow through on.
            </p>
          </div>
          <SmartLink
            href="/members/exchange/new"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "h-11 rounded-full px-5",
            )}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Create a member post
          </SmartLink>
        </div>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <form className="rounded-[1.4rem] border border-primary/10 bg-[#F7F4E8] p-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-foreground">
                <span className="block text-xs uppercase tracking-[0.18em] text-primary/72">
                  Category
                </span>
                <select
                  name="category"
                  defaultValue={category ?? ""}
                  className="mt-2 h-11 w-full rounded-full border border-primary/12 bg-white/82 px-4 text-sm outline-none transition focus:border-primary/30 focus:ring-4 focus:ring-primary/10"
                >
                  <option value="">All categories</option>
                  {Object.entries(exchangeCategoryLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm font-semibold text-foreground">
                <span className="block text-xs uppercase tracking-[0.18em] text-primary/72">
                  Status
                </span>
                <select
                  name="status"
                  defaultValue={status ?? ""}
                  className="mt-2 h-11 w-full rounded-full border border-primary/12 bg-white/82 px-4 text-sm outline-none transition focus:border-primary/30 focus:ring-4 focus:ring-primary/10"
                >
                  <option value="">All statuses</option>
                  {Object.entries(exchangeStatusLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <button
              type="submit"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "mt-4 h-11 rounded-full border-primary/15 bg-white/80 px-5",
              )}
            >
              Apply filters
            </button>
          </form>
          <div className="rounded-[1.4rem] border border-primary/10 bg-[#F7F4E8] p-4 text-sm leading-7 text-foreground/70">
            Posts stay member-only. Use clear titles, mention the county when helpful,
            and follow through with a reply before marking an interaction successful.
          </div>
        </div>
      </section>

      {posts.length ? (
        <div className="grid gap-5 lg:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.id}
              className="overflow-hidden rounded-[1.8rem] border border-primary/10 bg-white/82 shadow-[0_18px_60px_rgba(39,59,42,0.08)]"
            >
              {post.images[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={getExchangeImageUrl(post.images[0].id)}
                  alt={post.title}
                  className="aspect-[16/9] w-full object-cover"
                />
              ) : null}
              <div className="p-5 sm:p-6">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-primary/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary/78">
                    {exchangeCategoryLabels[post.category]}
                  </span>
                  <span className="rounded-full bg-[#F5F0E1] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-foreground/70">
                    {exchangeStatusLabels[post.status]}
                  </span>
                  {post.county ? (
                    <span className="rounded-full border border-primary/10 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-foreground/70">
                      {post.county}
                    </span>
                  ) : null}
                </div>
                <h2 className="mt-4 font-heading text-2xl text-foreground">
                  {post.title}
                </h2>
                <p className="mt-3 text-base leading-7 text-foreground/72">
                  {post.description}
                </p>
                <div className="mt-4 text-sm leading-6 text-foreground/64">
                  Posted by {post.author.name ?? "Chapter member"} · {post.replies.length} replies
                </div>
                <SmartLink
                  href={`/members/exchange/${post.id}`}
                  className="mt-5 inline-flex text-sm font-semibold text-primary"
                >
                  View post and replies
                </SmartLink>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <EmptyStatePanel
          title="No Member Posts Match These Filters"
          description="Try another category or status, or create a new member post for seeds, plants, tools, giveaways, or practical help."
          action={{ href: "/members/exchange/new", label: "Create a member post" }}
        />
      )}
    </div>
  );
}
