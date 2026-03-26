"use client";

import { Mail } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

import { buttonVariants } from "@/components/ui/button-styles";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function MemberSignInForm() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(
    searchParams.get("error")
      ? "We could not complete that sign-in. If your email is eligible for member access, request a fresh sign-in link."
      : null,
  );

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      await signIn("email", {
        email,
        callbackUrl: "/members",
        redirect: false,
      });

      setMessage(
        "If your email can be used for member access, a secure sign-in link will arrive shortly.",
      );
    } catch {
      setMessage(
        "If your email can be used for member access, a secure sign-in link will arrive shortly.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="member-email"
          className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/72"
        >
          Email address
        </label>
        <div className="mt-3 relative">
          <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/70" />
          <Input
            id="member-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="h-12 rounded-full border-primary/12 bg-white/86 pl-11 pr-4"
          />
        </div>
      </div>
      <button
        type="submit"
        aria-disabled={isSubmitting}
        disabled={isSubmitting}
        className={cn(
          buttonVariants({ variant: "default", size: "lg" }),
          "h-12 rounded-full px-5",
        )}
      >
        {isSubmitting ? "Sending link..." : "Send secure sign-in link"}
      </button>
      {message ? (
        <p className="rounded-[1.3rem] border border-primary/10 bg-[#F7F4E8] px-4 py-3 text-sm leading-7 text-foreground/74">
          {message}
        </p>
      ) : null}
    </form>
  );
}
