import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { PlantLibraryCollections } from "@/components/resources/plant-library-collections";
import { PlantLibrarySummary } from "@/components/resources/plant-library-summary";
import { plantLibraryGroups } from "@/data/plant-library";
import { starterCollections } from "@/data/plant-library-collections";
import { plantLibraryItems } from "@/data/plant-library-index";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Tri-County Native Plants",
  description:
    "Browse the chapter-owned native plant starter library, starter collections, and featured local plants by name.",
  path: "/resources/plants",
  eyebrow: "Tri-County Native Plants",
});

export default function PlantIndexPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/70">Chapter-owned starter library</p>
        <h1 className="mt-4 font-heading text-5xl leading-tight text-foreground">Tri-County Native Plants</h1>
        <p className="mt-4 text-lg leading-8 text-foreground/72">
          Browse the chapter&apos;s local-first plant reference set. The starter collections and featured plants below
          help visitors start with practical choices for Fayette, Colorado, and Lavaca Counties.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/resources"
            className="rounded-full border border-primary/10 bg-white px-4 py-2 text-sm font-semibold text-foreground transition hover:border-primary/20 hover:bg-primary/5"
          >
            Back to Resources
          </Link>
          <Link
            href="/resources/npsot"
            className="rounded-full border border-primary/10 bg-white px-4 py-2 text-sm font-semibold text-foreground transition hover:border-primary/20 hover:bg-primary/5"
          >
            NPSOT Resources
          </Link>
          <Link
            href="/resources/sourcing-native-plants"
            className="rounded-full border border-primary/10 bg-white px-4 py-2 text-sm font-semibold text-foreground transition hover:border-primary/20 hover:bg-primary/5"
          >
            Sourcing Native Plants
          </Link>
        </div>
      </div>

      <section className="mt-12">
        <PlantLibrarySummary groups={plantLibraryGroups} />
      </section>

      <section className="mt-12">
        <PlantLibraryCollections collections={starterCollections} />
      </section>

      <section id="native-plant-seed-set" className="mt-12">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/70">Plant index</p>
          <h2 className="mt-3 font-heading text-3xl text-foreground">Browse plants by name</h2>
          <p className="mt-2 text-lg leading-8 text-foreground/72">
            Each card links to a chapter plant detail page with traits, county relevance, planting guidance, and
            approved image support.
          </p>
        </div>
      </section>

      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {plantLibraryItems.map((plant) => (
          <Link
            key={plant.scientificName}
            href={`/resources/plants/${plant.slug}`}
            className="rounded-[1.5rem] border border-primary/10 bg-white/84 p-5 shadow-[0_16px_48px_rgba(37,58,40,0.07)] transition hover:-translate-y-0.5 hover:border-primary/20"
          >
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">{plant.plantType}</Badge>
              {plant.chapterRecommended ? <Badge>Chapter recommended</Badge> : null}
              {plant.hostValue ? <Badge variant="secondary">Host plant</Badge> : null}
              {plant.pollinatorValue ? <Badge variant="secondary">Pollinator value</Badge> : null}
            </div>
            <h2 className="mt-4 font-heading text-2xl leading-tight text-foreground">
              {plant.commonName}
            </h2>
            <p className="mt-2 text-sm italic text-foreground/68">{plant.scientificName}</p>
            <p className="mt-4 text-sm leading-6 text-foreground/72">
              {plant.pollinatorValue}
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary/70">
              Counties: Fayette {plant.countyRelevance.fayette} · Colorado {plant.countyRelevance.colorado} · Lavaca {plant.countyRelevance.lavaca}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
