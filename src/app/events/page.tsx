import { NextEventPanel } from "@/components/events/next-event-panel";
import { EventsBrowser } from "@/components/events/events-browser";
import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { SectionShell } from "@/components/sections/section-shell";
import { MotionReveal } from "@/components/shared/motion-reveal";
import {
  eventPageIntro,
  eventTypes,
  eventsEmptyState,
  participationNotes,
  upcomingEvents,
} from "@/data/events";
import { siteConfig } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Events and Calendar",
  description:
    "Browse upcoming chapter meetings, plant walks, talks, and hands-on programming for the Live Oak Chapter.",
  path: "/events",
  eyebrow: "Events and Calendar",
});

export default function EventsPage() {
  const nextEvent = upcomingEvents[0];

  return (
    <>
      <PageHero
        eyebrow="Events and calendar"
        title="Meetings, walks, and seasonal gatherings built to feel approachable"
        description="Use the chapter calendar to find meetings, walks, talks, and seasonal programming across the Live Oak Chapter service area."
        serviceArea={siteConfig.serviceAreaLabel}
        layout="utility"
        highlightsTitle="Quick scan"
        highlights={[
          "Start with the next event at the top of the page",
          "Filter the full list by event type",
          "Check visitor notes before attending for the first time",
        ]}
        actions={[
          { href: siteConfig.contactUrl, label: "Ask about upcoming events" },
          { href: "/volunteer", label: "Volunteer with us", variant: "secondary" },
        ]}
      />

      <SectionShell
        eyebrow="Calendar overview"
        title="Upcoming chapter events at a glance"
        intro={eventPageIntro}
      >
        <MotionReveal>
          <NextEventPanel event={nextEvent} />
        </MotionReveal>
      </SectionShell>

      <SectionShell
        eyebrow="Upcoming"
        title="Upcoming chapter programming"
        intro="Filter by event type to quickly find meetings, walks, talks, workshops, and volunteer opportunities."
      >
        {upcomingEvents.length ? (
          <EventsBrowser events={upcomingEvents} eventTypes={eventTypes} />
        ) : (
          <MotionReveal className="rounded-[1.7rem] border border-dashed border-primary/20 bg-[#F7F4E8] p-6">
            <h3 className="font-heading text-2xl text-foreground">
              {eventsEmptyState.title}
            </h3>
            <p className="mt-3 text-base leading-7 text-foreground/72">
              {eventsEmptyState.description}
            </p>
          </MotionReveal>
        )}
      </SectionShell>

      <SectionShell
        eyebrow="Participation notes"
        title="Helpful expectations for visitors"
        intro="A little advance information helps first-time visitors feel more comfortable attending."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {participationNotes.map((note, index) => (
            <MotionReveal
              key={note}
              delay={index * 0.05}
              className="rounded-[1.6rem] border border-primary/10 bg-white/78 p-5 text-base leading-7 text-foreground/74 shadow-[0_18px_60px_rgba(39,59,42,0.08)]"
            >
              {note}
            </MotionReveal>
          ))}
        </div>
      </SectionShell>

      <div className="mx-auto max-w-7xl px-5 pb-20 sm:px-6 lg:px-8">
        <CtaBanner
          eyebrow="Stay connected"
          title="Use the chapter email for current event details and chapter updates"
          description="The chapter inbox is the simplest way to ask about upcoming programs, receive current event details, and stay connected between gatherings."
          primaryAction={{ href: "/contact", label: "Contact / subscribe" }}
          secondaryAction={{ href: siteConfig.contactUrl, label: "Email now" }}
          variant="savanna"
        />
      </div>
    </>
  );
}
