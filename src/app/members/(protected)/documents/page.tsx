import { FileText, Lock } from "lucide-react";

import { EmptyStatePanel } from "@/components/shared/empty-state-panel";
import { memberDocumentCategories, memberDocuments } from "@/data/member-documents";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Member Documents",
  description:
    "Protected member documents for the Live Oak Chapter members portal.",
  path: "/members/documents",
  eyebrow: "Members",
});

export const dynamic = "force-dynamic";

export default function MemberDocumentsPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-[1.8rem] border border-primary/10 bg-white/82 p-6 shadow-[0_18px_60px_rgba(39,59,42,0.08)] sm:p-8">
        <div className="flex items-start gap-4">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/8 text-primary">
            <Lock className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-heading text-3xl text-foreground sm:text-4xl">
              Protected member documents
            </h1>
            <p className="mt-3 max-w-3xl text-lg leading-8 text-foreground/72">
              Use this space for meeting minutes, agendas, handouts, and internal chapter references.
              The structure is ready now, and real files can replace placeholder entries as they are published.
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-2">
        {Object.entries(memberDocumentCategories).map(([category, label]) => {
          const items = memberDocuments.filter((document) => document.category === category);

          return (
            <section
              key={category}
              className="rounded-[1.8rem] border border-primary/10 bg-white/82 p-6 shadow-[0_18px_60px_rgba(39,59,42,0.08)]"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <h2 className="font-heading text-2xl text-foreground">{label}</h2>
              </div>
              {items.length ? (
                <div className="mt-5 space-y-3">
                  {items.map((document) => (
                    <div
                      key={document.id}
                      className="rounded-[1.3rem] border border-primary/10 bg-[#F7F4E8] p-4"
                    >
                      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary/72">
                        {document.date}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold text-foreground">
                        {document.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-foreground/68">
                        {document.description}
                      </p>
                      <p className="mt-3 text-sm font-medium text-foreground/72">
                        {document.fileLabel}
                        {document.href ? " available" : " will be posted here"}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-5">
                  <EmptyStatePanel
                    title="No documents posted yet"
                    description="This category is ready for member-only files as soon as they are available."
                  />
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
