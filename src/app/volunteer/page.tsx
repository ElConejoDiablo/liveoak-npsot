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
        title="Volunteer in ways that fit your time and skills"
        description="Helping can mean welcoming visitors, supporting events, sharing plant knowledge, or pitching in with the practical work that keeps the chapter going."
        serviceArea={siteConfig.serviceAreaLabel}
        variant="community"
        visualTitle="Everyday help makes a chapter stronger"
        visualNote="Hospitality, outreach, stewardship, and behind-the-scenes support all matter."
        actions={[
          { href: siteConfig.contactUrl, label: "Tell us how you'd like to help" },
          { href: siteConfig.joinUrl, label: "Join NPSOT", variant: "secondary" },
        ]}
      />

      <SectionShell
        eyebrow="Volunteer paths"
        title="Different ways to contribute"
        intro="There is room for steady helpers and occasional volunteers."
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
        title="Volunteer help keeps the chapter welcoming and active"
        intro="Local events and projects run more smoothly when more people can share the work."
      >
        <ImageFeatureSection
          eyebrow="Community stewardship"
          title="Clear roles make it easier to help"
          description="Volunteering works best when people can see where help is needed and step in at a level that fits their time and experience."
          bullets={[
            "A welcoming place for newcomers who are still learning the basics",
            "Visible chapter needs instead of vague calls for help",
            "Space for practical contributions as well as ecological knowledge",
          ]}
          variant="community"
        />
      </SectionShell>

      <div className="mx-auto max-w-7xl px-5 pb-20 sm:px-6 lg:px-8">
        <CtaBanner
          eyebrow="Get involved"
          title="Reach out if you would like to help"
          description="A short note is enough to let the chapter know how you would like to get involved."
          primaryAction={{ href: "/contact", label: "Contact the chapter" }}
          secondaryAction={{ href: siteConfig.contactUrl, label: "Email about volunteering" }}
          variant="savanna"
        />
      </div>
    </>
  );
}
