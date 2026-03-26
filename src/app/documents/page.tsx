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
    "View chapter document placeholders and the structure reserved for bylaws, meeting records, and volunteer files.",
  path: "/documents",
});

export default function DocumentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Documents"
        title="A ready-to-grow home for chapter bylaws, minutes, forms, and shared files"
        description="Not every chapter document exists on launch day, but the page structure should still be thoughtful. This page is prepared for that future library now."
        serviceArea={siteConfig.serviceAreaLabel}
        variant="savanna"
        actions={[
          { href: siteConfig.contactUrl, label: "Ask about chapter files" },
          { href: "/contact", label: "Contact / subscribe", variant: "secondary" },
        ]}
      />

      <SectionShell
        eyebrow="Planned collections"
        title="Organized around the documents chapter participants actually need"
        intro="The page is structured for chapter operations rather than generic file dumping, which will make it easier to maintain later."
      >
        <div className="grid gap-5 lg:grid-cols-3">
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
