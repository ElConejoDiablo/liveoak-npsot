import { ArrowRight, MapPin } from "lucide-react";

import { buttonVariants } from "@/components/ui/button-styles";
import { Container } from "@/components/shared/container";
import { MotionReveal } from "@/components/shared/motion-reveal";
import { PlantIllustration } from "@/components/shared/plant-illustration";
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
  actions?: HeroAction[];
};

export function PageHero({
  eyebrow,
  title,
  description,
  serviceArea,
  variant = "savanna",
  actions = [],
}: PageHeroProps) {
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
            {actions.length ? (
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
            ) : null}
          </MotionReveal>
          <MotionReveal delay={0.1} className="lg:justify-self-end">
            <PlantIllustration
              variant={variant}
              className="mx-auto aspect-[5/4] w-full max-w-2xl"
            />
          </MotionReveal>
        </div>
      </Container>
    </section>
  );
}
