import { ArrowRight } from "lucide-react";

import { ArticleCard } from "@/components/cards/article-card";
import { buttonVariants } from "@/components/ui/button-styles";
import { CtaBanner } from "@/components/sections/cta-banner";
import { SectionShell } from "@/components/sections/section-shell";
import { Container } from "@/components/shared/container";
import { EditorialImageSlot } from "@/components/shared/editorial-image-slot";
import { MotionReveal } from "@/components/shared/motion-reveal";
import { SmartLink } from "@/components/shared/smart-link";
import { NextEventPanel } from "@/components/events/next-event-panel";
import { upcomingEvents } from "@/data/events";
import { homepageActionPaths } from "@/data/local";
import { siteConfig } from "@/data/site";
import { getFeaturedPosts, getLatestPost } from "@/lib/blog";
import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata = createMetadata({
  description: siteConfig.description,
  path: "/",
  eyebrow: "Live Oak Chapter",
});

export default async function Home() {
  const [featuredPosts, latestPost] = await Promise.all([
    getFeaturedPosts(3),
    getLatestPost(),
  ]);
  const nextEvent = upcomingEvents[0];
  const highlightedPost = latestPost ?? featuredPosts[0];

  return (
    <>
      <section className="relative overflow-hidden border-b border-primary/10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.92),rgba(244,236,220,0.88)_44%,rgba(230,219,194,0.96)_100%)]">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.4),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(63,92,58,0.12),transparent_34%)]" />
        <Container className="relative grid min-h-[calc(100svh-5rem)] gap-10 py-10 sm:py-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:items-center lg:py-16">
          <MotionReveal className="max-w-3xl">
            <div className="inline-flex rounded-full border border-primary/15 bg-white/80 px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-primary/76">
              Live Oak Chapter
            </div>
            <h1 className="mt-6 font-heading text-5xl leading-[0.98] text-foreground sm:text-6xl lg:text-[5.7rem]">
              Native plant community for Fayette, Colorado, and Lavaca Counties.
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-9 text-foreground/76">
              The Live Oak Chapter of the Native Plant Society of Texas connects
              people to native plants, habitat care, and practical regional
              knowledge through welcoming programs, field walks, and community
              outreach.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <SmartLink
                href="/events"
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "h-auto rounded-full px-5 py-3 text-sm",
                )}
              >
                <span>View Events</span>
                <ArrowRight className="ml-1 h-4 w-4" />
              </SmartLink>
              <SmartLink
                href={siteConfig.joinUrl}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-auto rounded-full border-primary/15 bg-white/85 px-5 py-3 text-sm",
                )}
              >
                Join NPSOT
              </SmartLink>
              <SmartLink
                href="/resources"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "lg" }),
                  "h-auto rounded-full px-5 py-3 text-sm text-foreground/78 hover:bg-white/70",
                )}
              >
                Explore resources
              </SmartLink>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {siteConfig.chapterStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[1.5rem] border border-primary/10 bg-white/75 p-4 shadow-[0_18px_50px_rgba(39,59,42,0.07)]"
                >
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/72">
                    {stat.label}
                  </div>
                  <div className="mt-2 font-heading text-3xl text-foreground">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-sm leading-6 text-foreground/66">
                    {stat.detail}
                  </div>
                </div>
              ))}
            </div>
          </MotionReveal>

          <MotionReveal delay={0.08} className="lg:justify-self-end">
            <EditorialImageSlot
              variant="savanna"
              title="Field walks, chapter gatherings, and local habitat stories"
              note="Prairie edges, oak shade, working lands, and native plant communities all shape the places this chapter serves."
              className="w-full max-w-2xl"
            />
          </MotionReveal>
        </Container>
      </section>

      <SectionShell
        eyebrow="Alive now"
        title="See what is happening in the chapter right now"
        intro="Start with the next event, the latest article, or a quick route to the page you need."
      >
        <div className="grid gap-5 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <MotionReveal>
            <NextEventPanel event={nextEvent} />
          </MotionReveal>

          <div className="grid gap-5 lg:grid-cols-2">
            {highlightedPost ? (
              <MotionReveal>
                <ArticleCard post={highlightedPost} />
              </MotionReveal>
            ) : null}
            <MotionReveal className="rounded-[1.8rem] border border-primary/10 bg-[#F5F0E1] p-6 shadow-[0_18px_60px_rgba(39,59,42,0.08)]">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary/72">
                Start here
              </p>
              <h2 className="mt-3 font-heading text-3xl leading-tight text-foreground">
                Quick paths for first-time visitors
              </h2>
              <div className="mt-5 space-y-3">
                {homepageActionPaths.map((action) => (
                  <SmartLink
                    key={action.title}
                    href={action.href}
                    className="block rounded-[1.35rem] border border-primary/10 bg-white/80 px-4 py-4 transition hover:border-primary/18 hover:bg-white"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-base font-semibold text-foreground">
                          {action.title}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-foreground/68">
                          {action.description}
                        </p>
                      </div>
                      <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-primary" />
                    </div>
                  </SmartLink>
                ))}
              </div>
            </MotionReveal>
          </div>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Grounded mission"
        title="A local chapter built to be useful, welcoming, and easy to navigate"
        intro="The homepage should quickly explain what this chapter is for, then help visitors move to the page with the details they actually need."
        actions={
          <SmartLink
            href="/about"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            <span>Read more about the chapter</span>
            <ArrowRight className="h-4 w-4" />
          </SmartLink>
        }
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <MotionReveal className="rounded-[2rem] border border-primary/10 bg-[#F5F0E1] p-6 shadow-[0_24px_70px_rgba(39,59,42,0.08)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary/74">
              Official mission
            </p>
            <blockquote className="mt-5 font-heading text-3xl leading-tight text-foreground sm:text-[2.6rem]">
              {siteConfig.mission}
            </blockquote>
            <p className="mt-5 text-base leading-7 text-foreground/72">
              {siteConfig.serviceAreaSentence}
            </p>
          </MotionReveal>

          <div className="grid gap-4 md:grid-cols-3">
            {siteConfig.homePillars.map((pillar, index) => (
              <MotionReveal
                key={pillar.title}
                delay={index * 0.05}
                className="rounded-[1.6rem] border border-primary/10 bg-white/78 p-5 shadow-[0_18px_60px_rgba(37,58,40,0.08)]"
              >
                <h3 className="font-heading text-2xl leading-tight text-foreground">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-foreground/72">
                  {pillar.description}
                </p>
              </MotionReveal>
            ))}
          </div>
        </div>
      </SectionShell>

      <Container className="pb-20">
        <CtaBanner
          eyebrow="Get involved"
          title="Join NPSOT, attend an event, or reach out to the chapter"
          description="Whether you want to become a member, show up for a program, volunteer locally, or ask a question, the next step should feel easy."
          primaryAction={{ href: siteConfig.joinUrl, label: "Join NPSOT" }}
          secondaryAction={{ href: "/events", label: "View events" }}
          variant="community"
        />
      </Container>
    </>
  );
}
