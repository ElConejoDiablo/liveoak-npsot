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
    title: "Start with the essentials",
    description:
      "These are the practical first stops for learning about the Society, joining, and beginning a native-plant project with regionally useful guidance.",
    links: [
      {
        title: "NPSOT home",
        href: "https://www.npsot.org/",
        description:
          "Explore the statewide organization, chapter network, and current Native Plant Society of Texas programs.",
        kind: "external",
      },
      {
        title: "Join or renew NPSOT membership",
        href: "https://www.npsot.org/join-or-renew-membership/",
        description:
          "Use the official membership page to join, renew, or give a gift membership.",
        kind: "external",
      },
      {
        title: "Start a native plant garden",
        href: "https://www.npsot.org/resources/start-a-native-garden/",
        description:
          "An official NPSOT starting point for people shifting from conventional landscaping toward regional native planting.",
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
    title: "Go deeper on habitat and identification",
    description:
      "Useful educational references for plant selection, pollinator support, and habitat thinking that extends beyond one planting season.",
    links: [
      {
        title: "Bring Back the Monarchs to Texas",
        href: "https://www.npsot.org/our-work/bring-back-the-monarchs-to-texas/",
        description:
          "NPSOT's monarch conservation hub with milkweed and habitat resources that complement chapter education.",
        kind: "external",
      },
      {
        title: "Lady Bird Johnson Wildflower Center plant database",
        href: "https://www.wildflower.org/plants/",
        description:
          "A widely used Texas native plant reference for browsing species, range, and horticultural notes.",
        kind: "external",
      },
      {
        title: "Texas Parks and Wildlife Wildscapes",
        href: "https://tpwd.texas.gov/wildlife/wildlife-diversity/wildscapes/wildscape-certification/",
        description:
          "Texas Parks and Wildlife guidance on building habitat with native plants and wildlife needs in mind.",
        kind: "external",
      },
    ],
  },
  {
    title: "Chapter-specific links",
    description:
      "These blocks are ready for real chapter files and sign-up destinations as soon as they are available.",
    links: [
      {
        title: "Chapter documents hub",
        href: "/documents",
        description:
          "Reserved space for bylaws, meeting minutes, volunteer forms, and outreach files.",
        kind: "internal",
      },
      {
        title: "Request newsletter signup",
        href: "mailto:info@liveoak-npsot.org?subject=Live%20Oak%20Chapter%20newsletter%20signup",
        description:
          "Placeholder signup flow until the chapter connects a dedicated newsletter platform.",
        kind: "email",
      },
      {
        title: "Email the chapter",
        href: "mailto:info@liveoak-npsot.org?subject=Hello%20Live%20Oak%20Chapter",
        description:
          "Use the chapter inbox for questions, collaboration ideas, and requests for follow-up.",
        kind: "email",
      },
    ],
  },
];
