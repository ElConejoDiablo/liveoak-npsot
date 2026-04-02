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
    "Find official NPSOT links, native plant references, and habitat resources for Fayette, Colorado, and Lavaca Counties.",
  path: "/resources",
  eyebrow: "Resources",
});

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Trusted NPSOT links and native-plant references"
        description="Use these links to join NPSOT, explore native plants, and find Texas habitat resources."
        serviceArea={siteConfig.serviceAreaLabel}
        layout="utility"
        highlightsTitle="Includes"
        highlights={[
          "Beginner guidance and official NPSOT links",
          "Habitat and plant-identification references",
          "Contact the chapter if you need local guidance",
        ]}
        actions={[
          { href: siteConfig.npsot.homeUrl, label: "Visit NPSOT.org" },
          { href: "/contact", label: "Ask the chapter", variant: "secondary" },
        ]}
      />

      <SectionShell
        eyebrow="Reference library"
        title="Reference links for members, gardeners, and curious visitors"
        intro="Search for membership links, monarch resources, plant databases, and beginner guidance."
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
