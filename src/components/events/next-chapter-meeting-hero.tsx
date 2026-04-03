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
        variant="eventsmeeting"
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
  const locationMeta = [locationLine, event.county].filter(Boolean).join(" · ");

  return (
    <PhotographicHeroBanner
      variant="eventsmeeting"
      title={event.title}
      description={event.summary}
      descriptionClassName="hidden max-w-xl text-base leading-7 text-white/84 sm:block sm:text-lg sm:leading-8"
      contentClassName="max-w-[42rem]"
      meta={
        <div className="space-y-2.5 text-white">
          <p className="text-base font-medium leading-7 text-white/88 sm:text-xl sm:leading-9">
            {formatDateRange(event.startDateTime, event.endDateTime)}
          </p>
          {locationMeta ? (
            <p className="flex items-start gap-2 text-sm leading-6 text-white/78 sm:text-base sm:leading-7">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#E8D8A5]" />
              <span>{locationMeta}</span>
            </p>
          ) : null}
          <p className="pt-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#E8D8A5] sm:text-sm">
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
