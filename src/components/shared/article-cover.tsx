import type { CoverTheme } from "@/lib/blog";
import { cn } from "@/lib/utils";

import { PlantIllustration } from "@/components/shared/plant-illustration";

type ArticleCoverProps = {
  title: string;
  category: string;
  variant: CoverTheme;
  counties?: string[];
  coverNote?: string;
  compact?: boolean;
  className?: string;
};

export function ArticleCover({
  title,
  category,
  variant,
  counties = [],
  coverNote,
  compact = false,
  className,
}: ArticleCoverProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.75rem] border border-primary/10",
        compact ? "aspect-[4/3]" : "aspect-[16/9]",
        className,
      )}
    >
      <PlantIllustration
        variant={variant}
        className="absolute inset-0 h-full w-full rounded-none border-0 shadow-none"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,29,20,0.08),rgba(17,29,20,0.55))]" />
      <div className="absolute left-4 top-4 inline-flex max-w-[80%] flex-wrap items-center gap-2 sm:left-5 sm:top-5">
        <span className="rounded-full border border-white/20 bg-[rgba(245,240,232,0.84)] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-foreground/74 backdrop-blur-sm">
          Photo placeholder
        </span>
        {!compact && counties.length ? (
          <span className="rounded-full border border-white/15 bg-[rgba(255,255,255,0.14)] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/84">
            {counties.join(" • ")}
          </span>
        ) : null}
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
        <div className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/78">
          {category}
        </div>
        <div
          className={cn(
            "max-w-xl font-heading leading-tight",
            compact ? "text-xl" : "text-3xl sm:text-4xl",
          )}
        >
          {title}
        </div>
        {!compact && coverNote ? (
          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/84 sm:text-base">
            {coverNote}
          </p>
        ) : null}
      </div>
    </div>
  );
}
