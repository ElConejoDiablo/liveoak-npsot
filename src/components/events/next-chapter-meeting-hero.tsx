import { MapPin } from "lucide-react";

import { PhotographicHeroBanner } from "@/components/sections/photographic-hero-banner";
import { SmartLink } from "@/components/shared/smart-link";
import type { ChapterEventItem } from "@/data/events";
import { formatMonthDay, formatTime } from "@/lib/format";

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
        title="Next Chapter Meeting Details Coming Soon"
        description="The next meeting will appear here with its date, time, location, and speaker details as soon as it is posted."
        actions={[
          { href: "/events/upcoming", label: "View upcoming events" },
          { href: "/events/calendar", label: "Open calendar", variant: "secondary" },
          { href: "/events/past", label: "Past events", variant: "ghost" },
        ]}
      />
    );
  }

  const dateLine = `${formatMonthDay(event.startDateTime)} at ${formatTime(event.startDateTime)}`;
  const addressLine = [event.locationAddress, event.city].filter(Boolean).join(", ");
  const locationLine = [event.locationName, addressLine].filter(Boolean).join(" — ");
  const mapQuery = encodeURIComponent(
    [event.locationAddress, event.city].filter(Boolean).join(", "),
  );
  const mapHref = mapQuery
    ? `https://www.google.com/maps/search/?api=1&query=${mapQuery}`
    : undefined;

  return (
    <PhotographicHeroBanner
      variant="eventsmeeting"
      title={event.title}
      description={event.summary}
      minHeightClassName="min-h-[58svh] sm:min-h-[64svh] lg:min-h-[calc(100svh-5rem)]"
      overlayClassName="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,25,19,0.26),rgba(18,25,19,0.58)_24%,rgba(18,25,19,0.82)_62%,rgba(18,25,19,0.94)_100%)] lg:bg-[linear-gradient(90deg,rgba(18,25,19,0.9)_0%,rgba(18,25,19,0.84)_34%,rgba(18,25,19,0.58)_58%,rgba(18,25,19,0.28)_80%,rgba(18,25,19,0.18)_100%),linear-gradient(180deg,rgba(18,25,19,0.18),rgba(18,25,19,0.12)_24%,rgba(18,25,19,0.58)_74%,rgba(18,25,19,0.88)_100%)]"
      titleClassName="max-w-[24rem] text-[clamp(2.75rem,7vw,5.2rem)]"
      descriptionClassName="max-w-[38rem] text-sm leading-6 text-white/84 sm:text-base sm:leading-7"
      contentClassName="max-w-[39rem]"
      meta={
        <div className="space-y-2 text-white">
          <p className="text-base font-medium leading-7 text-white/88 sm:text-lg sm:leading-8">
            {dateLine}
          </p>
          {locationLine ? (
            <div className="space-y-1.5">
              <p className="flex items-start gap-2 text-sm leading-6 text-white/80 sm:text-base sm:leading-7">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#E8D8A5]" />
                <span>{locationLine}</span>
              </p>
              {mapHref ? (
                <SmartLink
                  href={mapHref}
                  className="inline-flex items-center text-sm font-semibold text-[#E8D8A5] underline decoration-[#E8D8A5]/50 underline-offset-4 hover:text-white"
                >
                  View map
                </SmartLink>
              ) : null}
            </div>
          ) : null}
          <p className="text-sm font-semibold leading-6 text-white/86 sm:text-base sm:leading-7">
            {event.speakerName
              ? `Guest Speaker: ${event.speakerName}`
              : event.speakerLabel?.replace(/^Speaker:/, "Guest Speaker:")
                ?? "Guest Speaker: TBD"}
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
