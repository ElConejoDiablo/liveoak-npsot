import { CtaBanner } from "@/components/sections/cta-banner";
import { PhotographicHeroBanner } from "@/components/sections/photographic-hero-banner";
import { SectionShell } from "@/components/sections/section-shell";
import { ResourceBrowser } from "@/components/resources/resource-browser";
import { MotionReveal } from "@/components/shared/motion-reveal";
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
      title: "Get help identifying local plants",
      description:
        "Use chapter knowledge and trusted references to narrow down what belongs here and how to recognize it.",
    },
    {
      title: "Find guidance for gardens and habitat",
      description:
        "Learn where to start with native plants, pollinator support, and practical habitat care close to home.",
    },
    {
      title: "Use statewide resources when they help",
      description:
        "Membership links, databases, and official NPSOT guidance are here when you need them.",
    },
  ] as const;

  return (
    <>
      <PhotographicHeroBanner
        variant="resourcehub"
        title="Resources for native plants in the Tri-County Prairie Belt"
        description="Start with the chapter for local guidance, trusted plant references, and practical help for Fayette, Colorado, and Lavaca Counties."
        serviceArea={siteConfig.serviceAreaLabel}
        contentClassName="max-w-[38rem]"
        overlayClassName="bg-[linear-gradient(180deg,rgba(18,25,19,0.38),rgba(18,25,19,0.58)_28%,rgba(18,25,19,0.76)_58%,rgba(18,25,19,0.92)_100%)] lg:bg-[linear-gradient(90deg,rgba(18,25,19,0.9)_0%,rgba(18,25,19,0.84)_34%,rgba(18,25,19,0.62)_56%,rgba(18,25,19,0.34)_76%,rgba(18,25,19,0.22)_100%),linear-gradient(180deg,rgba(18,25,19,0.28),rgba(18,25,19,0.16)_28%,rgba(18,25,19,0.54)_80%,rgba(18,25,19,0.84)_100%)]"
        imageClassName="object-[62%_center] sm:object-center"
        actions={[
          { href: "/contact", label: "Ask the chapter" },
          { href: "/events", label: "View events", variant: "secondary" },
        ]}
      />

      <SectionShell
        eyebrow="Start with the chapter"
        title="Start with the chapter"
        intro="The chapter can help you identify plants, find trusted references, and point you toward the right next step for native gardening, habitat care, or NPSOT membership."
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
            </MotionReveal>
          ))}
        </div>
      </SectionShell>

      <SectionShell
        eyebrow="Trusted references"
        title="Trusted reference library"
        intro="Use the grouped library below for membership links, plant databases, monarch habitat guidance, and other references that support native plants in this region."
      >
        <ResourceBrowser groups={resourceGroups} />
      </SectionShell>

      <div className="mx-auto max-w-7xl px-5 pb-20 sm:px-6 lg:px-8">
        <CtaBanner
          eyebrow="Need something specific?"
          title="Need something specific?"
          description="Contact the chapter if you want help finding the right plant reference, membership link, or local next step."
          primaryAction={{ href: "/contact", label: "Contact the chapter" }}
          variant="resourcesreferencehelp"
        />
      </div>
    </>
  );
}
