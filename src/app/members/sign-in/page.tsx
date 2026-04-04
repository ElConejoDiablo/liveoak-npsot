import { ShieldCheck } from "lucide-react";
import type { Route } from "next";
import { redirect } from "next/navigation";

import { MemberSignInForm } from "@/components/members/member-signin-form";
import { SmartLink } from "@/components/shared/smart-link";
import { Container } from "@/components/shared/container";
import { buttonVariants } from "@/components/ui/button-styles";
import { auth, isMembersPortalConfigured } from "@/lib/auth";
import { createMetadata } from "@/lib/metadata";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export const metadata = createMetadata({
  title: "Member Sign In",
  description:
    "Request a secure sign-in link for the Live Oak Chapter members portal.",
  path: "/members/sign-in",
  eyebrow: "Members",
});

export const dynamic = "force-dynamic";

export default async function MemberSignInPage() {
  const membersPortalConfigured = isMembersPortalConfigured();
  const session = await auth();
  const isProductionDeployment = process.env.NODE_ENV === "production";

  if (session?.user?.email) {
    redirect("/members" as Route);
  }

  return (
    <Container className="py-14 sm:py-20">
      <div className="mx-auto max-w-2xl rounded-[2rem] border border-primary/10 bg-white/82 p-8 shadow-[0_24px_80px_rgba(39,59,42,0.08)] sm:p-10">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/8 text-primary">
          <ShieldCheck className="h-7 w-7" />
        </div>
        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.22em] text-primary/72">
          Members Portal
        </p>
        <h1 className="mt-3 font-heading text-4xl text-foreground sm:text-5xl">
          Sign in to the Members Portal
        </h1>
        <p className="mt-4 text-lg leading-8 text-foreground/72">
          Use the email address connected with your chapter access to request a
          magic link. If you are a current member and need help signing in, the
          chapter can help you get settled.
        </p>
        <div className="mt-8">
          <MemberSignInForm />
        </div>
        <div className="mt-8 rounded-[1.4rem] border border-primary/10 bg-[#F7F4E8] p-5 text-sm leading-7 text-foreground/70">
          Member access covers the protected documents area, member exchange board,
          and other chapter-only resources. If you need help with access, contact
          the chapter officers directly.
        </div>
        <div className="mt-5 rounded-[1.4rem] border border-primary/10 bg-[#F5F0E1] p-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/72">
            Not a member yet?
          </p>
          <h2 className="mt-2 font-heading text-2xl text-foreground">
            Join NPSOT and connect with the Live Oak Chapter
          </h2>
          <p className="mt-3 text-sm leading-7 text-foreground/72">
            Membership comes through NPSOT. If you are new to the chapter, join
            first, then contact the chapter so your member email can be connected
            with portal access.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <SmartLink
              href={siteConfig.joinUrl}
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "h-11 rounded-full px-5",
              )}
            >
              Join NPSOT
            </SmartLink>
            <SmartLink
              href={siteConfig.contactUrl}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-11 rounded-full border-primary/15 bg-white/85 px-5",
              )}
            >
              Contact the chapter
            </SmartLink>
          </div>
        </div>
        {!membersPortalConfigured ? (
          <div className="mt-5 rounded-[1.4rem] border border-amber-300/40 bg-amber-50 p-5 text-sm leading-7 text-amber-950">
            {isProductionDeployment ? (
              "This deployment is not yet configured for live member sign-in. Add the required members portal environment variables in the deployment settings to enable access."
            ) : (
              <>
                This local environment is missing the auth/database configuration
                needed to send live magic links. Add the members portal variables
                from
                <code className="mx-1 rounded bg-white/70 px-1.5 py-0.5 text-xs">
                  .env.example
                </code>
                to enable full member sign-in locally.
              </>
            )}
          </div>
        ) : null}
      </div>
    </Container>
  );
}
