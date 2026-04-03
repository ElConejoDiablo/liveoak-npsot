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
        title="Upcoming events and calendar"
        intro="The chapter meets on the second Saturday of every month."
      >
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <MotionReveal className="rounded-[2rem] border border-primary/10 bg-white/84 p-6 shadow-[0_22px_80px_rgba(37,58,40,0.08)] sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="mt-2 font-heading text-3xl text-foreground">
                  Upcoming events
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
                  <h2 className="mt-2 font-heading text-3xl text-foreground">
                    Calendar
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
        title="All upcoming dates"
        intro="Chapter events appear alongside a small set of selected statewide NPSOT dates so the full schedule stays practical to scan in one place."
      >
        <div className="space-y-4">
          {upcomingEvents.map((event, index) => (
            <MotionReveal
              key={event.id}
              delay={index * 0.05}
              className="rounded-[1.8rem] border border-transparent"
            >
              <EventListCard event={event} />
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
