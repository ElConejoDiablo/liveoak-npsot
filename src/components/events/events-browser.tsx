"use client";

import { useMemo, useState } from "react";
import { Filter } from "lucide-react";

import type { EventItem, EventType } from "@/data/events";
import { EventCard } from "@/components/cards/event-card";

type EventsBrowserProps = {
  events: EventItem[];
  eventTypes: EventType[];
};

export function EventsBrowser({ events, eventTypes }: EventsBrowserProps) {
  const [eventType, setEventType] = useState<EventType | "All event types">(
    "All event types",
  );

  const filteredEvents = useMemo(
    () =>
      events.filter(
        (event) => eventType === "All event types" || event.type === eventType,
      ),
    [eventType, events],
  );

  return (
    <div className="space-y-5">
      <div className="rounded-[1.7rem] border border-primary/10 bg-[#F5F0E1] p-5 shadow-[0_18px_60px_rgba(39,59,42,0.08)]">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary/72">
          <Filter className="h-4 w-4" />
          Filter events
        </div>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <label className="block max-w-sm">
            <span className="mb-2 block text-sm font-medium text-foreground/74">
              Event type
            </span>
            <select
              value={eventType}
              onChange={(event) =>
                setEventType(event.target.value as EventType | "All event types")
              }
              className="h-12 w-full rounded-full border border-primary/12 bg-white px-4 text-sm text-foreground shadow-sm"
            >
              <option>All event types</option>
              {eventTypes.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <p className="text-sm leading-7 text-foreground/66">
            {filteredEvents.length} upcoming event
            {filteredEvents.length === 1 ? "" : "s"} in view.
          </p>
        </div>
      </div>

      {filteredEvents.length ? (
        <div className="space-y-5">
          {filteredEvents.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
      ) : (
        <div className="rounded-[1.7rem] border border-dashed border-primary/20 bg-[#F7F4E8] p-6">
          <h3 className="font-heading text-2xl text-foreground">
            No upcoming events match that filter
          </h3>
          <p className="mt-3 text-base leading-7 text-foreground/72">
            Try another event type or return to all event listings to see the
            full upcoming calendar.
          </p>
        </div>
      )}
    </div>
  );
}
