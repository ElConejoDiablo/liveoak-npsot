import { notFound } from "next/navigation";

import { ExchangeReplyForm } from "@/components/members/exchange-reply-form";
import { TransactionPanel } from "@/components/members/transaction-panel";
import { createMetadata } from "@/lib/metadata";
import { requireMemberContext } from "@/lib/auth";
import {
  exchangeCategoryLabels,
  exchangeStatusLabels,
  getDistinctReplyAuthors,
  getExchangePostById,
  type ExchangePostRecord,
} from "@/lib/members/exchange";

type ExchangePostPageProps = {
  params: Promise<{
    postId: string;
  }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: ExchangePostPageProps) {
  const { postId } = await params;
  const post = await getExchangePostById(postId);

  if (!post) {
    return createMetadata({
      title: "Member post not found",
      description: "The requested member exchange post could not be found.",
      path: `/members/exchange/${postId}`,
      eyebrow: "Members",
    });
  }

  return createMetadata({
    title: post.title,
    description: post.description,
    path: `/members/exchange/${post.id}`,
    eyebrow: "Members",
  });
}

function canCurrentMemberConfirm(post: ExchangePostRecord, userId: string) {
  if (!post.transaction?.counterpartId || post.transaction.pointsAwardedAt) {
    return false;
  }

  const isOwner = userId === post.authorId && !post.transaction.ownerConfirmedAt;
  const isCounterpart =
    userId === post.transaction.counterpartId &&
    !post.transaction.counterpartConfirmedAt;

  return isOwner || isCounterpart;
}

export default async function ExchangePostDetailPage({
  params,
}: ExchangePostPageProps) {
  const { user } = await requireMemberContext();
  const { postId } = await params;
  const post = await getExchangePostById(postId);

  if (!post) {
    notFound();
  }

  const replyAuthors = getDistinctReplyAuthors(post);
  const canConfirm = canCurrentMemberConfirm(post, user.id);

  return (
    <div className="space-y-8">
      <section className="rounded-[1.9rem] border border-primary/10 bg-white/82 p-6 shadow-[0_18px_60px_rgba(39,59,42,0.08)] sm:p-8">
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
        <h1 className="mt-4 font-heading text-3xl text-foreground sm:text-4xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg leading-8 text-foreground/72">
          {post.description}
        </p>
        <div className="mt-5 grid gap-4 text-sm leading-7 text-foreground/68 sm:grid-cols-2">
          <p>
            <span className="font-semibold text-foreground">Posted by:</span>{" "}
            {post.author.name ?? "Chapter member"}
          </p>
          <p>
            <span className="font-semibold text-foreground">Member points:</span>{" "}
            {post.author.pointsTotal}
          </p>
          {post.availabilityNotes ? (
            <p>
              <span className="font-semibold text-foreground">Availability:</span>{" "}
              {post.availabilityNotes}
            </p>
          ) : null}
          {post.swapPreference ? (
            <p>
              <span className="font-semibold text-foreground">Swap preference:</span>{" "}
              {post.swapPreference}
            </p>
          ) : null}
        </div>
      </section>

      {post.images.length ? (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {post.images.map((image) => (
            <div
              key={image.id}
              className="overflow-hidden rounded-[1.6rem] border border-primary/10 bg-white/82 shadow-[0_18px_60px_rgba(39,59,42,0.08)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.blobUrl}
                alt={post.title}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          ))}
        </section>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.68fr)_minmax(320px,0.32fr)]">
        <section className="space-y-5">
          <div className="rounded-[1.8rem] border border-primary/10 bg-white/82 p-6 shadow-[0_18px_60px_rgba(39,59,42,0.08)]">
            <h2 className="font-heading text-2xl text-foreground">Replies and comments</h2>
            {post.replies.length ? (
              <div className="mt-5 space-y-4">
                {post.replies.map((reply) => (
                  <article
                    key={reply.id}
                    className="rounded-[1.4rem] border border-primary/10 bg-[#F7F4E8] p-4"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="text-sm font-semibold text-foreground">
                        {reply.author.name ?? "Chapter member"}
                      </p>
                      <p className="text-xs uppercase tracking-[0.16em] text-primary/72">
                        {reply.author.pointsTotal} pts
                      </p>
                    </div>
                    <p className="mt-3 text-base leading-7 text-foreground/72">
                      {reply.body}
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <p className="mt-5 text-sm leading-7 text-foreground/68">
                No replies yet. A short reply is enough to start the exchange.
              </p>
            )}
          </div>

          <div className="rounded-[1.8rem] border border-primary/10 bg-white/82 p-6 shadow-[0_18px_60px_rgba(39,59,42,0.08)]">
            <ExchangeReplyForm postId={post.id} />
          </div>
        </section>

        <aside className="space-y-5">
          <TransactionPanel
            postId={post.id}
            isOwner={user.id === post.authorId}
            canConfirm={canConfirm}
            counterpartId={post.transaction?.counterpartId}
            counterpartName={post.transaction?.counterpart?.name}
            ownerConfirmed={Boolean(post.transaction?.ownerConfirmedAt)}
            counterpartConfirmed={Boolean(post.transaction?.counterpartConfirmedAt)}
            replyAuthors={replyAuthors.map((author) => ({
              id: author.id,
              name: author.name,
              pointsTotal: author.pointsTotal,
            }))}
            completed={Boolean(post.transaction?.pointsAwardedAt)}
          />
        </aside>
      </div>
    </div>
  );
}
