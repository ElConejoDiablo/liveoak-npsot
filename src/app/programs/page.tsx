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
    "Explore the education, field trips, seed stewardship, outreach, and habitat-focused program areas planned for the Live Oak Chapter.",
  path: "/programs",
});

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="Programs"
        title="Programs that help native plants move from abstract good idea to lived local practice"
        description="A chapter site should show not only what the organization believes, but what it actually does. These program areas create that bridge."
        serviceArea={siteConfig.serviceAreaLabel}
        variant="pollinator"
        visualTitle="Programs that turn local curiosity into practice"
        visualNote="Education, observation, seed work, outreach, and stewardship all belong in the chapter rhythm."
        actions={[
          { href: "/events", label: "View events" },
          { href: "/volunteer", label: "Find volunteer paths", variant: "secondary" },
        ]}
      />

      <SectionShell
        eyebrow="Program areas"
        title="Built for learning, observation, stewardship, and outreach"
        intro="The chapter can grow around a few strong program pillars rather than a scattered collection of one-off activities."
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
        title="A chapter can feel alive by matching its content to the time of year"
        intro="Programs become more useful when they follow the season instead of staying generic all year."
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
          eyebrow="Build momentum"
          title="Use the chapter site to convert interest into participation"
          description="Programs work best when visitors can move directly from inspiration to a next step, whether that means attending a talk, volunteering, or joining NPSOT."
          primaryAction={{ href: "/contact", label: "Contact / subscribe" }}
          secondaryAction={{ href: siteConfig.joinUrl, label: "Join NPSOT" }}
          variant="community"
        />
      </div>
    </>
  );
}
