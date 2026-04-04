import type { CoverTheme } from "@/lib/blog";

export type PublicImageryKey =
  | CoverTheme
  | "homelandscape"
  | "aboutchapter"
  | "eventsmeeting"
  | "eventspastspring"
  | "fieldnotes"
  | "learning"
  | "stewardship"
  | "documents"
  | "newsseasonalblooms"
  | "newsmonarchid"
  | "newsbluebonnetseed"
  | "newsfrogfruithabitat"
  | "programstalks"
  | "programsfieldwalk"
  | "programsseedgarden"
  | "programsoutreach"
  | "volunteersupportworkday"
  | "resourcesreferencehelp"
  | "resourcehub"
  | "tricountynativeplants"
  | "pollinatorscollection"
  | "monarchwaystationcollection"
  | "prairiestructurecollection"
  | "sourcingnativeplants";

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
    supportObjectPosition?: string;
    compactObjectPosition?: string;
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
    supportObjectPosition: "center center",
    compactObjectPosition: "center 58%",
  },
  aboutchapter: {
    src: "/hero-images/liveoak-about-hero-chapter-gathering-desktop-2400.webp",
    mobileSrc: "/hero-images/liveoak-about-hero-chapter-gathering-mobile-1200.webp",
    alt: "Chapter members and students gathered in a wildflower meadow during a native plant learning walk",
    width: 2400,
    height: 1350,
    mobileWidth: 1200,
    mobileHeight: 1500,
    supportObjectPosition: "center center",
    compactObjectPosition: "center 42%",
  },
  eventsmeeting: {
    src: "/hero-images/liveoak-events-hero-chapter-meeting-desktop-2400.webp",
    mobileSrc: "/hero-images/liveoak-events-hero-chapter-meeting-mobile-1200.webp",
    alt: "Outdoor chapter meeting beneath oak trees with a speaker addressing attendees seated in a native plant landscape",
    width: 2400,
    height: 1350,
    mobileWidth: 1200,
    mobileHeight: 1500,
    supportObjectPosition: "center center",
    compactObjectPosition: "center 56%",
  },
  fieldnotes: {
    src: "/hero-images/liveoak-news-hero-field-notes-desktop-2400.webp",
    mobileSrc: "/hero-images/liveoak-news-hero-field-notes-mobile-1200.webp",
    alt: "Person photographing a monarch butterfly in a meadow while recording the sighting on a phone",
    width: 2400,
    height: 1350,
    mobileWidth: 1200,
    mobileHeight: 1500,
    supportObjectPosition: "center center",
    compactObjectPosition: "center center",
  },
  learning: {
    src: "/hero-images/liveoak-programs-hero-native-garden-desktop-2400.webp",
    mobileSrc: "/hero-images/liveoak-programs-hero-native-garden-mobile-1200.webp",
    alt: "Small group planting a native Texas garden with flowering plants and blue-eyed grass in a residential yard",
    width: 2400,
    height: 1350,
    mobileWidth: 1200,
    mobileHeight: 1500,
    supportObjectPosition: "center center",
    compactObjectPosition: "center center",
  },
  stewardship: {
    src: "/hero-images/liveoak-volunteer-hero-stewardship-workday-desktop-2400.webp",
    mobileSrc: "/hero-images/liveoak-volunteer-hero-stewardship-workday-mobile-1200.webp",
    alt: "Volunteers planting native grasses together during a habitat restoration workday beneath oak trees",
    width: 2400,
    height: 1350,
    mobileWidth: 1200,
    mobileHeight: 1500,
    supportObjectPosition: "center center",
    compactObjectPosition: "center center",
  },
  documents: {
    src: "/hero-images/liveoak-documents-support-handouts-table-desktop-1600.webp",
    mobileSrc: "/hero-images/liveoak-documents-support-handouts-table-mobile-1200.webp",
    alt: "Printed chapter handouts, agendas, and plant references arranged on a table for public browsing",
    width: 1600,
    height: 1067,
    mobileWidth: 1200,
    mobileHeight: 1500,
    supportObjectPosition: "center center",
    compactObjectPosition: "center 42%",
  },
  eventspastspring: {
    src: "/hero-images/liveoak-events-past-spring-gathering-cover-desktop-1600.webp",
    mobileSrc: "/hero-images/liveoak-events-past-spring-gathering-cover-mobile-1200.webp",
    alt: "Chapter attendees listening to a speaker during a spring gathering beneath oak trees",
    width: 1600,
    height: 1067,
    mobileWidth: 1200,
    mobileHeight: 1500,
    supportObjectPosition: "center center",
    compactObjectPosition: "center 52%",
  },
  newsseasonalblooms: {
    src: "/hero-images/liveoak-news-seasonal-blooms-cover-desktop-1600.webp",
    mobileSrc: "/hero-images/liveoak-news-seasonal-blooms-cover-mobile-1200.webp",
    alt: "Seasonal native blooms in a Central Texas meadow during field observation",
    width: 1600,
    height: 1067,
    mobileWidth: 1200,
    mobileHeight: 1500,
    supportObjectPosition: "center center",
    compactObjectPosition: "center center",
  },
  newsmonarchid: {
    src: "/hero-images/liveoak-news-monarch-id-cover-desktop-1600.webp",
    mobileSrc: "/hero-images/liveoak-news-monarch-id-cover-mobile-1200.webp",
    alt: "Monarch butterfly on a purple flower while a field guide and camera are used for identification",
    width: 1600,
    height: 1067,
    mobileWidth: 1200,
    mobileHeight: 1500,
    supportObjectPosition: "center center",
    compactObjectPosition: "center center",
  },
  newsbluebonnetseed: {
    src: "/hero-images/liveoak-news-bluebonnet-seed-cover-desktop-1600.webp",
    mobileSrc: "/hero-images/liveoak-news-bluebonnet-seed-cover-mobile-1200.webp",
    alt: "Hand harvesting dried bluebonnet seed pods with loose seeds visible in a field of bluebonnets",
    width: 1600,
    height: 1067,
    mobileWidth: 1200,
    mobileHeight: 1500,
    supportObjectPosition: "center center",
    compactObjectPosition: "center center",
  },
  newsfrogfruithabitat: {
    src: "/hero-images/liveoak-news-frogfruit-habitat-cover-desktop-1600.webp",
    mobileSrc: "/hero-images/liveoak-news-frogfruit-habitat-cover-mobile-1200.webp",
    alt: "Frogfruit growing as a low native ground layer with small blooms and a bee in a Texas garden",
    width: 1600,
    height: 1067,
    mobileWidth: 1200,
    mobileHeight: 1500,
    supportObjectPosition: "center center",
    compactObjectPosition: "center center",
  },
  programstalks: {
    src: "/hero-images/liveoak-programs-talks-support-desktop-1600.webp",
    mobileSrc: "/hero-images/liveoak-programs-talks-support-mobile-1200.webp",
    alt: "Chapter speaker addressing attendees during a native plant learning talk",
    width: 1600,
    height: 1200,
    mobileWidth: 1200,
    mobileHeight: 1500,
    supportObjectPosition: "center center",
    compactObjectPosition: "center center",
  },
  programsfieldwalk: {
    src: "/hero-images/liveoak-programs-field-walk-support-desktop-1600.webp",
    mobileSrc: "/hero-images/liveoak-programs-field-walk-support-mobile-1200.webp",
    alt: "Participants observing native plants during a chapter field walk in Central Texas",
    width: 1600,
    height: 1200,
    mobileWidth: 1200,
    mobileHeight: 1500,
    supportObjectPosition: "center center",
    compactObjectPosition: "center center",
  },
  programsseedgarden: {
    src: "/hero-images/liveoak-programs-seed-garden-support-desktop-1600.webp",
    mobileSrc: "/hero-images/liveoak-programs-seed-garden-support-mobile-1200.webp",
    alt: "Hands-on native seed work and gardening during a chapter learning activity",
    width: 1600,
    height: 1200,
    mobileWidth: 1200,
    mobileHeight: 1500,
    supportObjectPosition: "center center",
    compactObjectPosition: "center center",
  },
  programsoutreach: {
    src: "/hero-images/liveoak-programs-outreach-support-desktop-1600.webp",
    mobileSrc: "/hero-images/liveoak-programs-outreach-support-mobile-1200.webp",
    alt: "Chapter members speaking with visitors at a public native plant outreach table",
    width: 1600,
    height: 1200,
    mobileWidth: 1200,
    mobileHeight: 1500,
    supportObjectPosition: "center center",
    compactObjectPosition: "center center",
  },
  volunteersupportworkday: {
    src: "/hero-images/liveoak-volunteer-support-workday-desktop-1600.webp",
    mobileSrc: "/hero-images/liveoak-volunteer-support-workday-mobile-1200.webp",
    alt: "Volunteers planting and clearing habitat together during a chapter workday",
    width: 1600,
    height: 1200,
    mobileWidth: 1200,
    mobileHeight: 1500,
    supportObjectPosition: "center center",
    compactObjectPosition: "center center",
  },
  resourcesreferencehelp: {
    src: "/hero-images/liveoak-resources-cta-reference-help-desktop-1600.webp",
    mobileSrc: "/hero-images/liveoak-resources-cta-reference-help-mobile-1200.webp",
    alt: "Chapter member helping a visitor compare plant guides and reference materials at an outdoor table",
    width: 1600,
    height: 1200,
    mobileWidth: 1200,
    mobileHeight: 1500,
    supportObjectPosition: "center center",
    compactObjectPosition: "center center",
  },
  resourcehub: {
    src: "/hero-images/liveoak-resources-hero-local-reference-table-desktop-2400.webp",
    mobileSrc: "/hero-images/liveoak-resources-hero-local-reference-table-mobile-1200.webp",
    alt: "Chapter members gathered around a garden table comparing native plant samples, notes, and field guides",
    width: 2400,
    height: 1350,
    mobileWidth: 1200,
    mobileHeight: 1500,
    supportObjectPosition: "center center",
    compactObjectPosition: "center 44%",
  },
  tricountynativeplants: {
    src: "/hero-images/liveoak-plants-hero-xeriscape-desktop-2400.webp",
    mobileSrc: "/hero-images/liveoak-plants-hero-xeriscape-mobile-1200.webp",
    alt: "Xeriscape backyard with native Texas plants, grasses, bluebonnets, Mexican hat flowers, Turk’s cap, and a terracotta water feature",
    width: 2400,
    height: 1350,
    mobileWidth: 1200,
    mobileHeight: 1500,
    supportObjectPosition: "center center",
    compactObjectPosition: "center 48%",
  },
  pollinatorscollection: {
    src: "/hero-images/liveoak-collection-pollinators-hero-desktop-2400.webp",
    mobileSrc: "/hero-images/liveoak-collection-pollinators-hero-mobile-1200.webp",
    alt: "Native pollinator garden with bluebonnets, purple verbena, blue-eyed grass, antelope-horns blossoms, bees, and Anise Swallowtail butterflies",
    width: 2400,
    height: 1350,
    mobileWidth: 1200,
    mobileHeight: 1500,
    supportObjectPosition: "center center",
    compactObjectPosition: "center 46%",
  },
  monarchwaystationcollection: {
    src: "/hero-images/liveoak-collection-monarch-waystation-hero-desktop-2400.webp",
    mobileSrc: "/hero-images/liveoak-collection-monarch-waystation-hero-mobile-1200.webp",
    alt: "Suburban Monarch Waystation starter garden with milkweed, dill, a young live oak, native flowers, and butterflies in a front-yard habitat bed",
    width: 2400,
    height: 1350,
    mobileWidth: 1200,
    mobileHeight: 1500,
    supportObjectPosition: "center center",
    compactObjectPosition: "center 48%",
  },
  prairiestructurecollection: {
    src: "/hero-images/liveoak-collection-prairie-structure-hero-desktop-2400.webp",
    mobileSrc: "/hero-images/liveoak-collection-prairie-structure-hero-mobile-1200.webp",
    alt: "Native prairie-style planting with layered Texas grasses, restrained wildflower accents, and a maintained path",
    width: 2400,
    height: 1350,
    mobileWidth: 1200,
    mobileHeight: 1500,
    supportObjectPosition: "center center",
    compactObjectPosition: "center 48%",
  },
  sourcingnativeplants: {
    src: "/hero-images/liveoak-sourcing-hero-nursery-desktop-2400.webp",
    mobileSrc: "/hero-images/liveoak-sourcing-hero-nursery-mobile-1200.webp",
    alt: "Outdoor native plant nursery with shoppers browsing local native plants and seed racks beneath oak trees",
    width: 2400,
    height: 1350,
    mobileWidth: 1200,
    mobileHeight: 1500,
    supportObjectPosition: "center center",
    compactObjectPosition: "center 44%",
  },
};
