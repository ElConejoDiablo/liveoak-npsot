import type { CoverTheme } from "@/lib/blog";

export type PublicImageryKey =
  | CoverTheme
  | "homelandscape"
  | "aboutchapter"
  | "fieldnotes"
  | "learning"
  | "stewardship"
  | "documents"
  | "resourcehub";

export const publicImagery: Record<
  PublicImageryKey,
  {
    src: string;
    alt: string;
    mobileSrc?: string;
    width?: number;
    height?: number;
    mobileWidth?: number;
    mobileHeight?: number;
  }
> = {
  savanna: {
    src: "/mock-imagery/oak-savanna.svg",
    alt: "Oak savanna with native grasses and warm evening light in south-central Texas.",
  },
  bluebonnet: {
    src: "/mock-imagery/bluebonnet-prairie.svg",
    alt: "Bluebonnets and spring wildflowers across a Texas prairie meadow.",
  },
  pollinator: {
    src: "/mock-imagery/pollinator-garden.svg",
    alt: "Pollinator planting with native blooms, goldenrod, and butterflies.",
  },
  monarch: {
    src: "/mock-imagery/monarch-habitat.svg",
    alt: "Monarch butterflies moving through native habitat near milkweed and asters.",
  },
  community: {
    src: "/mock-imagery/chapter-gathering.svg",
    alt: "Chapter volunteers and visitors gathered in a native planting space.",
  },
  homelandscape: {
    src: "/hero-images/liveoak-home-hero-oak-savanna-desktop-2400.webp",
    mobileSrc: "/hero-images/liveoak-home-hero-oak-savanna-mobile-1200.webp",
    alt: "Wildflowers and native grasses around a pond in an oak savanna landscape",
    width: 2400,
    height: 1125,
    mobileWidth: 1200,
    mobileHeight: 1500,
  },
  aboutchapter: {
    src: "/hero-images/liveoak-about-hero-chapter-gathering-desktop-2400.webp",
    mobileSrc: "/hero-images/liveoak-about-hero-chapter-gathering-mobile-1200.webp",
    alt: "Chapter members and students gathered in a wildflower meadow during a native plant learning walk",
    width: 2400,
    height: 1350,
    mobileWidth: 1200,
    mobileHeight: 1500,
  },
  fieldnotes: {
    src: "/hero-images/liveoak-news-hero-field-notes-desktop-2400.webp",
    mobileSrc: "/hero-images/liveoak-news-hero-field-notes-mobile-1200.webp",
    alt: "Person photographing a monarch butterfly in a meadow while recording the sighting on a phone",
    width: 2400,
    height: 1350,
    mobileWidth: 1200,
    mobileHeight: 1500,
  },
  learning: {
    src: "/hero-images/liveoak-programs-hero-native-garden-desktop-2400.webp",
    mobileSrc: "/hero-images/liveoak-programs-hero-native-garden-mobile-1200.webp",
    alt: "Small group planting a native Texas garden with flowering plants and blue-eyed grass in a residential yard",
    width: 2400,
    height: 1350,
    mobileWidth: 1200,
    mobileHeight: 1500,
  },
  stewardship: {
    src: "/hero-images/liveoak-volunteer-hero-stewardship-workday-desktop-2400.webp",
    mobileSrc: "/hero-images/liveoak-volunteer-hero-stewardship-workday-mobile-1200.webp",
    alt: "Volunteers planting native grasses together during a habitat restoration workday beneath oak trees",
    width: 2400,
    height: 1350,
    mobileWidth: 1200,
    mobileHeight: 1500,
  },
  documents: {
    src: "/mock-imagery/document-table.svg",
    alt: "Chapter handouts, notes, and plant references arranged on a tabletop.",
  },
  resourcehub: {
    src: "/hero-images/liveoak-resources-hero-local-reference-table-desktop-2400.webp",
    mobileSrc: "/hero-images/liveoak-resources-hero-local-reference-table-mobile-1200.webp",
    alt: "Chapter members gathered around a garden table comparing native plant samples, notes, and field guides",
    width: 2400,
    height: 1350,
    mobileWidth: 1200,
    mobileHeight: 1500,
  },
};
