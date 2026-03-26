import { buttonVariants } from "@/components/ui/button-styles";
import { Container } from "@/components/shared/container";
import { PlantIllustration } from "@/components/shared/plant-illustration";
import { SmartLink } from "@/components/shared/smart-link";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <Container className="grid min-h-[70svh] gap-8 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)] lg:items-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary/72">
          Page not found
        </p>
        <h1 className="mt-4 font-heading text-5xl leading-tight text-foreground sm:text-6xl">
          This path has wandered off the trail.
        </h1>
        <p className="mt-5 max-w-2xl text-xl leading-9 text-foreground/74">
          Try heading back to the homepage, check the events page, or use the
          contact email if you are looking for something that has not been
          published yet.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <SmartLink
            href="/"
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "h-auto rounded-full px-5 py-3",
            )}
          >
            Return home
          </SmartLink>
          <SmartLink
            href="/events"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-auto rounded-full border-primary/15 bg-white px-5 py-3",
            )}
          >
            View events
          </SmartLink>
        </div>
      </div>
      <PlantIllustration variant="savanna" className="aspect-[4/4.3] w-full" />
    </Container>
  );
}
