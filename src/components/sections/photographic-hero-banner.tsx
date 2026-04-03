import { ArrowRight, MapPin } from "lucide-react";

import { buttonVariants } from "@/components/ui/button-styles";
import { Container } from "@/components/shared/container";
import { MotionReveal } from "@/components/shared/motion-reveal";
import { SmartLink } from "@/components/shared/smart-link";
import { publicImagery, type PublicImageryKey } from "@/data/public-imagery";
import { cn } from "@/lib/utils";

type HeroAction = {
  href: string;
  label: string;
  variant?: "primary" | "secondary" | "ghost";
};

type PhotographicHeroBannerProps = {
  variant: PublicImageryKey;
  title: string;
  description: string;
  serviceArea?: string;
  meta?: React.ReactNode;
  actions?: HeroAction[];
  className?: string;
  minHeightClassName?: string;
  imageClassName?: string;
  overlayClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  priority?: boolean;
  children?: React.ReactNode;
};

export function PhotographicHeroBanner({
  variant,
  title,
  description,
  serviceArea,
  meta,
  actions = [],
  className,
  minHeightClassName = "min-h-[72svh] sm:min-h-[78svh] lg:min-h-[calc(100svh-5rem)]",
  imageClassName,
  overlayClassName,
  contentClassName,
  titleClassName,
  descriptionClassName,
  priority = true,
  children,
}: PhotographicHeroBannerProps) {
  const image = publicImagery[variant];
  const desktopWidth = image.width ?? 1600;
  const desktopHeight = image.height ?? 1280;

  return (
    <section
      className={cn(
        "relative isolate overflow-hidden border-b border-primary/10 bg-[#1f2a20] text-white",
        className,
      )}
    >
      <picture className="absolute inset-0 block h-full w-full">
        {image.mobileSrc ? (
          <source media="(max-width: 767px)" srcSet={image.mobileSrc} />
        ) : null}
        <img
          src={image.src}
          alt={image.alt}
          width={desktopWidth}
          height={desktopHeight}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          className={cn("h-full w-full object-cover", imageClassName)}
        />
      </picture>
      <div
        className={cn(
          "absolute inset-0 bg-[linear-gradient(180deg,rgba(18,25,19,0.22),rgba(18,25,19,0.46)_28%,rgba(18,25,19,0.7)_58%,rgba(18,25,19,0.9)_100%)] lg:bg-[linear-gradient(90deg,rgba(18,25,19,0.82)_0%,rgba(18,25,19,0.76)_36%,rgba(18,25,19,0.56)_58%,rgba(18,25,19,0.24)_78%,rgba(18,25,19,0.18)_100%),linear-gradient(180deg,rgba(18,25,19,0.24),rgba(18,25,19,0.12)_28%,rgba(18,25,19,0.5)_80%,rgba(18,25,19,0.82)_100%)]",
          overlayClassName,
        )}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(198,177,112,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(245,233,198,0.08),transparent_24%)]" />

      <Container
        className={cn(
          "relative flex items-end py-10 sm:py-14 lg:py-16",
          minHeightClassName,
        )}
      >
        <MotionReveal className={cn("w-full max-w-3xl", contentClassName)}>
          <h1
            className={cn(
              "max-w-3xl font-heading text-[clamp(3rem,8vw,6.3rem)] leading-[0.94] text-white",
              titleClassName,
            )}
          >
            {title}
          </h1>
          {meta ? <div className="mt-5 max-w-2xl">{meta}</div> : null}
          <p
            className={cn(
              "mt-5 max-w-2xl text-lg leading-8 text-white/82 sm:text-xl sm:leading-9",
              descriptionClassName,
            )}
          >
            {description}
          </p>
          {serviceArea ? (
            <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white/84 sm:text-base">
              <MapPin className="h-4 w-4 shrink-0 text-[#E8D8A5]" />
              <span>{serviceArea}</span>
            </div>
          ) : null}
          {actions.length ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {actions.map((action) => (
                <SmartLink
                  key={action.href}
                  href={action.href}
                  className={cn(
                    buttonVariants({ variant: "default", size: "lg" }),
                    "h-auto rounded-full border border-white/20 px-5 py-3 text-sm shadow-[0_12px_30px_rgba(0,0,0,0.18)]",
                    action.variant === "secondary" &&
                      "bg-white/14 text-white backdrop-blur-sm hover:bg-white/20",
                    action.variant === "ghost" &&
                      "border-transparent bg-transparent px-3 text-white/92 shadow-none hover:bg-white/10",
                  )}
                >
                  <span>{action.label}</span>
                  <ArrowRight className="ml-1 h-4 w-4" />
                </SmartLink>
              ))}
            </div>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </MotionReveal>
      </Container>
    </section>
  );
}
