import Image from "next/image";

import type { CoverTheme } from "@/lib/blog";
import { publicImagery } from "@/data/public-imagery";
import { cn } from "@/lib/utils";

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
  const image = publicImagery[variant];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.75rem] border border-primary/10",
        compact ? "aspect-[4/3]" : "aspect-[16/9]",
        className,
      )}
    >
      <Image
        src={image.src}
        alt={coverNote ?? image.alt}
        fill
        sizes={compact ? "(max-width: 1024px) 100vw, 32vw" : "(max-width: 1024px) 100vw, 66vw"}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,29,20,0.12),rgba(17,29,20,0.56)_64%,rgba(17,29,20,0.74))]" />
      {!compact && counties.length ? (
        <div className="absolute left-4 top-4 inline-flex max-w-[80%] flex-wrap items-center gap-2 sm:left-5 sm:top-5">
          <span className="rounded-full border border-white/15 bg-[rgba(255,255,255,0.14)] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/84">
            {counties.join(" • ")}
          </span>
        </div>
      ) : null}
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
      </div>
    </div>
  );
}
