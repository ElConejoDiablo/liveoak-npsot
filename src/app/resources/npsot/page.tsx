import { CtaBanner } from "@/components/sections/cta-banner";
import { SectionShell } from "@/components/sections/section-shell";
import { ResourceBrowser } from "@/components/resources/resource-browser";
import { SmartLink } from "@/components/shared/smart-link";
import { resourceGroups } from "@/data/resources";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "NPSOT Resources",
  description:
    "Browse statewide NPSOT guidance, membership links, and broader Texas-native references.",
  path: "/resources/npsot",
  eyebrow: "NPSOT Resources",
});

export default function NpsotResourcesPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/70">
          Statewide Guidance
        </p>
        <h1 className="mt-4 font-heading text-5xl leading-tight text-foreground">
          NPSOT Resources
        </h1>
        <p className="mt-4 text-lg leading-8 text-foreground/72">
          These links cover statewide guidance from NPSOT, official membership information, and broader Texas-native
          reference material. They are useful when you want the larger Texas context behind the chapter&apos;s local work.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <SmartLink
            href="/resources/plants"
            className="rounded-full border border-primary/10 bg-white px-4 py-2 text-sm font-semibold text-foreground transition hover:border-primary/20 hover:bg-primary/5"
          >
            Tri-County Native Plants
          </SmartLink>
          <SmartLink
            href="/resources/sourcing-native-plants"
            className="rounded-full border border-primary/10 bg-white px-4 py-2 text-sm font-semibold text-foreground transition hover:border-primary/20 hover:bg-primary/5"
          >
            Sourcing Native Plants
          </SmartLink>
        </div>
      </div>

      <SectionShell
        eyebrow="Official Links"
        title="Statewide NPSOT Guidance"
        intro="Use these statewide links for membership, native-garden guidance, and reference material from the Native Plant Society of Texas."
      >
        <ResourceBrowser groups={resourceGroups} />
      </SectionShell>

      <div className="mt-12">
        <CtaBanner
          eyebrow="Still Not Sure Where to Start?"
          title="Chapter Staff Can Help You Choose the Right Resource"
          description="If you need the local plant library, sourcing help, or a statewide reference, the chapter can point you in the right direction."
          primaryAction={{ href: "/contact", label: "Contact the chapter" }}
          variant="resourcesreferencehelp"
        />
      </div>
    </main>
  );
}
