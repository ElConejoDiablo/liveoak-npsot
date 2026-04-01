export type ProgramArea = {
  title: string;
  description: string;
  bullets: string[];
  icon: "sprout" | "binoculars" | "hand-heart" | "megaphone" | "seedling";
  artVariant: "savanna" | "pollinator" | "bluebonnet" | "community";
};

export type SeasonalHighlight = {
  season: string;
  title: string;
  description: string;
  plants: string[];
  artVariant: "bluebonnet" | "pollinator" | "monarch" | "community";
};

export type VolunteerPath = {
  title: string;
  description: string;
  examples: string[];
};

export const programAreas: ProgramArea[] = [
  {
    title: "Education and chapter programs",
    description:
      "Monthly gatherings can introduce visitors to Texas native plants without making the information feel inaccessible or overly technical.",
    bullets: [
      "Guest speakers, practical topics, and room for plant questions",
      "Useful for homeowners, families, educators, and curious beginners",
      "Ready for both in-person and future hybrid chapter formats",
    ],
    icon: "sprout",
    artVariant: "savanna",
  },
  {
    title: "Field trips and plant walks",
    description:
      "Seeing native plants where they grow is one of the fastest ways to make ecology legible. Chapter outings can move at a human pace and stay beginner-friendly.",
    bullets: [
      "Seasonal walks, habitat observation, and local plant ID practice",
      "Designed to be useful for all experience levels",
      "A good bridge between learning indoors and seeing living systems outside",
    ],
    icon: "binoculars",
    artVariant: "pollinator",
  },
  {
    title: "Seed stewardship and native gardening",
    description:
      "Seed-focused programming helps members understand timing, genetics, responsible collection, and how to grow locally relevant plants with care.",
    bullets: [
      "Collection ethics, drying, storage, sowing, and sharing basics",
      "A practical pathway for gardeners who want to begin with local species",
      "Strong fit for workshops, demos, and seasonal resource guides",
    ],
    icon: "seedling",
    artVariant: "bluebonnet",
  },
  {
    title: "Habitat care and volunteer workdays",
    description:
      "Volunteer projects can support public learning spaces, native planting areas, and small restoration efforts that help the chapter stay visible and useful.",
    bullets: [
      "Workdays sized for real volunteers with varying time and ability",
      "Tasks can include planting, cleanup, observation, and habitat tending",
      "A steady way to translate chapter values into public example",
    ],
    icon: "hand-heart",
    artVariant: "community",
  },
  {
    title: "Outreach and community connection",
    description:
      "The chapter can be a friendly local touchpoint for people who want better information about natives, pollinators, and conservation-minded land care.",
    bullets: [
      "Community tabling, partner events, and educational collaborations",
      "Clear invitations for membership, volunteering, and staying connected",
      "A warm public face for native plants in Fayette, Colorado, and Lavaca Counties",
    ],
    icon: "megaphone",
    artVariant: "savanna",
  },
];

export const seasonalHighlights: SeasonalHighlight[] = [
  {
    season: "Spring",
    title: "Bluebonnet seed timing starts with patience",
    description:
      "Spring wildflower enthusiasm often peaks before seed pods are actually mature. The chapter can help people wait, observe, and collect responsibly.",
    plants: ["Bluebonnet", "Prairie verbena", "Indian paintbrush"],
    artVariant: "bluebonnet",
  },
  {
    season: "Summer to Fall",
    title: "Pollinator support depends on sequence, not just one bloom moment",
    description:
      "Turk’s cap, American beautyberry, and goldenrod help stretch nectar, shelter, fruit, and structure across changing seasons for both resident and migrating wildlife.",
    plants: ["Turk’s cap", "American beautyberry", "Goldenrod"],
    artVariant: "pollinator",
  },
  {
    season: "Migration season",
    title: "Monarch watching becomes easier with field marks and local habitat clues",
    description:
      "Families and beginners benefit from practical guidance that helps them distinguish monarchs from similar butterflies and understand what they are seeing.",
    plants: ["Milkweed", "Native asters", "Goldenrod"],
    artVariant: "monarch",
  },
];

export const volunteerPaths: VolunteerPath[] = [
  {
    title: "Help with gatherings and hospitality",
    description:
      "Friendly events need calm, capable hands before and after the program, from greeting visitors to helping the room feel organized and welcoming.",
    examples: ["Check-in table", "Room setup", "Refreshments", "Wayfinding"],
  },
  {
    title: "Share skills and local knowledge",
    description:
      "Volunteers can contribute writing, photography, plant knowledge, outreach help, or practical logistics without needing a huge time commitment.",
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
      "Hands-on work can include seed activities, native bed maintenance, event support, and small habitat-focused projects that make the chapter visible in the community.",
    examples: [
      "Seed cleaning",
      "Planting days",
      "Interpretive signage help",
      "Volunteer coordination",
    ],
  },
];
