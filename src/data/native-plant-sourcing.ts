export type NativePlantSourceCard = {
  // Manual-entry only: provenance details and the Tri-County provenance chip must never be auto-generated.
  vendorName: string;
  vendorUrl?: string;
  city?: string;
  county?: string;
  offeringType: "seed" | "plant" | "seed and plant";
  provenanceClaim: string;
  provenanceArea?: string;
  notes?: string;
  triCountyLocalProvenanceChip?: boolean;
};

export const nativePlantSourceCards: NativePlantSourceCard[] = [];

export const sourcingPageNotes = [
  "Only add source cards that the chapter has manually checked.",
  "Tri-County Local Provenance! chips are manual-entry only and should never be inferred.",
  "The page is ready for nursery cards, seed sellers, and future verified provenance notes.",
] as const;
