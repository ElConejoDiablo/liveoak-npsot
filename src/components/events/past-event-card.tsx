import Image from "next/image";
import { CalendarDays, Lock, MapPin, Mic, PlayCircle } from "lucide-react";

import type { PastEventItem } from "@/data/events";
import { publicImagery } from "@/data/public-imagery";
import { formatDateRange } from "@/lib/format";

import { SmartLink } from "@/components/shared/smart-link";

type PastEventCardProps = {
  event: PastEventItem;
};

export function PastEventCard({ event }: PastEventCardProps) {
  const image = publicImagery[event.image];

  return (
    <article className="overflow-hidden rounded-[2rem] border border-primary/10 bg-white/84 shadow-[0_22px_80px_rgba(37,58,40,0.08)]">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        <div className="relative min-h-[18rem] overflow-hidden bg-[#E8E1C7]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover"
          />
        </div>

        <div className="p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/72">
            {event.sourceLabel}
          </p>
          <h3 className="mt-3 font-heading text-3xl leading-tight text-foreground">
            {event.title}
          </h3>
          <p className="mt-4 text-base leading-7 text-foreground/74">
            {event.summary}
          </p>
          <p className="mt-4 text-sm leading-7 text-foreground/68">
            {event.description}
          </p>

          <dl className="mt-6 grid gap-3 text-sm text-foreground/74 sm:grid-cols-2">
            <div className="flex gap-2.5">
              <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <dd>{formatDateRange(event.startDateTime, event.endDateTime)}</dd>
            </div>
            <div className="flex gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <dd>
                {event.locationName}
                <span className="block text-xs uppercase tracking-[0.16em] text-foreground/56">
                  {event.city} · {event.county}
                </span>
              </dd>
            </div>
            {event.speakerName ? (
              <div className="flex gap-2.5 sm:col-span-2">
                <Mic className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <dd>Speaker: {event.speakerName}</dd>
              </div>
            ) : null}
          </dl>

          {event.recapUrl || event.youtubeUrl || event.supplementalLinks?.length ? (
            <div className="mt-6 space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/72">
                Recap and materials
              </p>
              <div className="flex flex-wrap gap-3">
                {event.recapUrl ? (
                  <SmartLink
                    href={event.recapUrl}
                    className="inline-flex items-center gap-2 rounded-full border border-primary/12 bg-[#F5F0E1] px-4 py-2 text-sm font-semibold text-foreground/76"
                  >
                    Read recap
                  </SmartLink>
                ) : null}
                {event.youtubeUrl ? (
                  <SmartLink
                    href={event.youtubeUrl}
                    className="inline-flex items-center gap-2 rounded-full border border-primary/12 bg-[#F5F0E1] px-4 py-2 text-sm font-semibold text-foreground/76"
                  >
                    <PlayCircle className="h-4 w-4 text-primary" />
                    Watch recording
                  </SmartLink>
                ) : null}
                {event.supplementalLinks?.map((link) => (
                  <SmartLink
                    key={link.href}
                    href={link.href}
                    className="inline-flex items-center gap-2 rounded-full border border-primary/12 bg-white px-4 py-2 text-sm font-semibold text-foreground/76"
                  >
                    {link.label}
                  </SmartLink>
                ))}
              </div>
            </div>
          ) : null}

          {event.meetingMinutes ? (
            <div className="mt-6 rounded-[1.4rem] border border-primary/10 bg-[#F7F4E8] p-4">
              <div className="flex items-start gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Lock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/72">
                    {event.meetingMinutes.status}
                  </p>
                  <h4 className="mt-2 text-lg font-semibold text-foreground">
                    {event.meetingMinutes.label}
                  </h4>
                  <p className="mt-2 text-sm leading-6 text-foreground/68">
                    Approved meeting minutes stay inside the members portal.
                  </p>
                  <SmartLink
                    href={event.meetingMinutes.href}
                    className="mt-3 inline-flex text-sm font-semibold text-primary"
                  >
                    Member sign in
                  </SmartLink>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
