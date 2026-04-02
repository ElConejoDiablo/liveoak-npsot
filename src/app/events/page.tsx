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
    "Browse upcoming chapter meetings, plant walks, talks, workshops, and volunteer days for the Live Oak Chapter.",
  path: "/events",
  eyebrow: "Events and Calendar",
});

export default function EventsPage() {
  const nextEvent = upcomingEvents[0];

  return (
    <>
      <PageHero
        eyebrow="Events and calendar"
        title="Meetings, walks, and seasonal gatherings across the chapter region"
        description="Use the chapter calendar to find meetings, walks, talks, workshops, and volunteer days across Fayette, Colorado, and Lavaca Counties."
        serviceArea={siteConfig.serviceAreaLabel}
        layout="utility"
        highlightsTitle="At a glance"
        highlights={[
          "Next featured event and current calendar",
          "Type filters for meetings, walks, talks, and volunteer days",
          "Visitor notes for location, weather, and accessibility",
        ]}
        actions={[
          { href: siteConfig.contactUrl, label: "Ask about events" },
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
        title="Upcoming events"
        intro="Filter by event type to find meetings, walks, talks, workshops, and volunteer days."
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
        intro="A little advance information can make planning easier, especially for first visits."
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
          title="Contact the chapter for current event details and updates"
          description="Reach out if you need the latest location details, weather updates, or information about upcoming events."
          primaryAction={{ href: "/contact", label: "Contact the chapter" }}
          secondaryAction={{ href: siteConfig.contactUrl, label: "Email the chapter" }}
          variant="savanna"
        />
      </div>
    </>
  );
}
