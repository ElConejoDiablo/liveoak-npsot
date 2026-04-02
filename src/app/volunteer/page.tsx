import { CtaBanner } from "@/components/sections/cta-banner";
import { ImageFeatureSection } from "@/components/sections/image-feature-section";
import { PageHero } from "@/components/sections/page-hero";
import { SectionShell } from "@/components/sections/section-shell";
import { MotionReveal } from "@/components/shared/motion-reveal";
import { volunteerPaths } from "@/data/programs";
import { siteConfig } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Volunteer and Get Involved",
  description:
    "Learn how to help with chapter gatherings, share skills, and support habitat-focused chapter work.",
  path: "/volunteer",
});

export default function VolunteerPage() {
  return (
    <>
      <PageHero
        eyebrow="Volunteer and get involved"
        title="A chapter grows best when participation feels realistic, welcoming, and clearly useful"
        description="Volunteering does not need to mean taking on everything. It can mean helping with hospitality, events, outreach, writing, plant questions, or the practical tasks that make a chapter dependable."
        serviceArea={siteConfig.serviceAreaLabel}
        variant="community"
        visualTitle="Practical help keeps the chapter alive"
        visualNote="Hospitality, outreach, stewardship, and everyday support all make room for more people to participate."
        actions={[
          { href: siteConfig.contactUrl, label: "Tell us how you'd like to help" },
          { href: siteConfig.joinUrl, label: "Join NPSOT", variant: "secondary" },
        ]}
      />

      <SectionShell
        eyebrow="Volunteer paths"
        title="Different ways to contribute"
        intro="A healthy volunteer structure makes room for both steady helpers and people who can only give occasional time."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {volunteerPaths.map((path, index) => (
            <MotionReveal
              key={path.title}
              delay={index * 0.05}
              className="rounded-[1.7rem] border border-primary/10 bg-white/78 p-6 shadow-[0_18px_60px_rgba(39,59,42,0.08)]"
            >
              <h2 className="font-heading text-2xl leading-tight text-foreground">
                {path.title}
              </h2>
              <p className="mt-3 text-base leading-7 text-foreground/72">
                {path.description}
              </p>
              <ul className="mt-5 space-y-2 text-sm leading-7 text-foreground/68">
                {path.examples.map((example) => (
                  <li key={example} className="flex gap-2">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/65" />
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
            </MotionReveal>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Why it matters"
        title="Volunteer help is part of the chapter's public example"
        intro="Native plant work becomes more visible and more durable when local people help keep it moving."
      >
        <ImageFeatureSection
          eyebrow="Community stewardship"
          title="The chapter can stay generous without becoming overbuilt"
          description="Volunteer structures work best when they are clear, humane, and easy to join. The site helps by showing concrete roles, a contact path, and a tone that invites participation rather than gatekeeping it."
          bullets={[
            "A gentle on-ramp for newcomers who are still learning the basics",
            "Visible chapter needs instead of vague calls for help",
            "Space for practical contributions as well as ecological knowledge",
          ]}
          variant="community"
        />
      </SectionShell>

      <div className="mx-auto max-w-7xl px-5 pb-20 sm:px-6 lg:px-8">
        <CtaBanner
          eyebrow="Take the next step"
          title="Reach out, join the chapter, or ask where help is needed most"
          description="A simple email is enough to let the chapter know where you would like to help."
          primaryAction={{ href: "/contact", label: "Contact the chapter" }}
          secondaryAction={{ href: siteConfig.contactUrl, label: "Email volunteer interest" }}
          variant="savanna"
        />
      </div>
    </>
  );
}
