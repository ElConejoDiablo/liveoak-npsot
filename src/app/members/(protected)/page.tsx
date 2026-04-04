import { FileText, Handshake, Shield } from "lucide-react";

import { EmptyStatePanel } from "@/components/shared/empty-state-panel";
import { SmartLink } from "@/components/shared/smart-link";
import { buttonVariants } from "@/components/ui/button-styles";
import { memberDocuments } from "@/data/member-documents";
import { requireMemberContext } from "@/lib/auth";
import { getExchangePosts } from "@/lib/members/exchange";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function MembersHomePage() {
  const { allowlistedMember, user } = await requireMemberContext();
  const posts = await getExchangePosts();
  const openPosts = posts.filter((post) => post.status === "open").slice(0, 3);
  const recentDocuments = memberDocuments.slice(0, 3);

  return (
    <div className="space-y-8">
      <section className="grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(300px,0.7fr)]">
        <div className="rounded-[1.9rem] border border-primary/10 bg-white/82 p-6 shadow-[0_18px_60px_rgba(39,59,42,0.08)] sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary/72">
            Welcome back
          </p>
          <h2 className="mt-3 font-heading text-3xl text-foreground sm:text-4xl">
            Hello, {allowlistedMember.name}
          </h2>
          <p className="mt-4 text-lg leading-8 text-foreground/72">
            This member area keeps internal chapter documents, practical exchange posts,
            and member-to-member help in one protected place.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.4rem] border border-primary/10 bg-[#F7F4E8] p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/72">
                Member role
              </p>
              <p className="mt-2 text-lg font-semibold capitalize text-foreground">
                {user.role}
              </p>
            </div>
            <div className="rounded-[1.4rem] border border-primary/10 bg-[#F7F4E8] p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/72">
                Points earned
              </p>
              <p className="mt-2 text-lg font-semibold text-foreground">
                {user.pointsTotal}
              </p>
            </div>
            <div className="rounded-[1.4rem] border border-primary/10 bg-[#F7F4E8] p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/72">
                Open board posts
              </p>
              <p className="mt-2 text-lg font-semibold text-foreground">
                {posts.filter((post) => post.status === "open").length}
              </p>
            </div>
          </div>
          <div className="mt-6">
            <SmartLink
              href="/members/plant-images"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 rounded-full border-primary/15 bg-white/80 px-5",
              )}
            >
              Manage plant images
            </SmartLink>
          </div>
        </div>

        <div className="rounded-[1.9rem] border border-primary/10 bg-[#F5F0E1] p-6 shadow-[0_18px_60px_rgba(39,59,42,0.08)] sm:p-8">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/8 text-primary">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <h2 className="font-heading text-2xl text-foreground">
                Member-only notice
              </h2>
              <p className="mt-1 text-sm leading-6 text-foreground/68">
                Internal materials and exchange posts stay inside authenticated member access.
              </p>
            </div>
          </div>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-foreground/72">
            <li>Use the exchange board for seeds, plants, tools, giveaways, and practical help.</li>
            <li>Only the people involved in an interaction can confirm a successful handoff or completed help.</li>
            <li>Points are awarded only when both sides confirm the interaction.</li>
          </ul>
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-[1.8rem] border border-primary/10 bg-white/82 p-6 shadow-[0_18px_60px_rgba(39,59,42,0.08)]">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-primary" />
              <h2 className="font-heading text-2xl text-foreground">
                Quick links to documents
              </h2>
            </div>
            <SmartLink href="/members/documents" className="text-sm font-semibold text-primary">
              View all
            </SmartLink>
          </div>
          <div className="mt-5 space-y-3">
            {recentDocuments.map((document) => (
              <div
                key={document.id}
                className="rounded-[1.3rem] border border-primary/10 bg-[#F7F4E8] px-4 py-4"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/72">
                  {document.fileLabel}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-foreground">
                  {document.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-foreground/68">
                  {document.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[1.8rem] border border-primary/10 bg-white/82 p-6 shadow-[0_18px_60px_rgba(39,59,42,0.08)]">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Handshake className="h-5 w-5 text-primary" />
              <h2 className="font-heading text-2xl text-foreground">
                Exchange and help board
              </h2>
            </div>
            <SmartLink href="/members/exchange" className="text-sm font-semibold text-primary">
              Open board
            </SmartLink>
          </div>
          {openPosts.length ? (
            <div className="mt-5 space-y-3">
              {openPosts.map((post) => (
                <div
                  key={post.id}
                  className="rounded-[1.3rem] border border-primary/10 bg-[#F7F4E8] px-4 py-4"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/72">
                    {post.category.replaceAll("_", " ")}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-foreground">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-foreground/68">
                    {post.description}
                  </p>
                  <SmartLink
                    href={`/members/exchange/${post.id}`}
                    className="mt-3 inline-flex text-sm font-semibold text-primary"
                  >
                    View member post
                  </SmartLink>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-5">
              <EmptyStatePanel
                title="No Open Member Posts Yet"
                description="Create the first exchange or help post when a member has seeds, plants, tools, or local help to offer."
                action={{ href: "/members/exchange/new", label: "Create a member post" }}
              />
            </div>
          )}
        </div>
      </section>

      <section className="rounded-[1.8rem] border border-primary/10 bg-[#F5F0E1] p-6 shadow-[0_18px_60px_rgba(39,59,42,0.08)]">
        <h2 className="font-heading text-2xl text-foreground">
          Clear Next Steps
        </h2>
        <div className="mt-5 flex flex-wrap gap-3">
          <SmartLink
            href="/members/exchange/new"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "h-11 rounded-full px-5",
            )}
          >
            Create a member post
          </SmartLink>
          <SmartLink
            href="/members/documents"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 rounded-full border-primary/15 bg-white/80 px-5",
            )}
          >
            Browse documents
          </SmartLink>
        </div>
      </section>
    </div>
  );
}
