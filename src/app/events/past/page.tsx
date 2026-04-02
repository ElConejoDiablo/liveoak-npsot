import { ArrowRight, Lock } from "lucide-react";

import { PastEventCard } from "@/components/events/past-event-card";
import { SectionShell } from "@/components/sections/section-shell";
import { Container } from "@/components/shared/container";
import { MotionReveal } from "@/components/shared/motion-reveal";
import { SmartLink } from "@/components/shared/smart-link";
import {
  getPastEvents,
  pastEventsEmptyState,
  pastEventsIntro,
} from "@/data/events";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Past Events",
  description:
    "Browse past Live Oak Chapter event recaps, follow-up materials, recordings, and protected meeting-minute links when available.",
  path: "/events/past",
  eyebrow: "Past Events",
});

export const revalidate = 3600;

export default function PastEventsPage() {
  const events = getPastEvents();

  return (
    <>
      <Container className="py-14 sm:py-18">
        <MotionReveal className="max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-primary/74">
            Past events
          </p>
          <h1 className="mt-5 font-heading text-4xl leading-tight text-foreground sm:text-5xl lg:text-[3.8rem]">
            Recaps, recordings, and follow-up from earlier chapter gatherings
          </h1>
          <p className="mt-5 text-lg leading-8 text-foreground/74 sm:text-xl sm:leading-9">
            {pastEventsIntro}
          </p>
        </MotionReveal>
      </Container>

      <SectionShell
        eyebrow="Archive"
        title="Past chapter gatherings"
        intro="Recaps are listed with the newest first. Public materials stay public here, while approved meeting minutes remain inside the members portal."
      >
        {events.length ? (
          <div className="space-y-6">
            {events.map((event, index) => (
              <MotionReveal key={event.id} delay={index * 0.05}>
                <PastEventCard event={event} />
              </MotionReveal>
            ))}
          </div>
        ) : (
          <MotionReveal className="rounded-[1.8rem] border border-dashed border-primary/20 bg-[#F7F4E8] p-6">
            <h3 className="font-heading text-2xl text-foreground">
              {pastEventsEmptyState.title}
            </h3>
            <p className="mt-3 text-base leading-7 text-foreground/72">
              {pastEventsEmptyState.description}
            </p>
          </MotionReveal>
        )}
      </SectionShell>

      <SectionShell
        eyebrow="More follow-up"
        title="Look for recaps and follow-up materials"
        intro="Public recap stories live in the article archive. Protected minutes and member-only handouts stay inside the members portal."
      >
        <div className="grid gap-5 md:grid-cols-2">
          <MotionReveal className="rounded-[1.8rem] border border-primary/10 bg-white/82 p-6 shadow-[0_18px_60px_rgba(39,59,42,0.08)]">
            <h2 className="font-heading text-2xl text-foreground">
              Chapter articles
            </h2>
            <p className="mt-3 text-base leading-7 text-foreground/72">
              Read meeting recaps, plant notes, and follow-up stories tied to chapter events.
            </p>
            <SmartLink
              href="/news"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              <span>Open articles</span>
              <ArrowRight className="h-4 w-4" />
            </SmartLink>
          </MotionReveal>

          <MotionReveal
            delay={0.05}
            className="rounded-[1.8rem] border border-primary/10 bg-white/82 p-6 shadow-[0_18px_60px_rgba(39,59,42,0.08)]"
          >
            <h2 className="font-heading text-2xl text-foreground">
              Members portal documents
            </h2>
            <p className="mt-3 text-base leading-7 text-foreground/72">
              Approved meeting minutes and member-only follow-up materials stay behind the existing sign-in flow.
            </p>
            <SmartLink
              href="/members/documents"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              <Lock className="h-4 w-4" />
              <span>Open members portal</span>
            </SmartLink>
          </MotionReveal>
        </div>
      </SectionShell>
    </>
  );
}
