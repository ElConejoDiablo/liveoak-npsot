import Image from "next/image";

import type { ChapterEventItem } from "@/data/events";
import { publicImagery } from "@/data/public-imagery";
import { formatDateRange } from "@/lib/format";
import { cn } from "@/lib/utils";

import { SmartLink } from "@/components/shared/smart-link";
import { buttonVariants } from "@/components/ui/button-styles";

type NextChapterMeetingHeroProps = {
  event?: ChapterEventItem;
};

export function NextChapterMeetingHero({
  event,
}: NextChapterMeetingHeroProps) {
  const visual = publicImagery.learning;

  return (
    <section className="relative overflow-hidden border-b border-primary/10 bg-[#F5F0E1] py-14 sm:py-18 lg:py-22">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(194,169,76,0.22),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(88,128,81,0.16),transparent_38%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-center lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary/74">
            Next chapter meeting
          </p>

          {event ? (
            <>
              <h1 className="mt-5 font-heading text-4xl leading-tight text-foreground sm:text-5xl lg:text-[3.9rem]">
                {event.title}
              </h1>
              <p className="mt-5 text-lg leading-8 text-foreground/74 sm:text-xl sm:leading-9">
                {formatDateRange(event.startDateTime, event.endDateTime)}
                <span className="block">{event.locationName}</span>
                <span className="block">
                  {event.city}
                  {event.county ? ` · ${event.county}` : ""}
                </span>
              </p>
              <p className="mt-4 text-base font-semibold uppercase tracking-[0.18em] text-primary/74">
                {event.speakerName ? `Speaker: ${event.speakerName}` : "Speaker: TBD"}
              </p>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-foreground/74">
                {event.summary}
              </p>
            </>
          ) : (
            <>
              <h1 className="mt-5 font-heading text-4xl leading-tight text-foreground sm:text-5xl lg:text-[3.9rem]">
                Next chapter meeting details coming soon
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-foreground/74">
                The next meeting will appear here with its date, time, location, and
                speaker details as soon as it is posted.
              </p>
            </>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <SmartLink
              href="/events/upcoming"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "h-12 rounded-full px-6",
              )}
            >
              View upcoming events
            </SmartLink>
            <SmartLink
              href="/events/calendar"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 rounded-full border-primary/14 bg-white/84 px-6",
              )}
            >
              Open calendar
            </SmartLink>
            <SmartLink
              href="/events/past"
              className={cn(
                buttonVariants({ variant: "ghost", size: "lg" }),
                "h-12 rounded-full px-5 text-primary",
              )}
            >
              Past events
            </SmartLink>
          </div>
        </div>

        <div className="min-w-0">
          <div className="relative overflow-hidden rounded-[2.4rem] border border-primary/12 bg-white/84 shadow-[0_24px_90px_rgba(37,58,40,0.1)]">
            <div className="relative aspect-[6/5]">
              <Image
                src={visual.src}
                alt={visual.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
            </div>
            <div className="border-t border-primary/10 bg-white/90 px-6 py-5">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/72">
                Live Oak Chapter
              </p>
              <p className="mt-2 text-base leading-7 text-foreground/72">
                Meetings, field walks, and plant-focused gatherings for Fayette,
                Colorado, and Lavaca Counties.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
