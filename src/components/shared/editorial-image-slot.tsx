import {
  publicImagery,
  type PublicImageryKey,
} from "@/data/public-imagery";
import { cn } from "@/lib/utils";

type EditorialImageSlotProps = {
  variant: PublicImageryKey;
  title: string;
  note: string;
  compact?: boolean;
  priority?: boolean;
  showText?: boolean;
  className?: string;
};

export function EditorialImageSlot({
  variant,
  title,
  note,
  compact = false,
  priority = false,
  showText = true,
  className,
}: EditorialImageSlotProps) {
  const image = publicImagery[variant];
  const desktopWidth = image.width ?? 1600;
  const desktopHeight = image.height ?? 1280;
  const objectPosition = compact
    ? image.compactObjectPosition ?? image.supportObjectPosition
    : image.supportObjectPosition;
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-primary/10 bg-[#efe8d8] shadow-[0_30px_80px_rgba(43,62,36,0.18)]",
        compact ? "aspect-[4/3]" : "aspect-[5/4]",
        className,
      )}
    >
      <picture className="absolute inset-0 block h-full w-full">
        {image.mobileSrc ? (
          <source
            media="(max-width: 767px)"
            srcSet={image.mobileSrc}
          />
        ) : null}
        <img
          src={image.src}
          alt={image.alt}
          width={desktopWidth}
          height={desktopHeight}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          className="h-full w-full object-cover"
          style={objectPosition ? { objectPosition } : undefined}
        />
      </picture>
      <div
        className={cn(
          "absolute inset-0",
          showText
            ? "bg-[linear-gradient(180deg,rgba(20,30,22,0.14),rgba(20,30,22,0.62)_66%,rgba(20,30,22,0.82))]"
            : "bg-[linear-gradient(180deg,rgba(255,255,255,0.01),rgba(20,30,22,0.04)_62%,rgba(20,30,22,0.12))]",
        )}
      />
      {showText ? (
        <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
          <p
            className={cn(
              "font-heading leading-tight",
              compact ? "text-[1.7rem]" : "text-3xl sm:text-[2.6rem]",
            )}
          >
            {title}
          </p>
          <p
            className={cn(
              "mt-2 max-w-xl leading-6 text-white/84",
              compact ? "text-sm" : "text-sm sm:text-base",
            )}
          >
            {note}
          </p>
        </div>
      ) : null}
    </div>
  );
}
