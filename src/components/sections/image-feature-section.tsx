import { CheckCircle2 } from "lucide-react";

import { EditorialImageSlot } from "@/components/shared/editorial-image-slot";
import { MotionReveal } from "@/components/shared/motion-reveal";
import type { PublicImageryKey } from "@/data/public-imagery";
import { cn } from "@/lib/utils";

type ImageFeatureSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  variant: PublicImageryKey;
  reverse?: boolean;
};

export function ImageFeatureSection({
  eyebrow,
  title,
  description,
  bullets,
  variant,
  reverse = false,
}: ImageFeatureSectionProps) {
  return (
    <div
      className={cn(
        "grid gap-8 rounded-[2rem] border border-primary/10 bg-white/70 p-5 shadow-[0_24px_70px_rgba(38,60,40,0.08)] md:p-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:items-center",
        reverse && "lg:grid-cols-[minmax(320px,0.95fr)_minmax(0,1.05fr)]",
      )}
    >
      <MotionReveal className={cn(reverse && "lg:order-2")}>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.24em] text-primary/72">
          {eyebrow}
        </p>
        <h3 className="font-heading text-3xl leading-tight text-foreground sm:text-[2.4rem]">
          {title}
        </h3>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-foreground/76">
          {description}
        </p>
        <ul className="mt-6 space-y-4">
          {bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3 text-base leading-7 text-foreground/82">
              <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </MotionReveal>
      <MotionReveal delay={0.08} className={cn(reverse && "lg:order-1")}>
        <EditorialImageSlot
          variant={variant}
          title={title}
          note={description}
          compact
          showText={false}
          className="w-full"
        />
      </MotionReveal>
    </div>
  );
}
