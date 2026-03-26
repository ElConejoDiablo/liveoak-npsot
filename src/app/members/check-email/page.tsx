import { MailCheck } from "lucide-react";

import { Container } from "@/components/shared/container";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Check Your Email",
  description:
    "Check your email for a secure sign-in link to the Live Oak Chapter members portal.",
  path: "/members/check-email",
  eyebrow: "Members",
});

export default function CheckEmailPage() {
  return (
    <Container className="py-14 sm:py-20">
      <div className="mx-auto max-w-2xl rounded-[2rem] border border-primary/10 bg-white/82 p-8 text-center shadow-[0_24px_80px_rgba(39,59,42,0.08)] sm:p-10">
        <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/8 text-primary">
          <MailCheck className="h-7 w-7" />
        </div>
        <h1 className="mt-6 font-heading text-4xl text-foreground sm:text-5xl">
          Check your email
        </h1>
        <p className="mt-4 text-lg leading-8 text-foreground/72">
          If your email can be used for member access, a secure sign-in link
          should arrive shortly.
        </p>
      </div>
    </Container>
  );
}
