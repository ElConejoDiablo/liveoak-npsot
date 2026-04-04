import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { slugifyPlantName } from "@/data/plant-library-index";
import type { StarterCollection } from "@/data/plant-library-collections";

type PlantLibraryCollectionsProps = {
  collections: StarterCollection[];
};

export function PlantLibraryCollections({ collections }: PlantLibraryCollectionsProps) {
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
            className="rounded-[1.6rem] border border-primary/10 bg-white/84 p-5 shadow-[0_16px_48px_rgba(37,58,40,0.07)]"
          >
            <h4 className="font-heading text-2xl text-foreground">{collection.title}</h4>
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
            <p className="mt-4 text-sm leading-6 text-foreground/68">
              Showing {collection.plants.length} plants in this starter grouping.
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
