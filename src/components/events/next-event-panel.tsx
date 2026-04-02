import { CalendarDays, MapPin } from "lucide-react";

import type { ChapterEventItem } from "@/data/events";
import { formatDateRange } from "@/lib/format";
import { SmartLink } from "@/components/shared/smart-link";

type NextEventPanelProps = {
  event?: ChapterEventItem;
};

export function NextEventPanel({ event }: NextEventPanelProps) {
  if (!event) {
    return (
      <section className="rounded-[1.8rem] border border-dashed border-primary/20 bg-[#F7F4E8] p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary/72">
          Next event
        </p>
        <h2 className="mt-3 font-heading text-2xl text-foreground">
          Next event details will appear here
        </h2>
        <p className="mt-3 text-base leading-7 text-foreground/72">
          When the next chapter event is posted, you will find the date,
          location, and details here.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-[1.8rem] border border-primary/10 bg-[#F5F0E1] p-6 shadow-[0_18px_60px_rgba(39,59,42,0.08)]">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary/72">
        Next event
      </p>
      <h2 className="mt-3 font-heading text-3xl leading-tight text-foreground">
        {event.title}
      </h2>
      <p className="mt-3 text-base leading-7 text-foreground/74">
        {event.summary}
      </p>
      <dl className="mt-5 space-y-3 text-sm text-foreground/72">
        <div className="flex gap-2">
          <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <dd>{formatDateRange(event.startDateTime, event.endDateTime)}</dd>
        </div>
        <div className="flex gap-2">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <dd>
            {event.locationName}, {event.city}
          </dd>
        </div>
      </dl>
      <SmartLink
        href={`/events/${event.slug}`}
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary"
      >
        View event details
      </SmartLink>
    </section>
  );
}
