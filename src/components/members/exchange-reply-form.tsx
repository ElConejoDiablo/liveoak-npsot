"use client";

import { useActionState } from "react";

import { createExchangeReplyAction, type MemberActionState } from "@/lib/members/actions";
import { buttonVariants } from "@/components/ui/button-styles";
import { cn } from "@/lib/utils";

const initialState: MemberActionState = { status: "idle" };

export function ExchangeReplyForm({ postId }: { postId: string }) {
  const [state, formAction, isPending] = useActionState(
    createExchangeReplyAction,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="postId" value={postId} />
      <label className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/72">
        Add a reply
      </label>
      <textarea
        name="body"
        required
        rows={4}
        className="w-full rounded-[1.4rem] border border-primary/12 bg-white/82 px-4 py-3 text-base leading-7 text-foreground outline-none transition focus:border-primary/30 focus:ring-4 focus:ring-primary/10"
        placeholder="Let the member know what you have available, what you need, or how you can help."
      />
      {state.status === "error" && state.message ? (
        <p className="rounded-[1.3rem] border border-amber-300/40 bg-amber-50 px-4 py-3 text-sm leading-7 text-amber-900">
          {state.message}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={isPending}
        className={cn(
          buttonVariants({ variant: "default", size: "lg" }),
          "h-11 rounded-full px-5",
        )}
      >
        {isPending ? "Posting..." : "Post reply"}
      </button>
    </form>
  );
}
