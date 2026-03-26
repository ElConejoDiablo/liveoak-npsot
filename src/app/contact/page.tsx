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
    "Contact the Live Oak Chapter, connect on social media, and use the current newsletter signup placeholder until a dedicated mailing platform is connected.",
  path: "/contact",
  eyebrow: "Contact and Subscribe",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact and subscribe"
        title="A simple, friendly way to reach the chapter and stay in the loop"
        description="Use the chapter inbox for questions, introductions, event follow-up, and newsletter requests while the long-term communications tools continue to take shape."
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
            <div className="mt-6 rounded-[1.4rem] border border-primary/10 bg-[#F7F4E8] p-4 text-sm leading-7 text-foreground/68">
              Best for event questions, volunteer interest, chapter introductions,
              and newsletter requests while the site’s dedicated signup platform
              is still pending.
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
              Newsletter signup
            </h2>
            <p className="mt-4 text-lg leading-8 text-foreground/74">
              The chapter’s email newsletter platform is not connected yet, but
              this block is ready for a future form integration. For now, the
              button opens an email-based signup request so visitors still have
              a clear way to ask for updates.
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
              Integration-ready placeholder: the email field and CTA can be
              connected later to Buttondown, Mailchimp, ConvertKit, or another
              mailing platform without restructuring the page.
            </p>
            <div className="mt-6 rounded-[1.4rem] border border-primary/10 bg-white/78 p-4">
              <h3 className="font-semibold text-foreground">
                Recommended future integration
              </h3>
              <p className="mt-2 text-sm leading-7 text-foreground/68">
                Connect this block to a lightweight newsletter service and keep
                the chapter inbox as a backup contact path for people who prefer
                direct email.
              </p>
            </div>
          </MotionReveal>
        </div>
      </SectionShell>

      <Container className="pb-20">
        <div className="grid gap-5 rounded-[1.9rem] border border-primary/10 bg-[linear-gradient(135deg,rgba(33,55,39,0.96),rgba(57,81,58,0.96))] p-6 text-white shadow-[0_28px_90px_rgba(29,48,35,0.26)] sm:p-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(260px,0.85fr)] lg:items-center">
          <div>
            <h2 className="font-heading text-3xl sm:text-4xl">
              Welcoming, grounded, and easy to reach
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-white/78">
              The chapter tone across the site is intentional: practical,
              conservation-minded, and inviting to people who may be new to
              native plants. That same tone should carry through in email and
              social responses as the chapter grows.
            </p>
          </div>
          <div className="rounded-[1.6rem] border border-white/12 bg-white/10 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/72">
              Best next steps
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <SmartLink
                href={siteConfig.contactUrl}
                className={cn(
                  buttonVariants({ variant: "secondary", size: "lg" }),
                  "h-auto justify-center rounded-full border border-white/14 bg-white/90 px-5 py-3 text-sm text-foreground hover:bg-white",
                )}
              >
                Email the chapter
              </SmartLink>
              <SmartLink
                href="/events"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/18 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/8"
              >
                View upcoming events
              </SmartLink>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
