import { ArrowRight } from "lucide-react";

import { ArticleCard } from "@/components/cards/article-card";
import { CtaBanner } from "@/components/sections/cta-banner";
import { PhotographicHeroBanner } from "@/components/sections/photographic-hero-banner";
import { SectionShell } from "@/components/sections/section-shell";
import { Container } from "@/components/shared/container";
import { MotionReveal } from "@/components/shared/motion-reveal";
import { SmartLink } from "@/components/shared/smart-link";
import { NextEventPanel } from "@/components/events/next-event-panel";
import { getNextChapterMeeting } from "@/data/events";
import { homepageActionPaths } from "@/data/local";
import { siteConfig } from "@/data/site";
import { getFeaturedPosts, getLatestPost } from "@/lib/blog";
import { createMetadata } from "@/lib/metadata";

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
  const nextEvent = getNextChapterMeeting();
  const highlightedPost = latestPost ?? featuredPosts[0];

  return (
    <>
      <PhotographicHeroBanner
        variant="homelandscape"
        title="NPSOT - Live Oak Chapter"
        description="Native plants, local knowledge, and chapter events in the Tri-County Prairie Belt"
        serviceArea="Serving Fayette, Colorado, and Lavaca Counties"
      />

      <SectionShell
        eyebrow="Happening Now"
        title="Start With What Is Happening Now"
        intro="Check the next chapter event, catch up on the latest story, or head straight to a useful local page."
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
                Quick links
              </p>
              <h2 className="mt-3 font-heading text-3xl leading-tight text-foreground">
                Popular Chapter Links
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
        eyebrow="About the Chapter"
        title="A Place to Learn Together, Ask Questions, and Stay Close to Local Landscapes"
        intro="The chapter gives people a nearby place to learn about native plants, share field observations, and build confidence through events, walks, and practical conversation."
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
          eyebrow="Get Involved"
          title="Join NPSOT, Attend an Event, or Reach Out to the Chapter"
        description="Whether you want to become a member, attend an event, volunteer locally, or ask a question, it is easy to get involved."
          primaryAction={{ href: siteConfig.joinUrl, label: "Join NPSOT" }}
          secondaryAction={{ href: "/events", label: "View events" }}
          variant="community"
        />
      </Container>
    </>
  );
}
