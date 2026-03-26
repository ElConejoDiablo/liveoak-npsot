import { CheckCircle2, Handshake } from "lucide-react";

import { confirmTransactionAction, selectCounterpartAction } from "@/lib/members/actions";
import { buttonVariants } from "@/components/ui/button-styles";
import { cn } from "@/lib/utils";

type TransactionPanelProps = {
  postId: string;
  isOwner: boolean;
  canConfirm: boolean;
  counterpartId?: string | null;
  ownerConfirmed: boolean;
  counterpartConfirmed: boolean;
  replyAuthors: {
    id: string;
    name: string | null;
    pointsTotal: number;
  }[];
  counterpartName?: string | null;
  completed: boolean;
};

export function TransactionPanel({
  postId,
  isOwner,
  canConfirm,
  counterpartId,
  ownerConfirmed,
  counterpartConfirmed,
  replyAuthors,
  counterpartName,
  completed,
}: TransactionPanelProps) {
  return (
    <div className="rounded-[1.6rem] border border-primary/10 bg-[#F5F0E1] p-5 shadow-[0_18px_60px_rgba(39,59,42,0.08)]">
      <div className="flex items-center gap-3">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/8 text-primary">
          <Handshake className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-heading text-2xl text-foreground">
            Success confirmation
          </h2>
          <p className="mt-1 text-sm leading-6 text-foreground/68">
            A completed swap or helpful exchange awards 1 point to each party once both people confirm it went well.
          </p>
        </div>
      </div>

      {isOwner && replyAuthors.length ? (
        <form action={selectCounterpartAction} className="mt-5 space-y-3">
          <input type="hidden" name="postId" value={postId} />
          <label className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/72">
            Choose the other member involved
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <select
              name="counterpartId"
              defaultValue={counterpartId ?? ""}
              className="h-11 w-full rounded-full border border-primary/12 bg-white/82 px-4 text-base text-foreground outline-none transition focus:border-primary/30 focus:ring-4 focus:ring-primary/10"
            >
              <option value="" disabled>
                Select a replying member
              </option>
              {replyAuthors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name ?? "Chapter member"} ({author.pointsTotal} pts)
                </option>
              ))}
            </select>
            <button
              type="submit"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 rounded-full border-primary/15 bg-white/80 px-5",
              )}
            >
              Save counterpart
            </button>
          </div>
        </form>
      ) : null}

      {counterpartId ? (
        <div className="mt-5 rounded-[1.3rem] border border-primary/10 bg-white/80 p-4">
          <p className="text-sm text-foreground/70">
            Interaction paired with{" "}
            <span className="font-semibold text-foreground">
              {counterpartName ?? "selected member"}
            </span>
            .
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.1rem] border border-primary/10 bg-[#F7F4E8] px-4 py-3 text-sm">
              <span className="font-semibold text-foreground">Post owner:</span>{" "}
              {ownerConfirmed ? "Confirmed" : "Waiting"}
            </div>
            <div className="rounded-[1.1rem] border border-primary/10 bg-[#F7F4E8] px-4 py-3 text-sm">
              <span className="font-semibold text-foreground">Counterpart:</span>{" "}
              {counterpartConfirmed ? "Confirmed" : "Waiting"}
            </div>
          </div>
          {completed ? (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              <CheckCircle2 className="h-4 w-4" />
              Points awarded to both members
            </div>
          ) : canConfirm ? (
            <form action={confirmTransactionAction} className="mt-4">
              <input type="hidden" name="postId" value={postId} />
              <button
                type="submit"
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "h-11 rounded-full px-5",
                )}
              >
                Confirm this interaction
              </button>
            </form>
          ) : null}
        </div>
      ) : (
        <p className="mt-5 text-sm leading-6 text-foreground/68">
          Once the post owner chooses the other participating member, both sides can confirm the result here.
        </p>
      )}
    </div>
  );
}
