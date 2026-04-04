import { Badge } from "@/components/ui/badge";
import { SmartLink } from "@/components/shared/smart-link";
import type { NativePlantSourceCard } from "@/data/native-plant-sourcing";

type SourcingSourceCardsProps = {
  cards: NativePlantSourceCard[];
};

export function SourcingSourceCards({ cards }: SourcingSourceCardsProps) {
  if (!cards.length) {
    return (
      <div className="rounded-[1.7rem] border border-dashed border-primary/20 bg-[#F7F4E8] p-6 shadow-[0_18px_60px_rgba(39,59,42,0.06)]">
        <h2 className="font-heading text-2xl text-foreground">Verified source cards are added manually</h2>
        <p className="mt-3 max-w-3xl text-base leading-7 text-foreground/72">
          This page is ready for nursery, grower, and seed-source cards once the chapter has manually verified a
          local source. Only chapter-checked provenance should be added here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <article
          key={`${card.vendorName}-${card.provenanceClaim}`}
          className="rounded-[1.6rem] border border-primary/10 bg-white/84 p-5 shadow-[0_16px_48px_rgba(37,58,40,0.07)]"
        >
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{card.offeringType}</Badge>
            {card.triCountyLocalProvenanceChip ? (
              <Badge className="bg-primary/10 text-primary">Tri-County Local Provenance!</Badge>
            ) : null}
          </div>
          <h3 className="mt-4 font-heading text-2xl leading-tight text-foreground">{card.vendorName}</h3>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm leading-6 text-foreground/72">
            {card.city ? <span>{card.city}</span> : null}
            {card.county ? <span>{card.county} County</span> : null}
          </div>
          <p className="mt-3 text-sm leading-6 text-foreground/76">{card.provenanceClaim}</p>
          {card.provenanceArea ? (
            <p className="mt-2 text-sm leading-6 text-foreground/70">{card.provenanceArea}</p>
          ) : null}
          {card.notes ? <p className="mt-2 text-sm leading-6 text-foreground/70">{card.notes}</p> : null}
          {card.vendorUrl ? (
            <SmartLink
              href={card.vendorUrl}
              className="mt-4 inline-flex rounded-full border border-primary/10 bg-white px-4 py-2 text-sm font-semibold text-foreground transition hover:border-primary/20 hover:bg-primary/5"
            >
              Visit source
            </SmartLink>
          ) : null}
        </article>
      ))}
    </div>
  );
}
