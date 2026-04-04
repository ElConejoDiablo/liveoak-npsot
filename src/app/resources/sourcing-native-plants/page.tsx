import { CtaBanner } from "@/components/sections/cta-banner";
import { PhotographicHeroBanner } from "@/components/sections/photographic-hero-banner";
import { SourcingSourceCards } from "@/components/resources/sourcing-source-cards";
import { sourcingPageNotes, nativePlantSourceCards } from "@/data/native-plant-sourcing";
import { siteConfig } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Sourcing Native Plants",
  description:
    "Learn how the chapter will organize verified native plant and seed sourcing information for the Tri-County area.",
  path: "/resources/sourcing-native-plants",
  eyebrow: "Sourcing Native Plants",
});

export default function SourcingNativePlantsPage() {
  return (
    <>
      <PhotographicHeroBanner
        variant="sourcingnativeplants"
        title="Practical sourcing for native plants and seed"
        description="This page is ready for chapter-verified nursery, grower, and seed-seller cards with manual provenance notes."
        serviceArea={siteConfig.serviceAreaLabel}
        contentClassName="max-w-3xl"
        overlayClassName="bg-[linear-gradient(180deg,rgba(18,25,19,0.26),rgba(18,25,19,0.46)_28%,rgba(18,25,19,0.72)_58%,rgba(18,25,19,0.9)_100%)] lg:bg-[linear-gradient(90deg,rgba(18,25,19,0.86)_0%,rgba(18,25,19,0.78)_36%,rgba(18,25,19,0.52)_58%,rgba(18,25,19,0.26)_78%,rgba(18,25,19,0.18)_100%),linear-gradient(180deg,rgba(18,25,19,0.24),rgba(18,25,19,0.12)_28%,rgba(18,25,19,0.5)_80%,rgba(18,25,19,0.84)_100%)]"
        imageClassName="object-[60%_center] sm:object-center"
      />

      <main className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
        <div className="space-y-8">
        <section className="grid gap-4 md:grid-cols-3">
          {sourcingPageNotes.map((note) => (
            <div
              key={note}
              className="rounded-[1.5rem] border border-primary/10 bg-white/84 p-5 shadow-[0_16px_48px_rgba(37,58,40,0.07)]"
            >
              <p className="text-sm leading-6 text-foreground/72">{note}</p>
            </div>
          ))}
        </section>

        <section className="space-y-4">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/70">
              Manual provenance only
            </p>
            <h2 className="mt-3 font-heading text-3xl text-foreground">Source cards</h2>
            <p className="mt-2 text-lg leading-8 text-foreground/72">
              Add only sources that the chapter has checked by hand. Provenance notes should stay explicit and local,
              and the Tri-County provenance chip should only appear when a source is manually verified.
            </p>
          </div>
          <SourcingSourceCards cards={nativePlantSourceCards} />
        </section>

        <div>
          <CtaBanner
            eyebrow="Need a chapter check?"
            title="Ask before you buy if you need a provenance confirmation"
            description="The chapter can help members and visitors think through local sources, plant provenance, and the right next step."
            primaryAction={{ href: "/contact", label: "Contact the chapter" }}
            variant="resourcesreferencehelp"
          />
        </div>
        </div>
      </main>
    </>
  );
}
