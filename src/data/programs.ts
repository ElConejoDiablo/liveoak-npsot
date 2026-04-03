import type { PublicImageryKey } from "@/data/public-imagery";

export type ProgramArea = {
  title: string;
  description: string;
  bullets: string[];
  icon: "sprout" | "binoculars" | "hand-heart" | "megaphone" | "seedling";
  artVariant: PublicImageryKey;
};

export type SeasonalHighlight = {
  season: string;
  title: string;
  description: string;
  plants: string[];
  artVariant: PublicImageryKey;
};

export type VolunteerPath = {
  title: string;
  description: string;
  examples: string[];
};

export const programAreas: ProgramArea[] = [
  {
    title: "Chapter meetings and talks",
    description:
      "Regular gatherings can introduce visitors to Texas native plants in ways that feel clear, welcoming, and practical.",
    bullets: [
      "Guest speakers, practical topics, and room for plant questions",
      "Useful for homeowners, families, educators, and curious beginners",
      "A steady place to learn about native plants close to home",
    ],
    icon: "sprout",
    artVariant: "eventsmeeting",
  },
  {
    title: "Field trips and plant walks",
    description:
      "Seeing native plants where they grow is one of the best ways to understand them. Chapter outings can move at a comfortable pace and stay beginner-friendly.",
    bullets: [
      "Seasonal walks, habitat observation, and local plant ID practice",
      "Welcoming for all experience levels",
      "A natural bridge between indoor learning and seeing plants in the field",
    ],
    icon: "binoculars",
    artVariant: "aboutchapter",
  },
  {
    title: "Seed stewardship and native gardening",
    description:
      "Seed workshops and garden guidance can help members learn timing, responsible collection, and how to grow locally relevant plants with care.",
    bullets: [
      "Collection ethics, drying, storage, sowing, and sharing basics",
      "A practical starting point for gardeners who want to begin with local species",
      "Well suited to workshops, demonstrations, and seasonal guidance",
    ],
    icon: "seedling",
    artVariant: "learning",
  },
  {
    title: "Habitat care and volunteer workdays",
    description:
      "Volunteer projects can support public learning spaces, native planting areas, and small restoration efforts across the chapter region.",
    bullets: [
      "Workdays sized for real volunteers with varying time and ability",
      "Tasks can include planting, cleanup, observation, and habitat tending",
      "A visible way to care for habitat and learn by doing",
    ],
    icon: "hand-heart",
    artVariant: "stewardship",
  },
  {
    title: "Outreach and community events",
    description:
      "The chapter can be a welcoming local source for better information about native plants, pollinators, and habitat care.",
    bullets: [
      "Community tabling, partner events, and educational collaborations",
      "Simple ways for people to stay involved, volunteer, or join NPSOT",
      "A warm public face for native plants in Fayette, Colorado, and Lavaca Counties",
    ],
    icon: "megaphone",
    artVariant: "aboutchapter",
  },
];

export const seasonalHighlights: SeasonalHighlight[] = [
  {
    season: "Spring",
    title: "Bluebonnet seed timing starts with patience",
    description:
      "Spring wildflower enthusiasm often peaks before seed pods are actually mature. The chapter can help people wait, observe, and collect responsibly.",
    plants: ["Bluebonnet", "Prairie verbena", "Indian paintbrush"],
    artVariant: "homelandscape",
  },
  {
    season: "Summer to Fall",
    title: "Pollinator support depends on sequence, not just one bloom moment",
    description:
      "Turk’s cap, American beautyberry, and goldenrod help stretch nectar, shelter, fruit, and structure across changing seasons for both resident and migrating wildlife.",
    plants: ["Turk’s cap", "American beautyberry", "Goldenrod"],
    artVariant: "fieldnotes",
  },
  {
    season: "Migration season",
    title: "Monarch watching becomes easier with field marks and local habitat clues",
    description:
      "Families and beginners benefit from practical guidance that helps them distinguish monarchs from similar butterflies and understand what they are seeing.",
    plants: ["Milkweed", "Native asters", "Goldenrod"],
    artVariant: "fieldnotes",
  },
];

export const volunteerPaths: VolunteerPath[] = [
  {
    title: "Help with gatherings and hospitality",
    description:
      "Friendly events need calm, capable hands before and after the event, from greeting visitors to helping the room feel organized and welcoming.",
    examples: ["Check-in table", "Room setup", "Refreshments", "Wayfinding"],
  },
  {
    title: "Share skills and local knowledge",
    description:
      "Volunteers can help with writing, photography, plant knowledge, outreach, or logistics without taking on a huge time commitment.",
    examples: [
      "Articles or newsletter support",
      "Plant ID assistance",
      "Photography",
      "Outreach materials",
    ],
  },
  {
    title: "Join stewardship and demonstration efforts",
    description:
      "Hands-on work can include seed activities, native bed maintenance, event support, and small habitat projects around the community.",
    examples: [
      "Seed cleaning",
      "Planting days",
      "Interpretive signage help",
      "Volunteer coordination",
    ],
  },
];
