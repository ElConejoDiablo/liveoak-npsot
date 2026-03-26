import {
  ArrowRight,
  Binoculars,
  BookOpenText,
  HandHeart,
  Megaphone,
  Newspaper,
  Sprout,
} from "lucide-react";

import { ArticleCard } from "@/components/cards/article-card";
import { EventCard } from "@/components/cards/event-card";
import { buttonVariants } from "@/components/ui/button-styles";
import { CtaBanner } from "@/components/sections/cta-banner";
import { ImageFeatureSection } from "@/components/sections/image-feature-section";
import { SectionShell } from "@/components/sections/section-shell";
import { Container } from "@/components/shared/container";
import { MotionReveal } from "@/components/shared/motion-reveal";
import { PlantIllustration } from "@/components/shared/plant-illustration";
import { SmartLink } from "@/components/shared/smart-link";
import { eventScheduleNote, upcomingEvents } from "@/data/events";
import { programAreas, seasonalHighlights } from "@/data/programs";
import { resourceGroups } from "@/data/resources";
import { siteConfig } from "@/data/site";
import { getFeaturedPosts } from "@/lib/blog";
import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata = createMetadata({
  description: siteConfig.description,
  path: "/",
});

const programIcons = {
  sprout: Sprout,
  binoculars: Binoculars,
  "hand-heart": HandHeart,
  megaphone: Megaphone,
  seedling: BookOpenText,
};

export default async function Home() {
  const featuredPosts = await getFeaturedPosts(3);

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
                href="/volunteer"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "lg" }),
                  "h-auto rounded-full px-5 py-3 text-sm text-foreground/78 hover:bg-white/70",
                )}
              >
                Volunteer with us
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
            <PlantIllustration
              variant="savanna"
              className="aspect-[4/4.4] w-full max-w-2xl"
            />
          </MotionReveal>
        </Container>
      </section>

      <SectionShell
        eyebrow="Grounded mission"
        title="Useful first, beautiful second, and always rooted in place"
        intro="This chapter is designed to be a practical home for native-plant learning and participation in south-central Texas. Visitors should be able to find events, trustworthy guidance, and a clear way to connect from the first screen onward."
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

      <SectionShell
        id="home-events"
        eyebrow="Upcoming events"
        title="A clear front door into meetings, walks, and hands-on learning"
        intro="The chapter calendar should feel immediately useful. These launch-ready sample events show the kinds of chapter gatherings visitors can expect, while making it easy to swap in final details later."
        actions={
          <SmartLink
            href="/events"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            <span>Browse the full events page</span>
            <ArrowRight className="h-4 w-4" />
          </SmartLink>
        }
      >
        <div className="grid gap-5 lg:grid-cols-2">
          {upcomingEvents.slice(0, 2).map((event, index) => (
            <MotionReveal key={event.title} delay={index * 0.05}>
              <EventCard event={event} />
            </MotionReveal>
          ))}
        </div>
        <MotionReveal className="mt-5 rounded-[1.5rem] border border-dashed border-primary/20 bg-[#F7F4E8] px-5 py-4 text-sm leading-7 text-foreground/72">
          {eventScheduleNote}
        </MotionReveal>
      </SectionShell>

      <SectionShell
        eyebrow="Programs"
        title="What the chapter can do in the field, in the community, and over the course of a year"
        intro="The practical architecture for a strong chapter site is not only navigation. It is showing, clearly and warmly, how the chapter helps people participate."
      >
        <ImageFeatureSection
          eyebrow="Field-ready and welcoming"
          title="Programs that turn curiosity into practice"
          description="The strongest chapter activities make native plants more legible in everyday life. They combine education, outdoor observation, stewardship, and friendly entry points for people who are just getting started."
          bullets={[
            "Public programs that feel useful to new gardeners and longtime members alike",
            "Field walks and plant observation that translate ecology into direct experience",
            "Seasonal seed, pollinator, and habitat topics tied to what is happening locally",
          ]}
          variant="pollinator"
        />

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {programAreas.map((area, index) => {
            const Icon = programIcons[area.icon];

            return (
              <MotionReveal
                key={area.title}
                delay={index * 0.04}
                className="rounded-[1.6rem] border border-primary/10 bg-white/78 p-5 shadow-[0_18px_60px_rgba(37,58,40,0.08)]"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/8 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-heading text-2xl leading-tight text-foreground">
                  {area.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-foreground/72">
                  {area.description}
                </p>
              </MotionReveal>
            );
          })}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Seasonal focus"
        title="What matters this season for seeds, pollinators, and field observation"
        intro="Seasonal guidance makes a chapter site feel alive. These highlights give visitors a reason to return and show how native-plant learning changes over the year."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {seasonalHighlights.map((highlight, index) => (
            <MotionReveal
              key={highlight.title}
              delay={index * 0.05}
              className="overflow-hidden rounded-[1.8rem] border border-primary/10 bg-white/80 shadow-[0_18px_60px_rgba(39,59,42,0.08)]"
            >
              <PlantIllustration
                variant={highlight.artVariant}
                className="aspect-[4/3] rounded-none border-0 shadow-none"
              />
              <div className="p-5 sm:p-6">
                <div className="text-sm font-semibold uppercase tracking-[0.22em] text-primary/74">
                  {highlight.season}
                </div>
                <h3 className="mt-3 font-heading text-2xl leading-tight text-foreground">
                  {highlight.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-foreground/72">
                  {highlight.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {highlight.plants.map((plant) => (
                    <span
                      key={plant}
                      className="rounded-full border border-primary/10 bg-primary/6 px-3 py-1 text-xs font-medium text-foreground/72"
                    >
                      {plant}
                    </span>
                  ))}
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Latest news"
        title="Starter articles that feel local, practical, and worth reading"
        intro="The blog system is seeded with regionally relevant content so the site launches with real substance instead of placeholders alone."
        actions={
          <SmartLink
            href="/news"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            <span>Read the blog</span>
            <Newspaper className="h-4 w-4" />
          </SmartLink>
        }
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {featuredPosts.map((post, index) => (
            <MotionReveal key={post.slug} delay={index * 0.05}>
              <ArticleCard post={post} />
            </MotionReveal>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Resources"
        title="Connect local chapter activity to the statewide NPSOT ecosystem"
        intro="A chapter site should help visitors move easily between local engagement and deeper statewide resources. These shortcuts keep that path obvious."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {resourceGroups[0].links.map((link, index) => (
            <MotionReveal key={link.title} delay={index * 0.04}>
              <SmartLink
                href={link.href}
                className="group flex h-full flex-col rounded-[1.6rem] border border-primary/10 bg-white/78 p-5 shadow-[0_18px_60px_rgba(39,59,42,0.08)] transition hover:-translate-y-0.5"
              >
                <h3 className="font-heading text-2xl leading-tight text-foreground">
                  {link.title}
                </h3>
                <p className="mt-3 flex-1 text-base leading-7 text-foreground/72">
                  {link.description}
                </p>
                <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  <span>Open resource</span>
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </div>
              </SmartLink>
            </MotionReveal>
          ))}
        </div>
      </SectionShell>

      <Container className="pb-20">
        <CtaBanner
          eyebrow="Get involved"
          title="Join, volunteer, or ask a question while the chapter keeps growing"
          description="A strong chapter site should make next steps clear. Whether you want to become a member, stay updated, volunteer, or simply reach out, the pathways are ready."
          primaryAction={{ href: siteConfig.joinUrl, label: "Join NPSOT" }}
          secondaryAction={{ href: "/contact", label: "Contact the chapter" }}
          variant="community"
        />
      </Container>
    </>
  );
}
