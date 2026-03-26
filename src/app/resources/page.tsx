import { CtaBanner } from "@/components/sections/cta-banner";
import { PageHero } from "@/components/sections/page-hero";
import { SectionShell } from "@/components/sections/section-shell";
import { ResourceGrid } from "@/components/cards/resource-grid";
import { resourceGroups } from "@/data/resources";
import { siteConfig } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Resources",
  description:
    "Find official NPSOT links, native plant education resources, habitat references, and chapter document placeholders.",
  path: "/resources",
});

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Useful links for getting started, going deeper, and staying connected"
        description="A practical chapter site should make it easy to move between local activity, statewide NPSOT resources, and educational references that help people keep learning."
        serviceArea={siteConfig.serviceAreaLabel}
        variant="bluebonnet"
        actions={[
          { href: siteConfig.npsot.homeUrl, label: "Visit NPSOT.org" },
          { href: "/documents", label: "View documents page", variant: "secondary" },
        ]}
      />

      <SectionShell
        eyebrow="Reference library"
        title="Organized for local chapter visitors, not just link dumping"
        intro="The page groups resources by job so a visitor can quickly tell where to begin."
      >
        <ResourceGrid groups={resourceGroups} />
      </SectionShell>

      <div className="mx-auto max-w-7xl px-5 pb-20 sm:px-6 lg:px-8">
        <CtaBanner
          eyebrow="Need something specific?"
          title="Ask the chapter if you are looking for the right next plant, book, or starting point"
          description="The chapter inbox is a simple way to request guidance while the local document library and newsletter flow continue to grow."
          primaryAction={{ href: "/contact", label: "Contact the chapter" }}
          secondaryAction={{ href: siteConfig.contactUrl, label: "Send an email" }}
          variant="pollinator"
        />
      </div>
    </>
  );
}
