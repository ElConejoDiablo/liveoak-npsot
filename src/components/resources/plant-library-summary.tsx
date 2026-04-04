import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { slugifyPlantName } from "@/data/plant-library-index";

import type { PlantLibraryGroup } from "@/data/plant-library";

type PlantLibrarySummaryProps = {
  groups: PlantLibraryGroup[];
};

export function PlantLibrarySummary({ groups }: PlantLibrarySummaryProps) {
  const totalPlants = groups.reduce((count, group) => count + group.plants.length, 0);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-[1.6rem] border border-primary/10 bg-white/78 p-5 shadow-[0_18px_60px_rgba(39,59,42,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/70">
            Starter Set
          </p>
          <p className="mt-3 font-heading text-4xl text-foreground">
            {totalPlants}
          </p>
          <p className="mt-2 text-sm leading-6 text-foreground/70">
            Curated local-first plants to seed the library.
          </p>
        </div>
        {groups.map((group) => (
          <div
            key={group.title}
            className="rounded-[1.6rem] border border-primary/10 bg-[#F7F4E8] p-5 shadow-[0_18px_60px_rgba(39,59,42,0.06)]"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/70">
              {group.title}
            </p>
            <p className="mt-3 font-heading text-4xl text-foreground">
              {group.plants.length}
            </p>
            <p className="mt-2 text-sm leading-6 text-foreground/70">
              {group.description}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        {groups.map((group) => (
          <section key={group.title} className="space-y-4">
            <div className="max-w-3xl">
              <h3 className="font-heading text-3xl text-foreground">
                {group.title}
              </h3>
              <p className="mt-2 text-lg leading-8 text-foreground/74">
                {group.description}
              </p>
            </div>
            <div className="grid gap-4 lg:grid-cols-3">
              {group.plants.slice(0, 3).map((plant) => (
                <article
                  key={plant.scientificName}
                  className="rounded-[1.5rem] border border-primary/10 bg-white/82 p-5 shadow-[0_16px_48px_rgba(37,58,40,0.07)]"
                >
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{plant.plantType}</Badge>
                    {plant.chapterRecommended ? (
                      <Badge>Chapter Recommended</Badge>
                    ) : null}
                  </div>
                  <h4 className="mt-4 font-heading text-2xl leading-tight text-foreground">
                    <Link
                      href={`/resources/plants/${slugifyPlantName(plant.scientificName)}`}
                      className="transition hover:text-primary"
                    >
                      {plant.commonName}
                    </Link>
                  </h4>
                  <p className="mt-2 text-sm italic text-foreground/68">
                    {plant.scientificName}
                  </p>
                  <dl className="mt-4 space-y-2 text-sm leading-6 text-foreground/72">
                    <div>
                      <dt className="font-semibold text-foreground/86">Bloom</dt>
                      <dd>{plant.bloomSeason} · {plant.bloomColor}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-foreground/86">Site</dt>
                      <dd>{plant.sun} · {plant.moisture}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-foreground/86">Counties</dt>
                      <dd>
                        Fayette {plant.countyRelevance.fayette}, Colorado {plant.countyRelevance.colorado}, Lavaca {plant.countyRelevance.lavaca}
                      </dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
