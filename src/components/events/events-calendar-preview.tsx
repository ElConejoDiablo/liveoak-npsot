import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  parseISO,
  startOfMonth,
  startOfWeek,
} from "date-fns";

import type { UpcomingEventItem } from "@/data/events";
import { getChapterDayKey, formatDateRange } from "@/lib/format";
import { cn } from "@/lib/utils";

type EventsCalendarPreviewProps = {
  events: UpcomingEventItem[];
};

const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function EventsCalendarPreview({
  events,
}: EventsCalendarPreviewProps) {
  const anchorDate = events[0]
    ? parseISO(events[0].startDateTime)
    : new Date();
  const monthStart = startOfMonth(anchorDate);
  const monthEnd = endOfMonth(anchorDate);
  const gridStart = startOfWeek(monthStart);
  const gridEnd = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: gridStart, end: gridEnd });
  const highlightedDays = new Set(
    events.map((event) => getChapterDayKey(event.startDateTime)),
  );

  return (
    <div className="rounded-[2rem] border border-primary/10 bg-[#F5F0E1] p-6 shadow-[0_22px_80px_rgba(37,58,40,0.08)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/72">
            {format(anchorDate, "MMMM yyyy")}
          </p>
          <h3 className="mt-2 font-heading text-3xl text-foreground">
            Calendar preview
          </h3>
        </div>
        <p className="max-w-[15rem] text-sm leading-6 text-foreground/68">
          Dates with chapter or selected statewide events are highlighted.
        </p>
      </div>

      <div className="mt-6 overflow-hidden rounded-[1.5rem] border border-primary/10 bg-white/84">
        <div className="grid grid-cols-7 border-b border-primary/8">
          {weekdayLabels.map((label) => (
            <div
              key={label}
              className="px-2 py-3 text-center text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-primary/64"
            >
              {label}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7">
          {days.map((day) => {
            const dayKey = format(day, "yyyy-MM-dd");
            const isHighlighted = highlightedDays.has(dayKey);

            return (
              <div
                key={day.toISOString()}
                className={cn(
                  "flex min-h-16 items-start justify-end border-r border-b border-primary/8 px-2 py-2 text-sm last:border-r-0",
                  !isSameMonth(day, monthStart) && "bg-primary/[0.03] text-foreground/42",
                  isHighlighted && "bg-primary/10 text-primary",
                )}
              >
                <span
                  className={cn(
                    "inline-flex h-8 w-8 items-center justify-center rounded-full",
                    isHighlighted && "bg-primary text-primary-foreground",
                  )}
                >
                  {format(day, "d")}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {events.slice(0, 3).map((event) => (
          <div
            key={event.id}
            className="rounded-[1.3rem] border border-primary/10 bg-white/82 p-4"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/70">
              {event.source.kind === "chapter" ? "Chapter" : "Statewide"}
            </p>
            <h4 className="mt-2 font-heading text-xl text-foreground">
              {event.title}
            </h4>
            <p className="mt-2 text-sm leading-6 text-foreground/68">
              {formatDateRange(event.startDateTime, event.endDateTime)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
