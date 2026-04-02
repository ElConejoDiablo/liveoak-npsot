import { Mail, MapPin, Send } from "lucide-react";

import { ContactForm } from "@/components/contact/contact-form";
import { buttonVariants } from "@/components/ui/button-styles";
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
  title: "Contact",
  description:
    "Contact the Live Oak Chapter through the contact form, social links, or direct email.",
  path: "/contact",
  eyebrow: "Contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Reach the chapter with one simple form or a direct email"
        description="Use the chapter contact form for event questions, volunteer interest, membership follow-up, native plant questions, or requests to hear about upcoming events."
        serviceArea={siteConfig.serviceAreaLabel}
        layout="utility"
        highlightsTitle="Ways to reach us"
        highlights={[
          "Use the form for questions, introductions, and follow-up",
          "Email the chapter directly if that is easier",
          "Check events if you want the fastest way to get involved",
        ]}
        actions={[
          { href: siteConfig.contactUrl, label: "Email the chapter" },
          { href: "/events", label: "View events", variant: "secondary" },
        ]}
      />

      <SectionShell
        eyebrow="Get in touch"
        title="Use the contact form or chapter email"
        intro="Ask about events, volunteering, membership, or local native plants. Messages go straight to the chapter email."
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
              and direct email follow-up with the chapter.
            </div>
            <div className="mt-6 border-t border-primary/10 pt-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/72">
                Follow the chapter
              </p>
              <p className="mt-2 text-sm leading-6 text-foreground/66">
                Find updates and public-facing chapter activity on these channels.
              </p>
              <SocialLinks className="mt-4" includeEmail={false} compact />
            </div>
          </MotionReveal>

          <MotionReveal className="rounded-[1.8rem] border border-primary/10 bg-[#F5F0E1] p-6 shadow-[0_18px_60px_rgba(39,59,42,0.08)] sm:p-8">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/8 text-primary">
              <Send className="h-6 w-6" />
            </div>
            <h2 className="mt-5 font-heading text-3xl text-foreground">
              Send a message to the chapter
            </h2>
            <p className="mt-4 text-lg leading-8 text-foreground/74">
              Share your question, ask about an event, introduce yourself, or
              let the chapter know you would like updates about upcoming
              meetings, walks, talks, and other events.
            </p>
            <div className="mt-6 rounded-[1.4rem] border border-primary/10 bg-white/75 p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/72">
                Chapter contact form
              </p>
              <p className="mt-3 text-base leading-7 text-foreground/72">
                Use one message for event questions, volunteer interest,
                native plant questions, or to ask about upcoming events.
              </p>
              <div className="mt-5">
                <ContactForm />
              </div>
            </div>
          </MotionReveal>
        </div>
      </SectionShell>

      <Container className="pb-20">
        <div className="grid gap-5 rounded-[1.9rem] border border-primary/10 bg-[linear-gradient(135deg,rgba(33,55,39,0.96),rgba(57,81,58,0.96))] p-6 text-white shadow-[0_28px_90px_rgba(29,48,35,0.26)] sm:p-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(260px,0.85fr)] lg:items-center">
          <div>
            <h2 className="font-heading text-3xl sm:text-4xl">
              Welcoming and easy to reach
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-white/78">
              Whether you are new to native plants, looking for a local event,
              or hoping to help with chapter efforts, the best way to get in
              touch is simply to reach out. A short note through the form or by
              email is always welcome.
            </p>
          </div>
          <div className="rounded-[1.6rem] border border-white/12 bg-white/10 p-5">
            <div className="flex flex-col gap-3">
              <SmartLink
                href="/events"
                className={cn(
                  buttonVariants({ variant: "secondary", size: "lg" }),
                  "h-auto justify-center rounded-full border border-white/14 bg-white/90 px-5 py-3 text-sm text-foreground hover:bg-white",
                )}
              >
                View events
              </SmartLink>
              <SmartLink
                href={siteConfig.contactUrl}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/18 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/8"
              >
                Email the chapter
              </SmartLink>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
