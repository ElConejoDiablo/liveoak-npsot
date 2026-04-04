import { BookOpenText, Filter, Search } from "lucide-react";

import { PhotographicHeroBanner } from "@/components/sections/photographic-hero-banner";
import { PlantLibraryCollections } from "@/components/resources/plant-library-collections";
import {
  getStarterCollectionById,
  starterCollections,
} from "@/data/plant-library-collections";
import type { PlantEntry } from "@/data/plant-library";
import { plantLibraryItems } from "@/data/plant-library-index";
import { siteConfig } from "@/data/site";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Tri-County Native Plants",
  description:
    "Browse the chapter-owned native plant starter library, starter collections, and featured local plants by name.",
  path: "/resources/plants",
  eyebrow: "Tri-County Native Plants",
});

type PlantIndexPageProps = {
  searchParams?: Promise<{
    collection?: string;
    q?: string;
  }>;
};

const normalizeQuery = (value?: string) => value?.trim().toLowerCase() ?? "";

const filterPlants = (query: string, collectionPlants: Array<PlantEntry>) => {
  if (!query) return collectionPlants;

  return collectionPlants.filter((plant) => {
    const haystack = [
      plant.commonName,
      plant.scientificName,
      plant.family,
      plant.plantType,
      plant.growthForm,
      plant.pollinatorValue,
      plant.bestLocalUse,
      plant.localUseNote,
      plant.localFitNotes,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });
};

export default async function PlantIndexPage({ searchParams }: PlantIndexPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {};
  const activeCollection = getStarterCollectionById(resolvedSearchParams.collection);
  const query = resolvedSearchParams.q?.trim() ?? "";
  const normalizedQuery = normalizeQuery(resolvedSearchParams.q);
  const collectionPlants = activeCollection?.plants ?? plantLibraryItems;
  const results = filterPlants(normalizedQuery, collectionPlants);

  return (
    <>
      <PhotographicHeroBanner
        variant="tricountynativeplants"
        title="Tri-County Native Plants"
        description="A local plant library for Fayette, Colorado, and Lavaca Counties, built to help you choose native plants for gardens, habitat, prairie structure, and pollinators."
        serviceArea={siteConfig.serviceAreaLabel}
        contentClassName="max-w-[42rem]"
        actions={[
          { href: "#how-to-use", label: "How to use this library", variant: "secondary" },
          { href: "#starter-collections", label: "Starter collections" },
        ]}
        overlayClassName="bg-[linear-gradient(180deg,rgba(18,25,19,0.32),rgba(18,25,19,0.58)_28%,rgba(18,25,19,0.78)_58%,rgba(18,25,19,0.94)_100%)] lg:bg-[linear-gradient(90deg,rgba(18,25,19,0.9)_0%,rgba(18,25,19,0.84)_34%,rgba(18,25,19,0.62)_56%,rgba(18,25,19,0.34)_76%,rgba(18,25,19,0.22)_100%),linear-gradient(180deg,rgba(18,25,19,0.28),rgba(18,25,19,0.16)_28%,rgba(18,25,19,0.54)_80%,rgba(18,25,19,0.84)_100%)]"
        imageClassName="object-[62%_center] sm:object-center"
      />

      <main className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
        <section
          id="how-to-use"
          className="rounded-[1.8rem] border border-primary/10 bg-white/84 p-6 shadow-[0_18px_60px_rgba(39,59,42,0.08)] sm:p-8"
        >
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/70">How to use this library</p>
            <h2 className="mt-3 font-heading text-3xl text-foreground">Start with a question, not a species list</h2>
            <p className="mt-3 text-lg leading-8 text-foreground/72">
              Use the starter collections to narrow down the kind of plant you need, then compare the detail pages for
              county fit, planting notes, and approved images. If you already know the site condition, jump straight to
              the browse area and filter from there.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                icon: BookOpenText,
                title: "Read the detail page",
                text: "Each plant page shows county relevance, planting guidance, and approved-image support.",
              },
              {
                icon: Filter,
                title: "Use the collections",
                text: "Start with pollinators, prairie structure, or the Monarch Waystation qualifier when you need a guided path.",
              },
              {
                icon: Search,
                title: "Search by name",
                text: "Use the browse area below to search the full library by common name, scientific name, or family.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[1.4rem] border border-primary/10 bg-[#f7f4e8] p-5"
              >
                <item.icon className="h-5 w-5 text-primary/70" />
                <h3 className="mt-3 font-heading text-2xl text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-foreground/72">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="starter-collections" className="mt-12">
          <PlantLibraryCollections
            collections={starterCollections}
            activeCollection={activeCollection}
            query={query}
            results={results}
          />
        </section>
      </main>
    </>
  );
}
