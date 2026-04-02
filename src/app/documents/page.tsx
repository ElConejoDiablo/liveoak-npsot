import { EmptyStatePanel } from "@/components/shared/empty-state-panel";
import { PageHero } from "@/components/sections/page-hero";
import { SectionShell } from "@/components/sections/section-shell";
import { MotionReveal } from "@/components/shared/motion-reveal";
import {
  documentCollections,
  documentsEmptyState,
} from "@/data/documents";
import { siteConfig } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Documents",
  description:
    "Browse chapter governance, meeting materials, handouts, flyers, and member resources for the Live Oak Chapter.",
  path: "/documents",
});

export default function DocumentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Documents"
        title="Chapter documents, handouts, and posted materials"
        description="Look here for bylaws, meeting materials, handouts, flyers, and other chapter files."
        serviceArea={siteConfig.serviceAreaLabel}
        layout="compact"
        highlightsTitle="Includes"
        highlights={[
          "Governance and meeting materials",
          "Public handouts and flyers",
          "Member resources when available",
        ]}
        actions={[
          { href: "/contact", label: "Contact the chapter" },
          { href: siteConfig.contactUrl, label: "Email about documents", variant: "secondary" },
        ]}
      />

      <SectionShell
        eyebrow="Document library"
        title="Browse documents by type"
        intro="Files are grouped by the kinds of materials chapter participants most often look for."
      >
        <div className="grid gap-5 xl:grid-cols-2">
          {documentCollections.map((collection, index) => (
            <MotionReveal
              key={collection.title}
              delay={index * 0.05}
              className="rounded-[1.8rem] border border-primary/10 bg-white/80 p-6 shadow-[0_18px_60px_rgba(39,59,42,0.08)]"
            >
              <h2 className="font-heading text-2xl text-foreground">
                {collection.title}
              </h2>
              <p className="mt-3 text-base leading-7 text-foreground/72">
                {collection.description}
              </p>
              <ul className="mt-5 space-y-4">
                {collection.items.map((item) => (
                  <li
                    key={item.title}
                    className="rounded-[1.2rem] border border-primary/10 bg-[#F7F4E8] p-4"
                  >
                    <h3 className="font-heading text-xl text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-foreground/68">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-7 text-foreground/64">
                {collection.emptyMessage}
              </p>
            </MotionReveal>
          ))}
        </div>
      </SectionShell>

      <div className="mx-auto max-w-7xl px-5 pb-20 sm:px-6 lg:px-8">
        <EmptyStatePanel
          title="Need a document that is not posted yet?"
          description={documentsEmptyState}
          action={{ href: "/contact", label: "Contact the chapter" }}
        />
      </div>
    </>
  );
}
