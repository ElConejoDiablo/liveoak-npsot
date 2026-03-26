import { ArrowRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button-styles";
import { MotionReveal } from "@/components/shared/motion-reveal";
import { PlantIllustration } from "@/components/shared/plant-illustration";
import { SmartLink } from "@/components/shared/smart-link";
import { cn } from "@/lib/utils";

type CtaBannerProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryAction: {
    href: string;
    label: string;
  };
  secondaryAction?: {
    href: string;
    label: string;
  };
  variant?: "savanna" | "bluebonnet" | "pollinator" | "monarch" | "community";
};

export function CtaBanner({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  variant = "community",
}: CtaBannerProps) {
  return (
    <MotionReveal className="overflow-hidden rounded-[2rem] border border-primary/10 bg-[linear-gradient(135deg,rgba(37,58,40,0.98),rgba(61,87,63,0.95))] text-white shadow-[0_30px_90px_rgba(28,49,35,0.28)]">
      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-center">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">
            {eyebrow}
          </p>
          <h3 className="mt-3 font-heading text-3xl leading-tight sm:text-[2.55rem]">
            {title}
          </h3>
          <p className="mt-4 text-lg leading-8 text-white/78">{description}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <SmartLink
              href={primaryAction.href}
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                "h-auto rounded-full border border-white/20 bg-[#F7F4E8] px-5 py-3 text-foreground hover:bg-white",
              )}
            >
              <span>{primaryAction.label}</span>
              <ArrowRight className="ml-1 h-4 w-4" />
            </SmartLink>
            {secondaryAction ? (
              <SmartLink
                href={secondaryAction.href}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "lg" }),
                  "h-auto rounded-full border border-white/20 bg-white/8 px-5 py-3 text-white hover:bg-white/14",
                )}
              >
                {secondaryAction.label}
              </SmartLink>
            ) : null}
          </div>
        </div>
        <PlantIllustration
          variant={variant}
          className="aspect-[4/3] w-full border-white/12 bg-transparent shadow-none"
        />
      </div>
    </MotionReveal>
  );
}
