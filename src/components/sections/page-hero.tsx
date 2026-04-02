import { ArrowRight, MapPin } from "lucide-react";

import { buttonVariants } from "@/components/ui/button-styles";
import { Container } from "@/components/shared/container";
import { EditorialImageSlot } from "@/components/shared/editorial-image-slot";
import { MotionReveal } from "@/components/shared/motion-reveal";
import { SmartLink } from "@/components/shared/smart-link";
import { cn } from "@/lib/utils";

type HeroAction = {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
};

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  serviceArea: string;
  variant?: "savanna" | "bluebonnet" | "pollinator" | "monarch" | "community";
  layout?: "feature" | "utility" | "compact";
  actions?: HeroAction[];
  highlights?: string[];
  highlightsTitle?: string;
  visualTitle?: string;
  visualNote?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  serviceArea,
  variant = "savanna",
  layout = "feature",
  actions = [],
  highlights = [],
  highlightsTitle = "On this page",
  visualTitle,
  visualNote,
}: PageHeroProps) {
  const showHighlights = highlights.length > 0;
  const imageTitle = visualTitle ?? serviceArea;
  const imageNote =
    visualNote ??
    "Native plants, local landscapes, and chapter gatherings across the Live Oak Chapter region.";

  const actionLinks = actions.length ? (
    <div className="mt-8 flex flex-wrap gap-3">
      {actions.map((action) => (
        <SmartLink
          key={action.href}
          href={action.href}
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "h-auto rounded-full px-5 py-3 text-sm",
            action.variant === "secondary" &&
              "border border-primary/15 bg-white/85 text-foreground hover:bg-white",
          )}
        >
          <span>{action.label}</span>
          <ArrowRight className="ml-1 h-4 w-4" />
        </SmartLink>
      ))}
    </div>
  ) : null;

  if (layout === "compact") {
    return (
      <section className="relative overflow-hidden border-b border-primary/10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.88),rgba(242,233,214,0.82)_45%,rgba(228,218,195,0.96)_100%)] py-12 sm:py-14">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(245,239,225,0.72),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(95,117,79,0.08),transparent_30%)]" />
        <Container className="relative">
          <MotionReveal className="max-w-4xl">
            <div className="mb-4 text-sm font-semibold uppercase tracking-[0.26em] text-primary/75">
              {eyebrow}
            </div>
            <h1 className="max-w-4xl font-heading text-4xl leading-tight text-foreground sm:text-5xl lg:text-[3.6rem]">
              {title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-foreground/76">
              {description}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground/72">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{serviceArea}</span>
            </div>
            {actionLinks}
            {showHighlights ? (
              <div className="mt-8 border-t border-primary/10 pt-5">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/68">
                  {highlightsTitle}
                </p>
                <ul className="mt-4 space-y-2">
                  {highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-2 text-sm leading-6 text-foreground/74"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/65" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </MotionReveal>
        </Container>
      </section>
    );
  }

  if (layout === "utility") {
    return (
      <section className="relative overflow-hidden border-b border-primary/10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.88),rgba(242,233,214,0.82)_45%,rgba(228,218,195,0.96)_100%)] py-14 sm:py-16">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(245,239,225,0.74),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(95,117,79,0.12),transparent_30%)]" />
        <Container className="relative">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.12fr)_minmax(280px,0.88fr)] lg:items-end">
            <MotionReveal className="max-w-3xl">
              <div className="mb-4 text-sm font-semibold uppercase tracking-[0.26em] text-primary/75">
                {eyebrow}
              </div>
              <h1 className="max-w-3xl font-heading text-4xl leading-tight text-foreground sm:text-5xl lg:text-[3.9rem]">
                {title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-foreground/76">
                {description}
              </p>
              {actionLinks}
            </MotionReveal>

            <MotionReveal delay={0.08}>
              <div className="border-t border-primary/12 pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                <div className="inline-flex items-center gap-2 text-sm font-medium text-foreground/72">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{serviceArea}</span>
                </div>
                {showHighlights ? (
                  <div className="mt-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/68">
                      {highlightsTitle}
                    </p>
                    <ul className="mt-4 space-y-3">
                      {highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="border-b border-primary/8 pb-3 text-base leading-7 text-foreground/74 last:border-b-0 last:pb-0"
                        >
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </MotionReveal>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden border-b border-primary/10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.88),rgba(242,233,214,0.82)_45%,rgba(228,218,195,0.96)_100%)] py-14 sm:py-18">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(245,239,225,0.75),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(95,117,79,0.12),transparent_30%)]" />
      <Container className="relative">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.88fr)] lg:items-center">
          <MotionReveal className="max-w-3xl">
            <div className="mb-4 text-sm font-semibold uppercase tracking-[0.26em] text-primary/75">
              {eyebrow}
            </div>
            <h1 className="max-w-3xl font-heading text-4xl leading-tight text-foreground sm:text-5xl lg:text-[4rem]">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-foreground/76">
              {description}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/75 px-4 py-2 text-sm font-medium text-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{serviceArea}</span>
            </div>
            {actionLinks}
          </MotionReveal>
          <MotionReveal delay={0.1} className="lg:justify-self-end">
            <EditorialImageSlot
              variant={variant}
              title={imageTitle}
              note={imageNote}
              className="mx-auto w-full max-w-2xl"
            />
          </MotionReveal>
        </div>
      </Container>
    </section>
  );
}
