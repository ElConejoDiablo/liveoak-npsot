"use client";

import { useMemo, useState } from "react";
import {
  addMonths,
  addWeeks,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isWithinInterval,
  parseISO,
  startOfMonth,
  startOfWeek,
  subMonths,
  subWeeks,
} from "date-fns";
import { CalendarDays, ChevronLeft, ChevronRight, Filter } from "lucide-react";

import type { EventSourceFilter, EventType, UpcomingEventItem } from "@/data/events";
import {
  eventSourceFilters,
  getEventLink,
} from "@/data/events";
import { formatTime, getChapterDayKey } from "@/lib/format";
import { cn } from "@/lib/utils";

import { EventLabels } from "@/components/events/event-labels";
import { EventListCard } from "@/components/events/event-list-card";
import { SmartLink } from "@/components/shared/smart-link";

type EventsCalendarBrowserProps = {
  events: UpcomingEventItem[];
};

type ViewMode = "month" | "week";

const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function EventsCalendarBrowser({
  events,
}: EventsCalendarBrowserProps) {
  const initialAnchorDate = events[0]
    ? parseISO(events[0].startDateTime)
    : new Date();

  const [viewMode, setViewMode] = useState<ViewMode>("month");
  const [anchorDate, setAnchorDate] = useState(initialAnchorDate);
  const [sourceFilter, setSourceFilter] =
    useState<EventSourceFilter>("All sources");
  const [typeFilter, setTypeFilter] = useState<EventType | "All event types">(
    "All event types",
  );

  const eventTypes = useMemo(
    () => Array.from(new Set(events.map((event) => event.type))),
    [events],
  );

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSource =
        sourceFilter === "All sources" ||
        (sourceFilter === "Chapter" && event.source.kind === "chapter") ||
        (sourceFilter === "Statewide" && event.source.kind === "statewide");

      const matchesType =
        typeFilter === "All event types" || event.type === typeFilter;

      return matchesSource && matchesType;
    });
  }, [events, sourceFilter, typeFilter]);

  const period = useMemo(() => {
    if (viewMode === "month") {
      const monthStart = startOfMonth(anchorDate);
      const monthEnd = endOfMonth(anchorDate);

      return {
        label: format(anchorDate, "MMMM yyyy"),
        displayStart: startOfWeek(monthStart),
        displayEnd: endOfWeek(monthEnd),
        windowStart: monthStart,
        windowEnd: monthEnd,
      };
    }

    const weekStart = startOfWeek(anchorDate);
    const weekEnd = endOfWeek(anchorDate);

    return {
      label: `${format(weekStart, "MMM d")} to ${format(weekEnd, "MMM d, yyyy")}`,
      displayStart: weekStart,
      displayEnd: weekEnd,
      windowStart: weekStart,
      windowEnd: weekEnd,
    };
  }, [anchorDate, viewMode]);

  const days = useMemo(
    () =>
      eachDayOfInterval({
        start: period.displayStart,
        end: period.displayEnd,
      }),
    [period.displayEnd, period.displayStart],
  );

  const eventsByDay = useMemo(() => {
    const grouped = new Map<string, UpcomingEventItem[]>();

    filteredEvents.forEach((event) => {
      const key = getChapterDayKey(event.startDateTime);
      const current = grouped.get(key) ?? [];
      current.push(event);
      grouped.set(key, current);
    });

    return grouped;
  }, [filteredEvents]);

  const visibleEvents = useMemo(() => {
    return filteredEvents.filter((event) =>
      isWithinInterval(new Date(event.startDateTime), {
        start: period.windowStart,
        end: period.windowEnd,
      }),
    );
  }, [filteredEvents, period.windowEnd, period.windowStart]);

  function moveBackward() {
    setAnchorDate((current) =>
      viewMode === "month" ? subMonths(current, 1) : subWeeks(current, 1),
    );
  }

  function moveForward() {
    setAnchorDate((current) =>
      viewMode === "month" ? addMonths(current, 1) : addWeeks(current, 1),
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[1.9rem] border border-primary/10 bg-[#F5F0E1] p-5 shadow-[0_18px_60px_rgba(39,59,42,0.08)] sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary/72">
              <Filter className="h-4 w-4" />
              Calendar controls
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setViewMode("month")}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                  viewMode === "month"
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-primary/12 bg-white/86 text-foreground/72",
                )}
              >
                Month
              </button>
              <button
                type="button"
                onClick={() => setViewMode("week")}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                  viewMode === "week"
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-primary/12 bg-white/86 text-foreground/72",
                )}
              >
                Week
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[220px_220px]">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-foreground/74">
                Event source
              </span>
              <select
                value={sourceFilter}
                onChange={(event) =>
                  setSourceFilter(event.target.value as EventSourceFilter)
                }
                className="h-12 w-full rounded-full border border-primary/12 bg-white px-4 text-sm text-foreground shadow-sm"
              >
                {eventSourceFilters.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-foreground/74">
                Event type
              </span>
              <select
                value={typeFilter}
                onChange={(event) =>
                  setTypeFilter(event.target.value as EventType | "All event types")
                }
                className="h-12 w-full rounded-full border border-primary/12 bg-white px-4 text-sm text-foreground shadow-sm"
              >
                <option>All event types</option>
                {eventTypes.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-primary/10 bg-white/84 p-5 shadow-[0_20px_80px_rgba(37,58,40,0.08)] sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CalendarDays className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/72">
                In view
              </p>
              <h3 className="font-heading text-3xl text-foreground">
                {period.label}
              </h3>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={moveBackward}
              className="inline-flex items-center gap-2 rounded-full border border-primary/12 bg-[#F5F0E1] px-4 py-2 text-sm font-semibold text-foreground/76"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>
            <button
              type="button"
              onClick={moveForward}
              className="inline-flex items-center gap-2 rounded-full border border-primary/12 bg-[#F5F0E1] px-4 py-2 text-sm font-semibold text-foreground/76"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <div className="min-w-[760px] overflow-hidden rounded-[1.6rem] border border-primary/10 bg-[#F7F4E8]">
            <div className="grid grid-cols-7 border-b border-primary/8">
              {weekdayLabels.map((label) => (
                <div
                  key={label}
                  className="px-3 py-3 text-center text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-primary/66"
                >
                  {label}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7">
              {days.map((day) => {
                const dayKey = format(day, "yyyy-MM-dd");
                const dayEvents = eventsByDay.get(dayKey) ?? [];

                return (
                  <div
                    key={day.toISOString()}
                    className={cn(
                      "min-h-36 border-r border-b border-primary/8 p-3 align-top last:border-r-0",
                      !isSameMonth(day, anchorDate) &&
                        viewMode === "month" &&
                        "bg-primary/[0.03]",
                      isSameDay(day, new Date()) && "bg-primary/6",
                      viewMode === "week" && "min-h-44",
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={cn(
                          "inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold",
                          dayEvents.length
                            ? "bg-primary text-primary-foreground"
                            : "text-foreground/70",
                        )}
                      >
                        {format(day, "d")}
                      </span>
                      {dayEvents.length ? (
                        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-primary/70">
                          {dayEvents.length} event{dayEvents.length === 1 ? "" : "s"}
                        </span>
                      ) : null}
                    </div>

                    <div className="mt-3 space-y-2">
                      {dayEvents
                        .slice(0, viewMode === "month" ? 2 : dayEvents.length)
                        .map((event) => (
                          <SmartLink
                            key={event.id}
                            href={getEventLink(event)}
                            className="block rounded-[1.1rem] border border-primary/10 bg-white/88 p-3 text-xs leading-5 text-foreground/74 transition-colors hover:border-primary/25 hover:bg-white"
                          >
                            <EventLabels labels={[event.source.kind === "chapter" ? "Chapter" : "Statewide", event.type]} />
                            <p className="mt-2 font-semibold text-foreground">
                              {event.title}
                            </p>
                            <p className="mt-1 text-foreground/62">
                              {formatTime(event.startDateTime)}
                            </p>
                          </SmartLink>
                        ))}

                      {viewMode === "month" && dayEvents.length > 2 ? (
                        <div className="rounded-[1rem] border border-dashed border-primary/18 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary/70">
                          +{dayEvents.length - 2} more
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/72">
              Agenda view
            </p>
            <h3 className="font-heading text-3xl text-foreground">
              Events in this {viewMode}
            </h3>
          </div>
          <p className="text-sm leading-7 text-foreground/68">
            {visibleEvents.length} event{visibleEvents.length === 1 ? "" : "s"} in
            the current view
          </p>
        </div>

        {visibleEvents.length ? (
          <div className="space-y-4">
            {visibleEvents.map((event) => (
              <EventListCard key={event.id} event={event} compact />
            ))}
          </div>
        ) : (
          <div className="rounded-[1.8rem] border border-dashed border-primary/20 bg-[#F7F4E8] p-6">
            <h3 className="font-heading text-2xl text-foreground">
              No events in this view
            </h3>
            <p className="mt-3 text-base leading-7 text-foreground/72">
              Move to another week or month, or widen the filters to see more
              upcoming dates.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
