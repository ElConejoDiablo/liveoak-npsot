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
    "Browse chapter governance, meeting materials, handouts, flyers, and member-resource placeholders for the Live Oak Chapter.",
  path: "/documents",
});

export default function DocumentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Documents"
        title="A usable home for chapter governance, handouts, flyers, and member resources"
        description="This page gives the chapter a dependable place to publish materials as they become available, while still presenting a clear structure before every file is posted."
        serviceArea={siteConfig.serviceAreaLabel}
        variant="savanna"
        actions={[
          { href: siteConfig.contactUrl, label: "Ask about chapter files" },
          { href: "/contact", label: "Contact / subscribe", variant: "secondary" },
        ]}
      />

      <SectionShell
        eyebrow="Document library"
        title="Organized around the materials chapter participants actually need"
        intro="Instead of feeling like an empty placeholder, the document page now reflects the kinds of files a chapter commonly publishes and gives each category an intentional home."
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
                    <div className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/72">
                      {item.status}
                    </div>
                    <h3 className="mt-2 font-heading text-xl text-foreground">
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
          title="The document library is ready, even though the first public files are not posted yet"
          description={documentsEmptyState}
          action={{ href: siteConfig.contactUrl, label: "Request information by email" }}
        />
      </div>
    </>
  );
}
