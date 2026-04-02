"use client";

import { useMemo, useState } from "react";
import { Filter } from "lucide-react";

import type { EventSourceFilter, EventType, UpcomingEventItem } from "@/data/events";
import { eventSourceFilters } from "@/data/events";

import { EventListCard } from "@/components/events/event-list-card";

type UpcomingEventsBrowserProps = {
  events: UpcomingEventItem[];
  eventTypes: EventType[];
};

export function UpcomingEventsBrowser({
  events,
  eventTypes,
}: UpcomingEventsBrowserProps) {
  const [sourceFilter, setSourceFilter] =
    useState<EventSourceFilter>("All sources");
  const [typeFilter, setTypeFilter] = useState<EventType | "All event types">(
    "All event types",
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

  return (
    <div className="space-y-5">
      <div className="rounded-[1.8rem] border border-primary/10 bg-[#F5F0E1] p-5 shadow-[0_18px_60px_rgba(39,59,42,0.08)] sm:p-6">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary/72">
          <Filter className="h-4 w-4" />
          Filter events
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,220px)_minmax(0,220px)_1fr] lg:items-end">
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

          <p className="text-sm leading-7 text-foreground/68 lg:justify-self-end">
            {filteredEvents.length} event{filteredEvents.length === 1 ? "" : "s"} in
            view
          </p>
        </div>
      </div>

      {filteredEvents.length ? (
        <div className="space-y-5">
          {filteredEvents.map((event) => (
            <EventListCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="rounded-[1.8rem] border border-dashed border-primary/20 bg-[#F7F4E8] p-6">
          <h3 className="font-heading text-2xl text-foreground">
            No events match those filters
          </h3>
          <p className="mt-3 text-base leading-7 text-foreground/72">
            Try another source or event type to see the full upcoming calendar.
          </p>
        </div>
      )}
    </div>
  );
}
