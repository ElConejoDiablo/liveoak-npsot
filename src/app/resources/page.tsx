import { ArrowRight } from "lucide-react";

import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { SectionShell } from "@/components/sections/section-shell";
import { ResourceBrowser } from "@/components/resources/resource-browser";
import { MotionReveal } from "@/components/shared/motion-reveal";
import { SmartLink } from "@/components/shared/smart-link";
import { resourceGroups } from "@/data/resources";
import { siteConfig } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Resources",
  description:
    "Find official NPSOT links, native plant references, and habitat resources for Fayette, Colorado, and Lavaca Counties.",
  path: "/resources",
  eyebrow: "Resources",
});

export default function ResourcesPage() {
  const chapterStartingPoints = [
    {
      title: "Ask the chapter",
      description:
        "Reach out if you want help finding the right local event, article, or native-plant reference.",
      href: "/contact",
      label: "Contact the chapter",
    },
    {
      title: "Read chapter news",
      description:
        "Start with local field notes, seasonal reading, and plant guidance tied to this part of Texas.",
      href: "/news",
      label: "Read chapter news",
    },
    {
      title: "See local events",
      description:
        "Find chapter meetings, walks, and learning opportunities before branching into statewide references.",
      href: "/events",
      label: "View events",
    },
  ] as const;

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Chapter guidance and trusted native-plant references"
        description="Start with local chapter help, then branch into statewide and Texas references for plants, habitat, and membership."
        serviceArea={siteConfig.serviceAreaLabel}
        layout="banner"
        variant="resourcehub"
        actions={[
          { href: "/contact", label: "Ask the chapter" },
          { href: "/events", label: "View events", variant: "secondary" },
        ]}
      />

      <SectionShell
        eyebrow="Start with the chapter"
        title="Use the chapter as your local starting point"
        intro="These are the clearest local paths when you want a quick answer, a nearby event, or guidance that feels grounded in this chapter's region."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {chapterStartingPoints.map((item, index) => (
            <MotionReveal
              key={item.title}
              delay={index * 0.05}
              className="rounded-[1.7rem] border border-primary/10 bg-white/78 p-6 shadow-[0_18px_60px_rgba(39,59,42,0.08)]"
            >
              <h2 className="font-heading text-2xl leading-tight text-foreground">
                {item.title}
              </h2>
              <p className="mt-3 text-base leading-7 text-foreground/72">
                {item.description}
              </p>
              <SmartLink
                href={item.href}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary"
              >
                <span>{item.label}</span>
                <ArrowRight className="h-4 w-4" />
              </SmartLink>
            </MotionReveal>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Trusted references"
        title="Statewide and Texas native-plant references"
        intro="Use the library below for membership links, plant databases, monarch habitat guidance, and other statewide references."
      >
        <ResourceBrowser groups={resourceGroups} />
      </SectionShell>

      <div className="mx-auto max-w-7xl px-5 pb-20 sm:px-6 lg:px-8">
        <CtaBanner
          eyebrow="Need something specific?"
          title="Contact the chapter if you need help finding the right resource"
          description="We can help point you to a plant reference, membership link, or local resource."
          primaryAction={{ href: "/contact", label: "Contact the chapter" }}
          variant="pollinator"
        />
      </div>
    </>
  );
}
