import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { SmartLink } from "@/components/shared/smart-link";
import type { PlantEntry } from "@/data/plant-library";
import { slugifyPlantName } from "@/data/plant-library-index";
import type { StarterCollection } from "@/data/plant-library-collections";

type StarterCollectionPageProps = {
  collection: StarterCollection;
};

export function StarterCollectionPage({ collection }: StarterCollectionPageProps) {
  const plants = collection.plants;

  return (
    <div className="space-y-10">
      <section className="rounded-[1.8rem] border border-primary/10 bg-white/84 p-6 shadow-[0_18px_60px_rgba(39,58,40,0.08)] sm:p-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/70">Starter collection</p>
          <h1 className="mt-3 font-heading text-4xl text-foreground sm:text-5xl">{collection.title}</h1>
          <p className="mt-4 text-lg leading-8 text-foreground/72">{collection.intro}</p>
          <p className="mt-3 text-base leading-7 text-foreground/68">{collection.description}</p>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <SmartLink
            href="/resources/plants"
            className="rounded-full border border-primary/10 bg-white px-4 py-2 text-sm font-semibold text-foreground transition hover:border-primary/20 hover:bg-primary/5"
          >
            Back to Tri-County Native Plants
          </SmartLink>
          <SmartLink
            href="/resources/plants#starter-collections"
            className="rounded-full border border-primary/10 bg-white px-4 py-2 text-sm font-semibold text-foreground transition hover:border-primary/20 hover:bg-primary/5"
          >
            Browse all starter collections
          </SmartLink>
        </div>
      </section>

      {collection.checklist?.length ? (
        <section className="rounded-[1.8rem] border border-primary/10 bg-[#f7f4e8] p-6 shadow-[0_18px_60px_rgba(39,58,40,0.06)] sm:p-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/70">Collection guidance</p>
            <h2 className="mt-3 font-heading text-3xl text-foreground">{collection.title} checklist</h2>
            <p className="mt-3 text-base leading-7 text-foreground/72">
              Use this short checklist as a practical starting point. It helps frame the collection without claiming
              chapter certification or replacing the plant detail pages.
            </p>
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
            <ul className="space-y-2 text-sm leading-6 text-foreground/74">
              {collection.checklist.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 rounded-full bg-primary/60" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            {collection.externalLink ? (
              <div className="rounded-[1.4rem] border border-primary/10 bg-white p-4 text-sm leading-6 text-foreground/72">
                <p className="font-semibold text-foreground">{collection.externalLink.label}</p>
                <SmartLink href={collection.externalLink.href} className="mt-2 inline-flex font-semibold text-primary transition hover:underline">
                  {collection.externalLink.label}
                </SmartLink>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="space-y-4">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/70">Recommended species</p>
          <h2 className="mt-3 font-heading text-3xl text-foreground">Plants pulled from the chapter library</h2>
          <p className="mt-3 text-lg leading-8 text-foreground/72">
            These cards come directly from the chapter-owned plant library and point back to plant detail pages for
            county fit, planting guidance, and approved-image support.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {plants.map((plant) => (
            <PlantCard key={plant.scientificName} plant={plant} />
          ))}
        </div>
      </section>

      {collection.references?.length ? (
        <section className="rounded-[1.8rem] border border-primary/10 bg-white/84 p-6 shadow-[0_18px_60px_rgba(39,58,40,0.08)] sm:p-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/70">Further reading</p>
            <h2 className="mt-3 font-heading text-3xl text-foreground">Useful references</h2>
            <p className="mt-3 text-base leading-7 text-foreground/72">
              These compact references support the chapter&apos;s own plant content without replacing it.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {collection.references.map((reference) => (
              <article
                key={reference.href}
                className="rounded-[1.5rem] border border-primary/10 bg-[#f7f4e8] p-5"
              >
                <h3 className="font-heading text-2xl text-foreground">{reference.label}</h3>
                <p className="mt-2 text-sm leading-6 text-foreground/72">{reference.description}</p>
                <SmartLink
                  href={reference.href}
                  className="mt-4 inline-flex rounded-full border border-primary/10 bg-white px-4 py-2 text-sm font-semibold text-foreground transition hover:border-primary/20 hover:bg-primary/5"
                >
                  Visit reference
                </SmartLink>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function PlantCard({ plant }: { plant: PlantEntry }) {
  return (
    <Link
      href={`/resources/plants/${slugifyPlantName(plant.scientificName)}`}
      className="rounded-[1.5rem] border border-primary/10 bg-white/84 p-5 shadow-[0_16px_48px_rgba(37,58,40,0.07)] transition hover:-translate-y-0.5 hover:border-primary/20"
    >
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary">{plant.plantType}</Badge>
        {plant.chapterRecommended ? <Badge>Chapter recommended</Badge> : null}
        {plant.hostValue ? <Badge variant="secondary">Host plant</Badge> : null}
        {plant.pollinatorValue ? <Badge variant="secondary">Pollinator value</Badge> : null}
      </div>
      <h3 className="mt-4 font-heading text-2xl leading-tight text-foreground">{plant.commonName}</h3>
      <p className="mt-2 text-sm italic text-foreground/68">{plant.scientificName}</p>
      <p className="mt-4 text-sm leading-6 text-foreground/72">{plant.pollinatorValue}</p>
      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary/70">
        Counties: Fayette {plant.countyRelevance.fayette} · Colorado {plant.countyRelevance.colorado} · Lavaca {plant.countyRelevance.lavaca}
      </p>
    </Link>
  );
}
