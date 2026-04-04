import { ArrowRight } from "lucide-react";

import { UpcomingEventsBrowser } from "@/components/events/upcoming-events-browser";
import { SectionShell } from "@/components/sections/section-shell";
import { Container } from "@/components/shared/container";
import { MotionReveal } from "@/components/shared/motion-reveal";
import { SmartLink } from "@/components/shared/smart-link";
import {
  getUpcomingEvents,
  getUpcomingEventTypes,
  statewideEventDestinations,
  upcomingEventsEmptyState,
  upcomingEventsIntro,
} from "@/data/events";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Upcoming Events",
  description:
    "Browse upcoming Live Oak Chapter events and selected statewide NPSOT programs in one list-first view.",
  path: "/events/upcoming",
  eyebrow: "Upcoming Events",
});

export const revalidate = 3600;

export default function UpcomingEventsPage() {
  const events = getUpcomingEvents();
  const eventTypes = getUpcomingEventTypes();

  return (
    <>
      <Container className="py-14 sm:py-18">
        <MotionReveal className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-primary/74">
            Upcoming Events
          </p>
          <h1 className="mt-5 font-heading text-4xl leading-tight text-foreground sm:text-5xl lg:text-[3.8rem]">
            One list for chapter dates and selected statewide NPSOT events
          </h1>
          <p className="mt-5 text-lg leading-8 text-foreground/74 sm:text-xl sm:leading-9">
            {upcomingEventsIntro}
          </p>
        </MotionReveal>
      </Container>

      <SectionShell
        eyebrow="List View"
        title="Upcoming Chapter and Statewide Events"
        intro="Filter the list by source or event type, then open chapter detail pages or official NPSOT event pages for the full particulars."
      >
        {events.length ? (
          <UpcomingEventsBrowser events={events} eventTypes={eventTypes} />
        ) : (
          <MotionReveal className="rounded-[1.8rem] border border-dashed border-primary/20 bg-[#F7F4E8] p-6">
            <h3 className="font-heading text-2xl text-foreground">
              {upcomingEventsEmptyState.title}
            </h3>
            <p className="mt-3 text-base leading-7 text-foreground/72">
              {upcomingEventsEmptyState.description}
            </p>
          </MotionReveal>
        )}
      </SectionShell>

      <SectionShell
        eyebrow="Official Statewide Sources"
        title="Keep the Broader NPSOT Calendar in Reach"
        intro="The statewide pages below are the official source for more chapter meetings, virtual programs, and symposium announcements across Texas."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {statewideEventDestinations.map((destination, index) => (
            <MotionReveal
              key={destination.href}
              delay={index * 0.05}
              className="rounded-[1.8rem] border border-primary/10 bg-white/82 p-6 shadow-[0_18px_60px_rgba(39,59,42,0.08)]"
            >
              <h2 className="font-heading text-2xl text-foreground">
                {destination.title}
              </h2>
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
    </>
  );
}
