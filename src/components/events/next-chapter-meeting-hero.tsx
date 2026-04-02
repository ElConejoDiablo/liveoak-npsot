import { MapPin } from "lucide-react";

import { PhotographicHeroBanner } from "@/components/sections/photographic-hero-banner";
import type { ChapterEventItem } from "@/data/events";
import { formatDateRange } from "@/lib/format";

type NextChapterMeetingHeroProps = {
  event?: ChapterEventItem;
};

export function NextChapterMeetingHero({
  event,
}: NextChapterMeetingHeroProps) {
  if (!event) {
    return (
      <PhotographicHeroBanner
        variant="learning"
        title="Next chapter meeting details coming soon"
        description="The next meeting will appear here with its date, time, location, and speaker details as soon as it is posted."
        actions={[
          { href: "/events/upcoming", label: "View upcoming events" },
          { href: "/events/calendar", label: "Open calendar", variant: "secondary" },
          { href: "/events/past", label: "Past events", variant: "ghost" },
        ]}
      />
    );
  }

  const locationLine = [event.locationName, event.city].filter(Boolean).join(" · ");
  const countyLine = event.county ? `${event.county}` : undefined;

  return (
    <PhotographicHeroBanner
      variant="learning"
      title={event.title}
      description={event.summary}
      meta={
        <div className="space-y-3 text-white">
          <p className="text-lg font-medium leading-8 text-white/88 sm:text-xl sm:leading-9">
            {formatDateRange(event.startDateTime, event.endDateTime)}
          </p>
          <div className="space-y-1 text-base leading-7 text-white/78 sm:text-lg sm:leading-8">
            <p className="flex items-start gap-2">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#E8D8A5]" />
              <span>{locationLine}</span>
            </p>
            {countyLine ? <p className="pl-6">{countyLine}</p> : null}
          </div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#E8D8A5]">
            {event.speakerName ? `Speaker: ${event.speakerName}` : "Speaker: TBD"}
          </p>
        </div>
      }
      actions={[
        { href: "/events/upcoming", label: "View upcoming events" },
        { href: "/events/calendar", label: "Open calendar", variant: "secondary" },
        { href: "/events/past", label: "Past events", variant: "ghost" },
      ]}
    />
  );
}
