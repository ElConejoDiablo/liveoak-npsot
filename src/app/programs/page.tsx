import { CtaBanner } from "@/components/sections/cta-banner";
import { ImageFeatureSection } from "@/components/sections/image-feature-section";
import { PageHero } from "@/components/sections/page-hero";
import { SectionShell } from "@/components/sections/section-shell";
import { MotionReveal } from "@/components/shared/motion-reveal";
import { programAreas, seasonalHighlights } from "@/data/programs";
import { siteConfig } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Programs",
  description:
    "Explore chapter meetings, field trips, seed stewardship, outreach, and habitat care across Fayette, Colorado, and Lavaca Counties.",
  path: "/programs",
});

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="Programs"
        title="Programs that bring native plants into everyday chapter life"
        description="These are the kinds of chapter activities that help people learn, observe, and care for native plants close to home."
        serviceArea={siteConfig.serviceAreaLabel}
        variant="learning"
        layout="banner"
        actions={[
          { href: "/events", label: "View events" },
          { href: "/volunteer", label: "Volunteer with the chapter", variant: "secondary" },
        ]}
      />

      <SectionShell
        eyebrow="Program areas"
        title="Choose the kind of chapter learning you want"
        intro="Some activities center on talks and conversation, while others focus on field observation, seed work, outreach, or hands-on habitat care."
      >
        <div className="space-y-8">
          {programAreas.map((area, index) => (
            <ImageFeatureSection
              key={area.title}
              eyebrow={area.title}
              title={area.title}
              description={area.description}
              bullets={area.bullets}
              variant={area.artVariant}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Seasonal rhythm"
        title="Seasonal highlights across the chapter year"
        intro="Native plant learning changes with the season, from spring bloom watching to seed work and fall pollinator support."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {seasonalHighlights.map((highlight, index) => (
            <MotionReveal
              key={highlight.title}
              delay={index * 0.05}
              className="rounded-[1.7rem] border border-primary/10 bg-white/78 p-6 shadow-[0_18px_60px_rgba(39,59,42,0.08)]"
            >
              <div className="text-sm font-semibold uppercase tracking-[0.22em] text-primary/72">
                {highlight.season}
              </div>
              <h3 className="mt-3 font-heading text-2xl leading-tight text-foreground">
                {highlight.title}
              </h3>
              <p className="mt-3 text-base leading-7 text-foreground/72">
                {highlight.description}
              </p>
              <ul className="mt-5 space-y-2 text-sm leading-7 text-foreground/68">
                {highlight.plants.map((plant) => (
                  <li key={plant} className="flex gap-2">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/65" />
                    <span>{plant}</span>
                  </li>
                ))}
              </ul>
            </MotionReveal>
          ))}
        </div>
      </SectionShell>

      <div className="mx-auto max-w-7xl px-5 pb-20 sm:px-6 lg:px-8">
        <CtaBanner
          eyebrow="Stay involved"
          title="Join the chapter, attend an event, or ask how to help"
          description="Attend an event, volunteer, or join NPSOT to stay involved with the chapter."
          primaryAction={{ href: "/contact", label: "Contact the chapter" }}
          secondaryAction={{ href: siteConfig.joinUrl, label: "Join NPSOT" }}
          variant="eventsmeeting"
        />
      </div>
    </>
  );
}
