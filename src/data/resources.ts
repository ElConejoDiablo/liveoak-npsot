export type ResourceLink = {
  title: string;
  href: string;
  description: string;
  kind: "external" | "internal" | "email";
};

export type ResourceGroup = {
  title: string;
  description: string;
  links: ResourceLink[];
};

export const resourceGroups: ResourceGroup[] = [
  {
    title: "NPSOT Statewide Guidance",
    description:
      "Use these statewide links to learn about NPSOT, join or renew, and get started with native plants.",
    links: [
      {
        title: "NPSOT home",
        href: "https://www.npsot.org/",
        description:
          "Visit the statewide Native Plant Society of Texas website.",
        kind: "external",
      },
      {
        title: "Join or renew NPSOT membership",
        href: "https://www.npsot.org/join-or-renew-membership/",
        description:
          "Join NPSOT, renew your membership, or give a gift membership.",
        kind: "external",
      },
      {
        title: "Start a native plant garden",
        href: "https://www.npsot.org/resources/start-a-native-garden/",
        description:
          "Read NPSOT guidance for starting a native plant garden in Texas.",
        kind: "external",
      },
      {
        title: "Native Plant Database",
        href: "https://www.npsot.org/resources/native-plants/native-plants-database/",
        description:
          "Search the NPSOT database for native plants suited to your landscape goals and growing conditions.",
        kind: "external",
      },
    ],
  },
  {
    title: "Habitat and plant identification",
    description:
      "Keep learning with trusted references for plant selection, pollinator support, and habitat care.",
    links: [
      {
        title: "Bring Back the Monarchs to Texas",
        href: "https://www.npsot.org/our-work/bring-back-the-monarchs-to-texas/",
        description:
          "Find milkweed, monarch, and habitat information from NPSOT.",
        kind: "external",
      },
      {
        title: "Lady Bird Johnson Wildflower Center plant database",
        href: "https://www.wildflower.org/plants/",
        description:
          "Look up native plants, range maps, and growing information.",
        kind: "external",
      },
      {
        title: "Texas Parks and Wildlife Wildscapes",
        href: "https://tpwd.texas.gov/wildlife/wildlife-diversity/wildscapes/wildscape-certification/",
        description:
          "Explore Texas Parks and Wildlife guidance for planting with wildlife habitat in mind.",
        kind: "external",
      },
    ],
  },
];
