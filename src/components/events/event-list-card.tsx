import { ArrowRight, CalendarDays, Clock3, MapPin, Mic } from "lucide-react";

import type { UpcomingEventItem } from "@/data/events";
import {
  getEventActionLabel,
  getEventBadges,
  getEventLink,
} from "@/data/events";
import { formatFullDate, formatTimeRange } from "@/lib/format";
import { cn } from "@/lib/utils";

import { SmartLink } from "@/components/shared/smart-link";
import { EventLabels } from "@/components/events/event-labels";

type EventListCardProps = {
  event: UpcomingEventItem;
  compact?: boolean;
};

export function EventListCard({
  event,
  compact = false,
}: EventListCardProps) {
  const link = getEventLink(event);
  const actionLabel = getEventActionLabel(event);

  return (
    <article
      className={cn(
        "rounded-[1.8rem] border border-primary/10 bg-white/82 shadow-[0_18px_60px_rgba(37,58,40,0.08)]",
        compact ? "p-5" : "p-6 sm:p-7",
      )}
    >
      <EventLabels labels={getEventBadges(event)} />

      <div className={cn(compact ? "mt-4" : "mt-5")}>
        <h3
          className={cn(
            "font-heading leading-tight text-foreground",
            compact ? "text-2xl" : "text-[2rem]",
          )}
        >
          {event.title}
        </h3>
        <p className="mt-3 text-base leading-7 text-foreground/74">
          {event.summary}
        </p>
      </div>

      <dl
        className={cn(
          "mt-5 grid gap-3 text-sm text-foreground/74",
          compact ? "sm:grid-cols-1" : "sm:grid-cols-3",
        )}
      >
        <div className="flex gap-2.5">
          <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <div>
            <dt className="sr-only">Date</dt>
            <dd>{formatFullDate(event.startDateTime)}</dd>
          </div>
        </div>
        <div className="flex gap-2.5">
          <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <div>
            <dt className="sr-only">Time</dt>
            <dd>{event.timeLabel ?? formatTimeRange(event.startDateTime, event.endDateTime)}</dd>
          </div>
        </div>
        <div className="flex gap-2.5">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <div>
            <dt className="sr-only">Location</dt>
            <dd>
              {event.locationLabel ?? event.locationName}
              {event.city || event.county ? (
                <span className="block text-xs uppercase tracking-[0.16em] text-foreground/56">
                  {[event.city, event.county].filter(Boolean).join(" · ")}
                </span>
              ) : null}
            </dd>
          </div>
        </div>
      </dl>

      <div className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div className="space-y-3 text-sm leading-7 text-foreground/72">
          {event.speakerName || event.speakerLabel ? (
            <p className="flex gap-2.5">
              <Mic className="mt-1 h-4 w-4 shrink-0 text-primary" />
              <span>
                {event.speakerLabel ?? (
                  <>
                    <span className="font-semibold text-foreground">Speaker:</span>{" "}
                    {event.speakerName}
                  </>
                )}
              </span>
            </p>
          ) : null}
          <p>
            <span className="font-semibold text-foreground">Source:</span>{" "}
            {event.source.label}
          </p>
          {"audience" in event && event.audience ? (
            <p>
              <span className="font-semibold text-foreground">Good fit for:</span>{" "}
              {event.audience}
            </p>
          ) : null}
        </div>

        <SmartLink
          href={link}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
        >
          <span>{actionLabel}</span>
          <ArrowRight className="h-4 w-4" />
        </SmartLink>
      </div>
    </article>
  );
}
