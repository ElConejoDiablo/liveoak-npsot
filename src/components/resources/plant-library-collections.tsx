import { ChevronRight, Search } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SmartLink } from "@/components/shared/smart-link";
import type { PlantEntry } from "@/data/plant-library";
import { slugifyPlantName } from "@/data/plant-library-index";
import type { StarterCollection } from "@/data/plant-library-collections";
import { cn } from "@/lib/utils";

type PlantLibraryCollectionsProps = {
  collections: StarterCollection[];
  activeCollection?: StarterCollection;
  query?: string;
  results: PlantEntry[];
};

const buildCollectionHref = (collectionId: string, query?: string) => {
  const params = new URLSearchParams();

  params.set("collection", collectionId);
  if (query) {
    params.set("q", query);
  }

  return `/resources/plants?${params.toString()}`;
};

const buildSearchHref = (collectionId: string, query?: string) => {
  const params = new URLSearchParams();

  if (collectionId) {
    params.set("collection", collectionId);
  }
  if (query) {
    params.set("q", query);
  }

  const search = params.toString();
  return search ? `/resources/plants?${search}` : "/resources/plants";
};

export function PlantLibraryCollections({
  collections,
  activeCollection,
  query = "",
  results,
}: PlantLibraryCollectionsProps) {
  return (
    <div className="space-y-6">
      <div className="max-w-3xl">
        <h3 className="font-heading text-3xl text-foreground">
          Practical starter collections
        </h3>
        <p className="mt-2 text-lg leading-8 text-foreground/74">
          These small collections are derived from the chapter&apos;s structured plant library and
          are meant to help visitors start with useful, local-first choices.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {collections.map((collection) => (
          <section
            key={collection.title}
            className={cn(
              "rounded-[1.6rem] border border-primary/10 bg-white/84 p-5 shadow-[0_16px_48px_rgba(37,58,40,0.07)] transition",
              activeCollection?.id === collection.id &&
                "border-primary/30 bg-[#fbf8ef] ring-2 ring-primary/10",
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <h4 className="font-heading text-2xl text-foreground">{collection.title}</h4>
              {activeCollection?.id === collection.id ? (
                <Badge className="bg-primary/10 text-primary">Active</Badge>
              ) : null}
            </div>
            <p className="mt-2 text-sm font-medium leading-6 text-primary/80">{collection.intro}</p>
            <p className="mt-2 text-sm leading-6 text-foreground/72">{collection.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {collection.plants.slice(0, 4).map((plant) => (
                <Badge key={plant.scientificName} variant="secondary">
                  <Link
                    href={`/resources/plants/${slugifyPlantName(plant.scientificName)}`}
                    className="transition hover:text-primary"
                  >
                    {plant.commonName}
                  </Link>
                </Badge>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <p className="text-sm leading-6 text-foreground/68">
                Showing {collection.plants.length} plants in this starter grouping.
              </p>
              <SmartLink
                href={buildCollectionHref(collection.id, query)}
                className="inline-flex items-center gap-1 rounded-full border border-primary/10 bg-white px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary/20 hover:bg-primary/5"
                aria-label={`Open the ${collection.title} collection`}
              >
                Open collection
                <ChevronRight className="h-4 w-4" />
              </SmartLink>
            </div>
          </section>
        ))}
      </div>

      <section id="browse-search" className="space-y-4 rounded-[1.8rem] border border-primary/10 bg-white/86 p-5 shadow-[0_18px_60px_rgba(39,59,42,0.08)] sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/70">
              Browse and search
            </p>
            <h3 className="mt-3 font-heading text-3xl text-foreground">
              Search the full Tri-County library
            </h3>
            <p className="mt-2 text-lg leading-8 text-foreground/72">
              Use the search field to narrow the full library by plant name. If a starter collection is active, the
              results stay focused on that collection until you reset it.
            </p>
          </div>
          <SmartLink
            href="/resources/plants"
            className="inline-flex items-center rounded-full border border-primary/10 bg-white px-4 py-2 text-sm font-semibold text-foreground transition hover:border-primary/20 hover:bg-primary/5"
          >
            Reset to full library
          </SmartLink>
        </div>

        <form className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto]">
          {activeCollection ? <input type="hidden" name="collection" value={activeCollection.id} /> : null}
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-foreground/74">
              Search plants
            </span>
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/45" />
              <Input
                name="q"
                defaultValue={query}
                placeholder="Search common names, scientific names, or families"
                className="h-12 rounded-full border-primary/12 bg-white pl-11"
              />
            </div>
          </label>
          <div className="flex items-end">
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center rounded-full border border-primary/10 bg-primary px-5 text-sm font-semibold text-white transition hover:bg-primary/90"
            >
              Search library
            </button>
          </div>
        </form>

        {activeCollection ? (
          <div className="rounded-[1.4rem] border border-primary/10 bg-[#f7f4e8] p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/70">
                  Active collection
                </p>
                <h4 className="mt-2 font-heading text-2xl text-foreground">{activeCollection.title}</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-white">
                  {activeCollection.plants.length} plants
                </Badge>
                <SmartLink
                  href="/resources/plants"
                  className="rounded-full border border-primary/10 bg-white px-4 py-2 text-sm font-semibold text-foreground transition hover:border-primary/20 hover:bg-primary/5"
                >
                  Show full library
                </SmartLink>
              </div>
            </div>
            <p className="mt-3 text-base leading-7 text-foreground/72">{activeCollection.intro}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge className="bg-primary/10 text-primary">Collection active</Badge>
              {query ? <Badge variant="secondary" className="bg-white">Search: {query}</Badge> : null}
              {query ? (
                <SmartLink
                  href={buildSearchHref(activeCollection.id)}
                  className="inline-flex items-center rounded-full border border-primary/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-foreground transition hover:border-primary/20 hover:bg-primary/5"
                >
                  Clear search
                </SmartLink>
              ) : null}
            </div>
            {activeCollection.checklist?.length ? (
              <div className="mt-4 grid gap-3 lg:grid-cols-[minmax(0,1.2fr)_minmax(240px,0.8fr)]">
                <ul className="space-y-2 text-sm leading-6 text-foreground/74">
                  {activeCollection.checklist.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-2 h-2 w-2 rounded-full bg-primary/60" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {activeCollection.externalLink ? (
                  <div className="rounded-[1.1rem] border border-primary/10 bg-white p-4 text-sm leading-6 text-foreground/72">
                    <p className="font-semibold text-foreground">Official Monarch Watch guidance</p>
                    <SmartLink
                      href={activeCollection.externalLink.href}
                      className="mt-2 inline-flex font-semibold text-primary transition hover:underline"
                    >
                      {activeCollection.externalLink.label}
                    </SmartLink>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}

        <p className="text-sm leading-6 text-foreground/68">
          Showing {results.length} plant{results.length === 1 ? "" : "s"}
          {activeCollection ? ` in ${activeCollection.title}` : " in the full library"}
          {query ? ` for “${query}”` : ""}.
        </p>
        {activeCollection || query ? (
          <div className="flex flex-wrap gap-2">
            {!activeCollection ? null : (
              <Badge className="bg-primary/10 text-primary">{activeCollection.title}</Badge>
            )}
            {query ? <Badge variant="secondary" className="bg-white">Searching “{query}”</Badge> : null}
            {activeCollection || query ? (
              <SmartLink
                href="/resources/plants"
                className="rounded-full border border-primary/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-foreground transition hover:border-primary/20 hover:bg-primary/5"
              >
                Reset all
              </SmartLink>
            ) : null}
          </div>
        ) : null}

        {results.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {results.map((plant) => (
              <Link
                key={plant.scientificName}
                href={`/resources/plants/${slugifyPlantName(plant.scientificName)}`}
                className="rounded-[1.5rem] border border-primary/10 bg-white/84 p-5 shadow-[0_16px_48px_rgba(37,58,40,0.07)] transition hover:-translate-y-0.5 hover:border-primary/20"
              >
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{plant.plantType}</Badge>
                  {plant.chapterRecommended ? <Badge>Chapter recommended</Badge> : null}
                  {plant.hostValue ? <Badge variant="secondary">Host plant</Badge> : null}
                  {plant.pollinatorValue ? <Badge variant="secondary">Pollinator value</Badge> : null}
                </div>
                <h4 className="mt-4 font-heading text-2xl leading-tight text-foreground">
                  {plant.commonName}
                </h4>
                <p className="mt-2 text-sm italic text-foreground/68">{plant.scientificName}</p>
                <p className="mt-4 text-sm leading-6 text-foreground/72">{plant.pollinatorValue}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary/70">
                  Counties: Fayette {plant.countyRelevance.fayette} · Colorado {plant.countyRelevance.colorado} · Lavaca {plant.countyRelevance.lavaca}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-[1.8rem] border border-dashed border-primary/20 bg-[#F7F4E8] p-6">
            <h4 className="font-heading text-2xl text-foreground">
              No plants match that search
            </h4>
            <p className="mt-3 text-base leading-7 text-foreground/72">
              Try a broader keyword or reset the collection to return to the full Tri-County library.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
