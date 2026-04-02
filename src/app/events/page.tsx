import { ArrowRight } from "lucide-react";

import { EventsCalendarPreview } from "@/components/events/events-calendar-preview";
import { EventListCard } from "@/components/events/event-list-card";
import { NextChapterMeetingHero } from "@/components/events/next-chapter-meeting-hero";
import { PastEventCard } from "@/components/events/past-event-card";
import { SectionShell } from "@/components/sections/section-shell";
import { MotionReveal } from "@/components/shared/motion-reveal";
import { SmartLink } from "@/components/shared/smart-link";
import { buttonVariants } from "@/components/ui/button-styles";
import {
  getNextChapterMeeting,
  getPastEvents,
  getUpcomingEvents,
  statewideEventDestinations,
} from "@/data/events";
import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata = createMetadata({
  title: "Events",
  description:
    "See the next Live Oak Chapter meeting, browse upcoming chapter and selected statewide NPSOT events, and explore the calendar.",
  path: "/events",
  eyebrow: "Events",
});

export const revalidate = 3600;

export default function EventsPage() {
  const nextMeeting = getNextChapterMeeting();
  const upcomingEvents = getUpcomingEvents();
  const upcomingPreview = upcomingEvents.slice(0, 4);
  const latestPastEvent = getPastEvents()[0];

  return (
    <>
      <NextChapterMeetingHero event={nextMeeting} />

      <SectionShell
        eyebrow="Events hub"
        title="See what is coming up and how it lands on the calendar"
        intro="Start with chapter dates close to home, then keep an eye on selected statewide NPSOT events that may be worth the drive or the Zoom link."
      >
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <MotionReveal className="rounded-[2rem] border border-primary/10 bg-white/84 p-6 shadow-[0_22px_80px_rgba(37,58,40,0.08)] sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/72">
                  Upcoming events
                </p>
                <h2 className="mt-2 font-heading text-3xl text-foreground">
                  Chapter dates plus selected statewide events
                </h2>
              </div>
              <SmartLink
                href="/events/upcoming"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
              >
                <span>View upcoming events</span>
                <ArrowRight className="h-4 w-4" />
              </SmartLink>
            </div>

            <p className="mt-4 text-base leading-7 text-foreground/72">
              Local meetings, walks, talks, and workshops stay in the same stream as
              a small set of statewide webinars, field trips, and chapter programs.
            </p>

            <div className="mt-6 space-y-4">
              {upcomingPreview.map((event) => (
                <EventListCard key={event.id} event={event} compact />
              ))}
            </div>
          </MotionReveal>

          <MotionReveal delay={0.08}>
            <div className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/72">
                    Calendar
                  </p>
                  <h2 className="mt-2 font-heading text-3xl text-foreground">
                    Month at a glance
                  </h2>
                </div>
                <SmartLink
                  href="/events/calendar"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
                >
                  <span>Open calendar</span>
                  <ArrowRight className="h-4 w-4" />
                </SmartLink>
              </div>

              <EventsCalendarPreview events={upcomingEvents.slice(0, 6)} />
            </div>
          </MotionReveal>
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Across NPSOT"
        title="Statewide event sources worth checking"
        intro="When a chapter event calendar is quiet, these official NPSOT pages help fill in virtual programs, statewide dates, and annual symposium news."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {statewideEventDestinations.map((destination, index) => (
            <MotionReveal
              key={destination.href}
              delay={index * 0.05}
              className="rounded-[1.8rem] border border-primary/10 bg-white/82 p-6 shadow-[0_18px_60px_rgba(39,59,42,0.08)]"
            >
              <h3 className="font-heading text-2xl text-foreground">
                {destination.title}
              </h3>
              <p className="mt-3 text-base leading-7 text-foreground/72">
                {destination.description}
              </p>
              <SmartLink
                href={destination.href}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary"
              >
                <span>Open source</span>
                <ArrowRight className="h-4 w-4" />
              </SmartLink>
            </MotionReveal>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Past events"
        title="Recaps, materials, and chapter follow-up"
        intro="Past chapter gatherings can hold recap stories, recordings, public materials, and protected meeting minutes when they are available."
        actions={
          <SmartLink
            href="/events/past"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 rounded-full border-primary/15 bg-white/84 px-5",
            )}
          >
            Browse past events
          </SmartLink>
        }
      >
        {latestPastEvent ? <PastEventCard event={latestPastEvent} /> : null}
      </SectionShell>
    </>
  );
}
