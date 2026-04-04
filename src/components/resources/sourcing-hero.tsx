import { MapPin } from "lucide-react";

type SourcingHeroProps = {
  title: string;
  description: string;
  serviceArea?: string;
  desktopImageSrc?: string;
  mobileImageSrc?: string;
  imageAlt?: string;
};

export function SourcingHero({
  title,
  description,
  serviceArea,
  desktopImageSrc,
  mobileImageSrc,
  imageAlt = "",
}: SourcingHeroProps) {
  return (
    <section className="relative isolate overflow-hidden rounded-[2rem] border border-primary/10 bg-[#1f2a20] text-white shadow-[0_18px_60px_rgba(37,58,40,0.12)]">
      {desktopImageSrc ? (
        <picture className="absolute inset-0 block h-full w-full">
          {mobileImageSrc ? <source media="(max-width: 767px)" srcSet={mobileImageSrc} /> : null}
          <img src={desktopImageSrc} alt={imageAlt} className="h-full w-full object-cover" />
        </picture>
      ) : (
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(27,40,28,0.92),rgba(48,61,34,0.78)),radial-gradient(circle_at_top_right,rgba(229,214,160,0.18),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(239,223,170,0.12),transparent_24%)]" />
      )}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,25,19,0.22),rgba(18,25,19,0.44)_28%,rgba(18,25,19,0.78)_100%)]" />
      <div className="relative px-6 py-12 sm:px-8 sm:py-14 lg:px-12 lg:py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/76">
            Sourcing Native Plants
          </p>
          <h1 className="mt-4 font-heading text-5xl leading-tight text-white sm:text-6xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/82">{description}</p>
          {serviceArea ? (
            <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white/84 sm:text-base">
              <MapPin className="h-4 w-4 shrink-0 text-[#E8D8A5]" />
              <span>{serviceArea}</span>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
