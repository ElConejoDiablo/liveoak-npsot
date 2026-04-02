import { ArrowRight, CalendarDays, Clock3, MapPin } from "lucide-react";

import type { EventItem } from "@/data/events";
import { formatDay, formatFullDate, formatMonth, formatTimeRange } from "@/lib/format";
import { SmartLink } from "@/components/shared/smart-link";

type EventCardProps = {
  event: EventItem;
  showLink?: boolean;
};

export function EventCard({ event, showLink = true }: EventCardProps) {
  return (
    <article className="grid gap-5 rounded-[1.75rem] border border-primary/10 bg-white/78 p-5 shadow-[0_18px_60px_rgba(37,58,40,0.08)] sm:grid-cols-[86px_minmax(0,1fr)] sm:p-6">
      <div className="flex h-fit flex-row items-center gap-3 rounded-[1.2rem] border border-primary/10 bg-[#F5F0E1] px-4 py-3 text-primary sm:flex-col sm:items-center sm:justify-center">
        <span className="text-sm font-semibold uppercase tracking-[0.22em]">
          {formatMonth(event.startDateTime)}
        </span>
        <span className="font-heading text-4xl leading-none">
          {formatDay(event.startDateTime)}
        </span>
      </div>
      <div>
        <p className="mb-3 text-sm font-semibold text-primary/78">{event.type}</p>
        <h3 className="font-heading text-2xl leading-tight text-foreground">
          {event.title}
        </h3>
        <p className="mt-3 text-base leading-7 text-foreground/74">
          {event.description}
        </p>
        <dl className="mt-5 grid gap-3 text-sm text-foreground/76 sm:grid-cols-3">
          <div className="flex gap-2">
            <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div>
              <dt className="sr-only">Date</dt>
              <dd>{formatFullDate(event.startDateTime)}</dd>
            </div>
          </div>
          <div className="flex gap-2">
            <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div>
              <dt className="sr-only">Time</dt>
              <dd>{formatTimeRange(event.startDateTime, event.endDateTime)}</dd>
            </div>
          </div>
          <div className="flex gap-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div>
              <dt className="sr-only">Location</dt>
              <dd>
                {event.locationName}
                <span className="block text-xs uppercase tracking-[0.16em] text-foreground/55">
                  {event.city} · {event.county}
                </span>
              </dd>
            </div>
          </div>
        </dl>
        <div className="mt-4 grid gap-3 text-sm text-foreground/72 sm:grid-cols-2">
          <div>
            <p className="font-semibold text-foreground">Who it’s for</p>
            <p className="mt-1 leading-7">{event.audience}</p>
          </div>
          {event.attendanceNote ? (
            <div>
              <p className="font-semibold text-foreground">Attendance note</p>
              <p className="mt-1 leading-7">{event.attendanceNote}</p>
            </div>
          ) : null}
        </div>
        <ul className="mt-5 space-y-2 text-sm leading-7 text-foreground/72">
          {event.details.map((detail) => (
            <li key={detail} className="flex gap-2">
              <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/65" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
        {showLink ? (
          <SmartLink
            href={`/events/${event.slug}`}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            <span>View event details</span>
            <ArrowRight className="h-4 w-4" />
          </SmartLink>
        ) : null}
      </div>
    </article>
  );
}
