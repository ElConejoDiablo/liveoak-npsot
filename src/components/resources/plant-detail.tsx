import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-styles";
import { SmartLink } from "@/components/shared/smart-link";
import type { PlantLibraryItem } from "@/data/plant-library-index";
import type { PlantCountyRelevance } from "@/data/plant-library";
import type { PlantImageRecord } from "@/lib/plants/images";
import { PlantImageGallery } from "@/components/resources/plant-image-gallery";
import { cn } from "@/lib/utils";

type PlantDetailProps = {
  plant: PlantLibraryItem;
  approvedImages?: PlantImageRecord[];
  canManageImages?: boolean;
  manageImagesHref?: string;
};

const countyLabel = (value: PlantCountyRelevance) => {
  switch (value) {
    case "native":
      return "Native";
    case "likely":
      return "Likely";
    case "ecoregion-suitable":
      return "Ecoregion-suitable";
    case "review":
      return "Review";
  }
};

export function PlantDetail({ plant, approvedImages = [], canManageImages = false, manageImagesHref }: PlantDetailProps) {
  const imageApproved = approvedImages.length > 0;
  const countyEntries: Array<[string, PlantCountyRelevance]> = [
    ["Fayette", plant.countyRelevance.fayette],
    ["Colorado", plant.countyRelevance.colorado],
    ["Lavaca", plant.countyRelevance.lavaca],
  ];
  const traitBadges = [
    plant.chapterRecommended ? "Good starter plant" : null,
    plant.pollinatorValue ? "Pollinator value" : null,
    plant.hostValue ? "Host plant" : null,
    plant.plantType === "grass" ? "Prairie structure" : null,
    plant.sun.toLowerCase().includes("full sun") ? "Sun" : null,
    plant.sun.toLowerCase().includes("part shade") ? "Part shade" : null,
    plant.moisture.toLowerCase().includes("wet") || plant.moisture.toLowerCase().includes("moist")
      ? "Wet areas"
      : null,
    plant.moisture.toLowerCase().includes("dry") ? "Drought-tolerant" : null,
  ].filter((badge): badge is string => Boolean(badge));

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
      <article className="space-y-6 rounded-[1.8rem] border border-primary/10 bg-white/84 p-6 shadow-[0_18px_60px_rgba(37,58,40,0.08)]">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{plant.plantType}</Badge>
          {plant.chapterRecommended ? <Badge>Chapter recommended</Badge> : null}
        </div>
        <div className="flex flex-wrap gap-2">
          {traitBadges.map((badge) => (
            <Badge key={badge} variant="secondary" className="bg-[#f6f2e4] text-foreground">
              {badge}
            </Badge>
          ))}
        </div>
        <div>
          <h1 className="font-heading text-4xl leading-tight text-foreground">
            {plant.commonName}
          </h1>
          <p className="mt-2 text-lg italic text-foreground/68">{plant.scientificName}</p>
          <p className="mt-1 text-sm text-foreground/60">{plant.family}</p>
        </div>

        <section className="space-y-3">
          <h2 className="font-heading text-2xl text-foreground">Photo</h2>
          {imageApproved ? (
            <PlantImageGallery plantName={plant.commonName} images={approvedImages} />
          ) : (
            <div className="rounded-[1.5rem] border border-dashed border-primary/20 bg-[#faf8f0] p-6">
              <p className="font-medium text-foreground">No approved image yet</p>
              <p className="mt-2 text-sm leading-6 text-foreground/72">
                This page is ready for chapter-approved photography. Approved images will show here, and
                the library will not publish unapproved third-party images.
              </p>
            </div>
          )}
          {canManageImages && manageImagesHref ? (
            <div className="flex flex-wrap gap-3">
              <SmartLink
                href={manageImagesHref}
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "rounded-full border-primary/15 bg-white/85 px-4",
                )}
              >
                Manage images
              </SmartLink>
            </div>
          ) : null}
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-2xl text-foreground">Plant notes</h2>
          <dl className="grid gap-4 sm:grid-cols-2">
            {[
              ["Growth form", plant.growthForm],
              ["Lifespan", plant.lifespan],
              ["Size", plant.sizeRange],
              ["Bloom", `${plant.bloomSeason} · ${plant.bloomColor}`],
              ["Sun", plant.sun],
              ["Moisture", plant.moisture],
              ["Soil", plant.soilNotes],
              ["Habitat", plant.habitatNotes],
            ].map(([label, value]) => (
              <div key={label} className="rounded-[1rem] border border-primary/10 bg-[#fbf9f2] p-4">
                <dt className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/70">{label}</dt>
                <dd className="mt-2 text-sm leading-6 text-foreground/78">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-2xl text-foreground">Ecology</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1rem] border border-primary/10 bg-[#fbf9f2] p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/70">Pollinator value</p>
              <p className="mt-2 text-sm leading-6 text-foreground/76">{plant.pollinatorValue}</p>
            </div>
            <div className="rounded-[1rem] border border-primary/10 bg-[#fbf9f2] p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/70">Local fit</p>
              <p className="mt-2 text-sm leading-6 text-foreground/76">
                {plant.chapterRecommended
                  ? "Strong chapter starter for native-garden and habitat use."
                  : "Useful local-fit candidate to review for the right site and county context."}
              </p>
            </div>
          </div>
          {plant.localUseNote ? (
            <div className="rounded-[1rem] border border-primary/10 bg-[#fbf9f2] p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/70">Local use</p>
              <p className="mt-2 text-sm leading-6 text-foreground/76">{plant.localUseNote}</p>
            </div>
          ) : null}
          {plant.hostValue ? (
            <div className="rounded-[1rem] border border-primary/10 bg-[#fbf9f2] p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/70">Host plant</p>
              <p className="mt-2 text-sm leading-6 text-foreground/76">
                {plant.hostValue}
                {plant.hostSpeciesNotes ? ` ${plant.hostSpeciesNotes}` : ""}
              </p>
            </div>
          ) : null}
          {plant.seasonalRole ? (
            <div className="rounded-[1rem] border border-primary/10 bg-[#fbf9f2] p-4">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/70">Seasonal role</p>
              <p className="mt-2 text-sm leading-6 text-foreground/76">{plant.seasonalRole}</p>
            </div>
          ) : null}
        </section>

        {plant.plantingSeason || plant.plantingNotes || plant.spreadHabitNotes || plant.maintenanceNotes || plant.cautions || plant.bestLocalUse || plant.localFitNotes ? (
          <section className="space-y-3">
            <h2 className="font-heading text-2xl text-foreground">Planting guidance</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {plant.plantingSeason ? (
                <div className="rounded-[1rem] border border-primary/10 bg-[#fbf9f2] p-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/70">Planting season</p>
                  <p className="mt-2 text-sm leading-6 text-foreground/76">{plant.plantingSeason}</p>
                </div>
              ) : null}
              {plant.bestLocalUse ? (
                <div className="rounded-[1rem] border border-primary/10 bg-[#fbf9f2] p-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/70">Best local use</p>
                  <p className="mt-2 text-sm leading-6 text-foreground/76">{plant.bestLocalUse}</p>
                </div>
              ) : null}
              {plant.plantingNotes ? (
                <div className="rounded-[1rem] border border-primary/10 bg-[#fbf9f2] p-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/70">Planting notes</p>
                  <p className="mt-2 text-sm leading-6 text-foreground/76">{plant.plantingNotes}</p>
                </div>
              ) : null}
              {plant.localFitNotes ? (
                <div className="rounded-[1rem] border border-primary/10 bg-[#fbf9f2] p-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/70">Local fit</p>
                  <p className="mt-2 text-sm leading-6 text-foreground/76">{plant.localFitNotes}</p>
                </div>
              ) : null}
              {plant.spreadHabitNotes ? (
                <div className="rounded-[1rem] border border-primary/10 bg-[#fbf9f2] p-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/70">Spread / habit</p>
                  <p className="mt-2 text-sm leading-6 text-foreground/76">{plant.spreadHabitNotes}</p>
                </div>
              ) : null}
              {plant.maintenanceNotes ? (
                <div className="rounded-[1rem] border border-primary/10 bg-[#fbf9f2] p-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/70">Maintenance</p>
                  <p className="mt-2 text-sm leading-6 text-foreground/76">{plant.maintenanceNotes}</p>
                </div>
              ) : null}
              {plant.cautions ? (
                <div className="rounded-[1rem] border border-primary/10 bg-[#fbf9f2] p-4 sm:col-span-2">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary/70">Cautions</p>
                  <p className="mt-2 text-sm leading-6 text-foreground/76">{plant.cautions}</p>
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

        {plant.buyLocalWithProvenance?.length ? (
          <section className="space-y-3">
            <h2 className="font-heading text-2xl text-foreground">Buy Local with Provenance</h2>
            <div className="space-y-4">
              {plant.buyLocalWithProvenance.map((entry) => (
                <div key={`${entry.vendorName}-${entry.provenanceClaim}`} className="rounded-[1rem] border border-primary/10 bg-[#fbf9f2] p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">{entry.vendorName}</p>
                    <Badge variant="secondary" className="bg-white">
                      {entry.offeringType}
                    </Badge>
                    {entry.verifiedByChapter ? (
                      <Badge variant="secondary" className="bg-white">
                        Chapter verified
                      </Badge>
                    ) : null}
                  </div>
                  {entry.provenanceClaim ? (
                    <p className="mt-2 text-sm leading-6 text-foreground/76">{entry.provenanceClaim}</p>
                  ) : null}
                  <div className="mt-2 flex flex-wrap gap-3 text-sm leading-6 text-foreground/72">
                    {entry.city ? <span>{entry.city}</span> : null}
                    {entry.county ? <span>{entry.county} County</span> : null}
                    {entry.provenanceArea ? <span>{entry.provenanceArea}</span> : null}
                    {entry.lastVerified ? <span>Last verified: {entry.lastVerified}</span> : null}
                  </div>
                  {entry.notes ? <p className="mt-2 text-sm leading-6 text-foreground/72">{entry.notes}</p> : null}
                  {entry.vendorUrl ? (
                    <a
                      href={entry.vendorUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex rounded-full border border-primary/10 bg-white px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/20 hover:bg-white/90"
                    >
                      Visit vendor
                    </a>
                  ) : null}
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <section className="space-y-3">
          <h2 className="font-heading text-2xl text-foreground">Sources</h2>
          <p className="text-sm leading-6 text-foreground/72">{plant.sourceNotes}</p>
          <div className="flex flex-wrap gap-2">
            {plant.sourceLinks.map((source) => (
              <a
                key={source.href}
                href={source.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-primary/10 bg-[#f6f2e4] px-4 py-2 text-sm font-medium text-foreground transition hover:border-primary/20 hover:bg-white"
              >
                {source.label}
              </a>
            ))}
          </div>
        </section>
      </article>

      <aside className="space-y-6">
        <section className="rounded-[1.8rem] border border-primary/10 bg-[#f8f4e8] p-5 shadow-[0_18px_60px_rgba(37,58,40,0.06)]">
          <h2 className="font-heading text-2xl text-foreground">County relevance</h2>
          <dl className="mt-4 space-y-3 text-sm leading-6 text-foreground/76">
            {countyEntries.map(([county, value]) => (
              <div key={county} className="flex items-center justify-between gap-3 rounded-[1rem] bg-white/80 px-4 py-3">
                <dt className="font-medium text-foreground">{county}</dt>
                <dd>{countyLabel(value)}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 flex flex-wrap gap-2">
            {countyEntries.some(([, value]) => value === "native") ? (
              <Badge variant="secondary" className="bg-white">
                Native county fit
              </Badge>
            ) : null}
            {countyEntries.some(([, value]) => value === "likely") ? (
              <Badge variant="secondary" className="bg-white">
                Likely local fit
              </Badge>
            ) : null}
            {countyEntries.some(([, value]) => value === "ecoregion-suitable") ? (
              <Badge variant="secondary" className="bg-white">
                Ecoregion fit
              </Badge>
            ) : null}
          </div>
          <p className="mt-4 text-sm leading-6 text-foreground/68">{plant.confidenceNotes}</p>
        </section>

        <section className="rounded-[1.8rem] border border-primary/10 bg-white/84 p-5 shadow-[0_18px_60px_rgba(37,58,40,0.06)]">
          <h2 className="font-heading text-2xl text-foreground">Reference set</h2>
          <p className="mt-2 text-sm leading-6 text-foreground/72">
            This page is part of the chapter-owned starter library and will grow as approved images and local review
            are added.
          </p>
          <div className="mt-4">
            <SmartLink href="/resources/plants" className="text-sm font-semibold text-primary transition hover:underline">
              Back to Tri-County Native Plants
            </SmartLink>
          </div>
        </section>
      </aside>
    </div>
  );
}
