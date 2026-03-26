import { cn } from "@/lib/utils";

import { Container } from "@/components/shared/container";
import { MotionReveal } from "@/components/shared/motion-reveal";

type SectionShellProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
};

export function SectionShell({
  id,
  eyebrow,
  title,
  intro,
  align = "left",
  children,
  actions,
  className,
}: SectionShellProps) {
  const centered = align === "center";

  return (
    <section id={id} className={cn("py-18 sm:py-24", className)}>
      <Container>
        <MotionReveal
          className={cn(
            "mb-10 flex flex-col gap-5",
            centered && "mx-auto max-w-3xl items-center text-center",
          )}
        >
          {eyebrow ? (
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-primary/75">
              {eyebrow}
            </p>
          ) : null}
          <div className={cn("space-y-4", centered && "max-w-3xl")}>
            <h2 className="font-heading text-3xl leading-tight text-foreground sm:text-4xl lg:text-[3rem]">
              {title}
            </h2>
            {intro ? (
              <p className="max-w-3xl text-lg leading-8 text-foreground/76">
                {intro}
              </p>
            ) : null}
          </div>
          {actions ? <div>{actions}</div> : null}
        </MotionReveal>
        {children}
      </Container>
    </section>
  );
}

