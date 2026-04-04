import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { plantLibraryItems } from "@/data/plant-library-index";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Plant Index",
  description: "Browse the chapter-owned native plant starter library by plant name.",
  path: "/resources/plants",
  eyebrow: "Resources",
});

export default function PlantIndexPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/70">
          Chapter-owned starter library
        </p>
        <h1 className="mt-4 font-heading text-5xl leading-tight text-foreground">
          Native plant index
        </h1>
        <p className="mt-4 text-lg leading-8 text-foreground/72">
          Browse the chapter&apos;s current plant reference set. Each entry links to a detail page with traits,
          county relevance, and image support placeholders for future approved photos.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/resources"
            className="rounded-full border border-primary/10 bg-white px-4 py-2 text-sm font-semibold text-foreground transition hover:border-primary/20 hover:bg-primary/5"
          >
            Back to Resources
          </Link>
          <Link
            href="/resources#native-plant-seed-set"
            className="rounded-full border border-primary/10 bg-white px-4 py-2 text-sm font-semibold text-foreground transition hover:border-primary/20 hover:bg-primary/5"
          >
            View starter collections
          </Link>
        </div>
      </div>

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
