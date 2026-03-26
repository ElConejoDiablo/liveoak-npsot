import { EventCard } from "@/components/cards/event-card";
import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { SectionShell } from "@/components/sections/section-shell";
import { MotionReveal } from "@/components/shared/motion-reveal";
import {
  eventScheduleNote,
  participationNotes,
  upcomingEvents,
} from "@/data/events";
import { siteConfig } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Events and Calendar",
  description:
    "Browse sample upcoming chapter meetings, plant walks, and volunteer gatherings for the Live Oak Chapter.",
  path: "/events",
});

export default function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Events and calendar"
        title="Meetings, walks, and seasonal gatherings built to feel approachable"
        description="Chapter events should be easy to scan, easy to update, and easy to say yes to. This launch version includes realistic sample content until the final public calendar is posted."
        serviceArea={siteConfig.serviceAreaLabel}
        variant="community"
        actions={[
          { href: siteConfig.contactUrl, label: "Ask about upcoming events" },
          { href: "/volunteer", label: "Volunteer with us", variant: "secondary" },
        ]}
      />

      <SectionShell
        eyebrow="Schedule note"
        title="Ready for real calendar updates"
        intro="The event layout is intentionally polished without locking the chapter into hard-coded assumptions."
      >
        <MotionReveal className="rounded-[1.7rem] border border-dashed border-primary/20 bg-[#F7F4E8] p-6 text-lg leading-8 text-foreground/74">
          {eventScheduleNote}
        </MotionReveal>
      </SectionShell>

      <SectionShell
        eyebrow="Upcoming"
        title="Sample event listings that can be edited in one place later"
        intro="These examples span meetings, talks, field walks, and hands-on seed work to show the breadth a chapter calendar can hold."
      >
        <div className="space-y-5">
          {upcomingEvents.map((event, index) => (
            <MotionReveal key={event.title} delay={index * 0.05}>
              <EventCard event={event} />
            </MotionReveal>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Participation notes"
        title="Helpful expectations for visitors"
        intro="Clear guidance lowers friction for new attendees and keeps the chapter experience legible."
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
          title="Use the chapter email until registration and newsletter tools are finalized"
          description="The current setup keeps communication simple and dependable while the chapter's long-term event workflow takes shape."
          primaryAction={{ href: "/contact", label: "Contact / subscribe" }}
          secondaryAction={{ href: siteConfig.contactUrl, label: "Email now" }}
          variant="savanna"
        />
      </div>
    </>
  );
}
