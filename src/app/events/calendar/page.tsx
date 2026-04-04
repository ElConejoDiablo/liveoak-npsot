import { ArrowRight } from "lucide-react";

import { EventsCalendarBrowser } from "@/components/events/events-calendar-browser";
import { SectionShell } from "@/components/sections/section-shell";
import { Container } from "@/components/shared/container";
import { MotionReveal } from "@/components/shared/motion-reveal";
import { SmartLink } from "@/components/shared/smart-link";
import {
  calendarIntro,
  getUpcomingEvents,
  statewideEventDestinations,
} from "@/data/events";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Events Calendar",
  description:
    "Use a month or week calendar view to see Live Oak Chapter dates alongside selected statewide NPSOT events.",
  path: "/events/calendar",
  eyebrow: "Events Calendar",
});

export const revalidate = 3600;

export default function EventsCalendarPage() {
  const events = getUpcomingEvents();

  return (
    <>
      <Container className="py-14 sm:py-18">
        <MotionReveal className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-primary/74">
            Calendar
          </p>
          <h1 className="mt-5 font-heading text-4xl leading-tight text-foreground sm:text-5xl lg:text-[3.8rem]">
            A calendar view for the chapter season ahead
          </h1>
          <p className="mt-5 text-lg leading-8 text-foreground/74 sm:text-xl sm:leading-9">
            {calendarIntro}
          </p>
        </MotionReveal>
      </Container>

      <SectionShell
        eyebrow="Calendar View"
        title="Switch Between Month and Week"
        intro="Use the controls to narrow by event source or type, then scan the current month or zoom in on a single week."
      >
        <EventsCalendarBrowser events={events} />
      </SectionShell>

      <SectionShell
        eyebrow="Statewide Destinations"
        title="Open the Official Statewide Calendars When You Want More"
        intro="This calendar carries a selected statewide mix. For the full NPSOT picture, use the official statewide pages below."
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
