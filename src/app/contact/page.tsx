import { Mail, MapPin, Newspaper, Send } from "lucide-react";

import { buttonVariants } from "@/components/ui/button-styles";
import { Input } from "@/components/ui/input";
import { PageHero } from "@/components/sections/page-hero";
import { SectionShell } from "@/components/sections/section-shell";
import { Container } from "@/components/shared/container";
import { MotionReveal } from "@/components/shared/motion-reveal";
import { SmartLink } from "@/components/shared/smart-link";
import { SocialLinks } from "@/components/shared/social-links";
import { siteConfig } from "@/data/site";
import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata = createMetadata({
  title: "Contact and Subscribe",
  description:
    "Contact the Live Oak Chapter, connect on social media, and use the current newsletter signup placeholder flow.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact and subscribe"
        title="A simple, friendly way to reach the chapter and stay in the loop"
        description="The current contact setup keeps things dependable while the chapter's newsletter and long-term communications tools continue to take shape."
        serviceArea={siteConfig.serviceAreaLabel}
        variant="pollinator"
        actions={[
          { href: siteConfig.contactUrl, label: "Email the chapter" },
          { href: siteConfig.newsletterSignupUrl, label: "Request newsletter signup", variant: "secondary" },
        ]}
      />

      <SectionShell
        eyebrow="Get in touch"
        title="Use the chapter inbox for questions, introductions, and collaboration"
        intro="If you want to ask about events, volunteering, membership, or local native plants, the chapter email is the best current starting point."
      >
        <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <MotionReveal className="rounded-[1.8rem] border border-primary/10 bg-white/80 p-6 shadow-[0_18px_60px_rgba(39,59,42,0.08)] sm:p-8">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/8 text-primary">
              <Mail className="h-6 w-6" />
            </div>
            <h2 className="mt-5 font-heading text-3xl text-foreground">
              Chapter email
            </h2>
            <a
              href={siteConfig.contactUrl}
              className="mt-4 inline-block text-xl font-semibold text-primary underline decoration-primary/30 underline-offset-4"
            >
              {siteConfig.contactEmail}
            </a>
            <div className="mt-6 flex items-start gap-3 text-base leading-7 text-foreground/72">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <p>{siteConfig.serviceAreaSentence}</p>
            </div>
            <div className="mt-6">
              <SocialLinks stacked />
            </div>
          </MotionReveal>

          <MotionReveal className="rounded-[1.8rem] border border-primary/10 bg-[#F5F0E1] p-6 shadow-[0_18px_60px_rgba(39,59,42,0.08)] sm:p-8">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/8 text-primary">
              <Newspaper className="h-6 w-6" />
            </div>
            <h2 className="mt-5 font-heading text-3xl text-foreground">
              Newsletter signup placeholder
            </h2>
            <p className="mt-4 text-lg leading-8 text-foreground/74">
              The final mailing platform is not connected yet, but the site is
              already prepared with a clear CTA block. Until the chapter selects
              its long-term tool, use the chapter inbox to request updates.
            </p>
            <label htmlFor="newsletter-email" className="mt-6 block text-sm font-semibold uppercase tracking-[0.18em] text-primary/72">
              Your email address
            </label>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <Input
                id="newsletter-email"
                type="email"
                placeholder="name@example.com"
                disabled
                aria-describedby="newsletter-note"
                className="h-12 rounded-full border-primary/12 bg-white/80 px-4 disabled:opacity-100"
              />
              <SmartLink
                href={siteConfig.newsletterSignupUrl}
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "inline-flex h-12 items-center justify-center rounded-full px-5",
                )}
              >
                <Send className="mr-2 h-4 w-4" />
                Request signup
              </SmartLink>
            </div>
            <p id="newsletter-note" className="mt-3 text-sm leading-7 text-foreground/64">
              Placeholder flow: the input is present for layout and future
              integration, while the button currently opens an email-based signup
              request.
            </p>
          </MotionReveal>
        </div>
      </SectionShell>

      <Container className="pb-20">
        <div className="rounded-[1.9rem] border border-primary/10 bg-[linear-gradient(135deg,rgba(33,55,39,0.96),rgba(57,81,58,0.96))] p-6 text-white shadow-[0_28px_90px_rgba(29,48,35,0.26)] sm:p-8">
          <h2 className="font-heading text-3xl sm:text-4xl">
            Welcoming, grounded, and easy to reach
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-white/78">
            The chapter tone across the site is intentional: practical,
            conservation-minded, and inviting to people who may be new to native
            plants. That same tone should carry through in email and social
            responses as the chapter grows.
          </p>
        </div>
      </Container>
    </>
  );
}
