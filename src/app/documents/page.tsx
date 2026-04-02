import { ArrowRight } from "lucide-react";

import { EmptyStatePanel } from "@/components/shared/empty-state-panel";
import { PageHero } from "@/components/sections/page-hero";
import { SectionShell } from "@/components/sections/section-shell";
import { MotionReveal } from "@/components/shared/motion-reveal";
import { SmartLink } from "@/components/shared/smart-link";
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
        title="Posted chapter materials, recaps, and practical guides"
        description="This page now highlights what the chapter has already published, while still showing which document types are not posted yet."
        serviceArea={siteConfig.serviceAreaLabel}
        variant="documents"
        layout="compact"
        showCompactVisual
        highlightsTitle="Includes"
        highlights={[
          "Available now chapter guides and recaps",
          "Public reference pages maintained by the chapter",
          "Clear notes on what still is not posted yet",
        ]}
        visualTitle="Handouts, notices, and chapter records"
        visualNote="A public library for real chapter materials first, with unposted document types clearly marked."
        actions={[
          { href: "/news", label: "Browse chapter materials" },
          { href: "/contact", label: "Contact the chapter", variant: "secondary" },
        ]}
      />

      <SectionShell
        eyebrow="Document library"
        title="Browse posted materials by type"
        intro="Available chapter guides, recaps, and archive pages appear first. Unposted document types stay clearly marked so the page remains honest."
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
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <h3 className="font-heading text-xl text-foreground">
                        {item.title}
                      </h3>
                      <span className="rounded-full border border-primary/12 bg-white/80 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-primary/72">
                        {item.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-7 text-foreground/68">
                      {item.description}
                    </p>
                    {item.updated ? (
                      <p className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-foreground/48">
                        {item.updated}
                      </p>
                    ) : null}
                    {item.href ? (
                      <SmartLink
                        href={item.href}
                        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                      >
                        <span>{item.hrefLabel ?? "Open material"}</span>
                        <ArrowRight className="h-4 w-4" />
                      </SmartLink>
                    ) : null}
                  </li>
                ))}
              </ul>
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
