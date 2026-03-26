import type { CoverTheme } from "@/lib/blog";
import { cn } from "@/lib/utils";

import { PlantIllustration } from "@/components/shared/plant-illustration";

type EditorialImageSlotProps = {
  variant: CoverTheme;
  title: string;
  note: string;
  compact?: boolean;
  className?: string;
};

export function EditorialImageSlot({
  variant,
  title,
  note,
  compact = false,
  className,
}: EditorialImageSlotProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-primary/10 bg-[#efe8d8] shadow-[0_30px_80px_rgba(43,62,36,0.18)]",
        compact ? "aspect-[4/3]" : "aspect-[5/4]",
        className,
      )}
    >
      <PlantIllustration
        variant={variant}
        className="h-full w-full rounded-none border-0 shadow-none"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,30,21,0.02),rgba(22,30,21,0.62))]" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
        <p
          className={cn(
            "font-heading leading-tight",
            compact ? "text-2xl" : "text-3xl sm:text-[2.6rem]",
          )}
        >
          {title}
        </p>
        <p className="mt-2 max-w-xl text-sm leading-6 text-white/84 sm:text-base">
          {note}
        </p>
      </div>
    </div>
  );
}
