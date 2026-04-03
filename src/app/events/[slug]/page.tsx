import { CalendarDays, CloudSun, MapPin, Shirt, UserRound } from "lucide-react";
import { notFound } from "next/navigation";

import { SectionShell } from "@/components/sections/section-shell";
import { Container } from "@/components/shared/container";
import { SmartLink } from "@/components/shared/smart-link";
import {
  chapterEvents,
  getChapterEventBySlug,
  getOtherUpcomingChapterEvents,
} from "@/data/events";
import { siteConfig } from "@/data/site";
import { createMetadata } from "@/lib/metadata";
import { formatFullDate, formatTimeRange } from "@/lib/format";

type EventPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return chapterEvents.map((event) => ({ slug: event.slug }));
}

export const revalidate = 3600;

export async function generateMetadata({ params }: EventPageProps) {
  const { slug } = await params;
  const event = getChapterEventBySlug(slug);

  if (!event) {
    return createMetadata({
      title: "Event not found",
      description: siteConfig.description,
      path: `/events/${slug}`,
    });
  }

  return createMetadata({
    title: event.title,
    description: event.summary,
    path: `/events/${event.slug}`,
    tags: [event.type, event.county, "Live Oak Chapter events"],
    eyebrow: event.type,
  });
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = getChapterEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const otherUpcoming = getOtherUpcomingChapterEvents(event.slug).slice(0, 2);

  return (
    <>
      <Container className="py-10 sm:py-14">
        <SmartLink
          href="/events/upcoming"
          className="text-sm font-semibold text-primary underline decoration-primary/30 underline-offset-4"
        >
          Back to upcoming events
        </SmartLink>

        <div className="mt-6 max-w-4xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary/74">
            {event.type}
          </p>
          <h1 className="mt-4 font-heading text-4xl leading-tight text-foreground sm:text-5xl">
            {event.title}
          </h1>
          <p className="mt-5 text-xl leading-9 text-foreground/74">
            {event.description}
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <aside className="rounded-[1.8rem] border border-primary/10 bg-[#F5F0E1] p-6 shadow-[0_18px_60px_rgba(39,59,42,0.08)]">
            <dl className="space-y-5 text-sm text-foreground/74">
              <div className="flex gap-3">
                <CalendarDays className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <dt className="font-semibold text-foreground">Date</dt>
                  <dd className="mt-1">{formatFullDate(event.startDateTime)}</dd>
                </div>
              </div>
              <div className="flex gap-3">
                <CalendarDays className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <dt className="font-semibold text-foreground">Time</dt>
                  <dd className="mt-1">
                    {event.timeLabel ?? formatTimeRange(event.startDateTime, event.endDateTime)}
                  </dd>
                </div>
              </div>
              <div className="flex gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <div>
                  <dt className="font-semibold text-foreground">Where</dt>
                  <dd className="mt-1">
                    {event.locationLabel ?? event.locationName}
                    {event.locationAddress ? <span className="block">{event.locationAddress}</span> : null}
                    {event.city ? <span className="block">{event.city}</span> : null}
                    {event.county ? <span className="block">{event.county}</span> : null}
                  </dd>
                </div>
              </div>
              {event.audience ? (
                <div className="flex gap-3">
                  <UserRound className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <dt className="font-semibold text-foreground">Who it’s for</dt>
                    <dd className="mt-1">{event.audience}</dd>
                  </div>
                </div>
              ) : null}
              {event.attendanceNote ? (
                <div className="flex gap-3">
                  <UserRound className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <dt className="font-semibold text-foreground">Attendance note</dt>
                    <dd className="mt-1">{event.attendanceNote}</dd>
                  </div>
                </div>
              ) : null}
              {event.whatToBring?.length ? (
                <div className="flex gap-3">
                  <Shirt className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <dt className="font-semibold text-foreground">What to bring</dt>
                    <dd className="mt-1">{event.whatToBring.join(", ")}</dd>
                  </div>
                </div>
              ) : null}
              {event.weatherNote ? (
                <div className="flex gap-3">
                  <CloudSun className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <dt className="font-semibold text-foreground">Weather note</dt>
                    <dd className="mt-1">{event.weatherNote}</dd>
                  </div>
                </div>
              ) : null}
            </dl>
          </aside>

          <section className="rounded-[1.8rem] border border-primary/10 bg-white/80 p-6 shadow-[0_18px_60px_rgba(39,59,42,0.08)]">
            <h2 className="font-heading text-3xl text-foreground">Event details</h2>
            {event.details?.length ? (
              <ul className="mt-5 space-y-3 text-base leading-8 text-foreground/74">
                {event.details.map((detail) => (
                  <li key={detail} className="flex gap-3">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/65" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 text-base leading-8 text-foreground/74">
                Meeting details will be added here when they are confirmed.
              </p>
            )}

            {event.accessibilityNotes ? (
              <div className="mt-8 rounded-[1.4rem] border border-primary/10 bg-[#F7F4E8] p-5">
                <h3 className="font-heading text-2xl text-foreground">
                  Accessibility
                </h3>
                <p className="mt-3 text-base leading-7 text-foreground/72">
                  {event.accessibilityNotes}
                </p>
              </div>
            ) : null}
          </section>
        </div>
      </Container>

      {otherUpcoming.length ? (
        <SectionShell
          eyebrow="More chapter events"
          title="More coming up with the Live Oak Chapter"
          intro="Keep going with the next local dates on the chapter calendar."
        >
          <div className="grid gap-4 md:grid-cols-2">
            {otherUpcoming.map((item) => (
              <article
                key={item.slug}
                className="rounded-[1.6rem] border border-primary/10 bg-white/78 p-5 shadow-[0_18px_60px_rgba(39,59,42,0.08)]"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/72">
                  {item.type}
                </p>
                <h3 className="mt-3 font-heading text-2xl leading-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-foreground/72">
                  {item.summary}
                </p>
                <SmartLink
                  href={`/events/${item.slug}`}
                  className="mt-4 inline-flex text-sm font-semibold text-primary"
                >
                  View event details
                </SmartLink>
              </article>
            ))}
          </div>
        </SectionShell>
      ) : null}
    </>
  );
}
