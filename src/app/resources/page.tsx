import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { SectionShell } from "@/components/sections/section-shell";
import { ResourceBrowser } from "@/components/resources/resource-browser";
import { resourceGroups } from "@/data/resources";
import { siteConfig } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Resources",
  description:
    "Find official NPSOT links, native plant education resources, and habitat references without placeholder content.",
  path: "/resources",
  eyebrow: "Resources",
});

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Useful links for getting started, going deeper, and staying connected"
        description="A practical chapter site should make it easy to move between trustworthy statewide resources and the chapter contact page without dead ends or placeholder links."
        serviceArea={siteConfig.serviceAreaLabel}
        layout="utility"
        highlightsTitle="Start with"
        highlights={[
          "Beginner guidance and official NPSOT links",
          "Habitat and plant-identification references",
          "Use the contact page when you want chapter-specific help",
        ]}
        actions={[
          { href: siteConfig.npsot.homeUrl, label: "Visit NPSOT.org" },
          { href: "/contact", label: "Ask the chapter", variant: "secondary" },
        ]}
      />

      <SectionShell
        eyebrow="Reference library"
        title="Organized for real next steps, not placeholder content"
        intro="Use the lightweight search to quickly find membership links, monarch resources, plant databases, and starter guidance."
      >
        <ResourceBrowser groups={resourceGroups} />
      </SectionShell>

      <div className="mx-auto max-w-7xl px-5 pb-20 sm:px-6 lg:px-8">
        <CtaBanner
          eyebrow="Need something specific?"
          title="Ask the chapter if you are looking for the right next plant, book, or starting point"
          description="The chapter inbox is a simple way to request guidance if you are looking for a useful next step."
          primaryAction={{ href: "/contact", label: "Contact the chapter" }}
          variant="pollinator"
        />
      </div>
    </>
  );
}
