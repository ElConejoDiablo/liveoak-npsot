import type { CoverTheme } from "@/lib/blog";
import { cn } from "@/lib/utils";

import { PlantIllustration } from "@/components/shared/plant-illustration";

type ArticleCoverProps = {
  title: string;
  category: string;
  variant: CoverTheme;
  compact?: boolean;
  className?: string;
};

export function ArticleCover({
  title,
  category,
  variant,
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

