export type NavigationItem = {
  href: string;
  label: string;
  description?: string;
};

export type LeadershipMember = {
  role: string;
  name: string;
  bio: string;
  focus: string;
  countyConnection: string;
};

export const siteConfig = {
  chapterName: "Live Oak Chapter, Native Plant Society of Texas",
  shortName: "Live Oak Chapter",
  organization: "Native Plant Society of Texas",
  domain: "liveoak-npsot.org",
  siteUrl: "https://liveoak-npsot.org",
  contactEmail: "info@liveoak-npsot.org",
  mission:
    "The mission of the Native Plant Society of Texas is to promote conservation, research and utilization of native plants and plant habitats of Texas through education, outreach, and example.",
  description:
    "The Live Oak Chapter of the Native Plant Society of Texas serves Fayette, Colorado, and Lavaca Counties with welcoming programs, native plant education, field outings, habitat stewardship, and community connection rooted in south-central Texas.",
  serviceArea: ["Fayette County", "Colorado County", "Lavaca County"],
  serviceAreaLabel: "Fayette, Colorado, and Lavaca Counties",
  serviceAreaSentence:
    "The Live Oak Chapter serves Fayette, Colorado, and Lavaca Counties, Texas.",
  social: {
    facebook: "https://facebook.com/LiveOakChapter-NPSOT",
    instagram: "https://instagram.com/LiveOakChapter-NPSOT",
    youtube: "https://youtube.com/@LiveOakChapter-NPSOT",
  },
  npsot: {
    homeUrl: "https://www.npsot.org/",
    joinUrl: "https://www.npsot.org/join-or-renew-membership/",
    startGardenUrl: "https://www.npsot.org/resources/start-a-native-garden/",
    plantDatabaseUrl:
      "https://www.npsot.org/resources/native-plants/native-plants-database/",
    monarchUrl:
      "https://www.npsot.org/our-work/bring-back-the-monarchs-to-texas/",
  },
  newsletterSignupUrl:
    "mailto:info@liveoak-npsot.org?subject=Live%20Oak%20Chapter%20newsletter%20signup",
  contactUrl:
    "mailto:info@liveoak-npsot.org?subject=Hello%20Live%20Oak%20Chapter",
  joinUrl: "https://www.npsot.org/join-or-renew-membership/",
  keywords: [
    "Live Oak Chapter",
    "Native Plant Society of Texas",
    "Texas native plants",
    "Fayette County native plants",
    "Colorado County native plants",
    "Lavaca County native plants",
    "pollinator habitat",
    "bluebonnet seeds",
    "monarch butterflies",
    "native plant events",
  ],
  leadership: [
    {
      role: "President",
      name: "Anthony Haas",
      bio: "Anthony helps guide the chapter's public presence, chapter priorities, and steady growth as the organization welcomes more native-plant advocates across the region.",
      focus: "Chapter direction, partnerships, and member engagement",
      countyConnection: "Serving the chapter across Fayette, Colorado, and Lavaca Counties",
    },
    {
      role: "Secretary",
      name: "Morgan Bubela",
      bio: "Morgan supports communication, meeting coordination, and the clear day-to-day organization that keeps chapter activities accessible and easy to follow.",
      focus: "Communications, meeting records, and chapter coordination",
      countyConnection: "Helping connect chapter volunteers and participants across the service area",
    },
    {
      role: "Treasurer",
      name: "Barry Treas",
      bio: "Barry helps steward the chapter's resources so educational programs, outreach efforts, and volunteer projects can grow on a dependable foundation.",
      focus: "Financial stewardship and chapter operations",
      countyConnection: "Supporting practical, sustainable chapter growth across south-central Texas",
    },
  ] satisfies LeadershipMember[],
  homePillars: [
    {
      title: "Learn native plants with confidence",
      description:
        "Programs, walks, and practical seasonal guidance that make local ecology easier to understand and apply at home.",
    },
    {
      title: "Build habitat that belongs here",
      description:
        "From seed saving to pollinator gardening, the chapter centers plants and habitats that fit the region instead of fighting it.",
    },
    {
      title: "Meet neighbors doing the work",
      description:
        "The chapter is meant to be useful and welcoming: a place to ask questions, share knowledge, and get involved.",
    },
  ],
  chapterStats: [
    {
      label: "Counties served",
      value: "3",
      detail: "Fayette, Colorado, and Lavaca",
    },
    {
      label: "What you’ll find",
      value: "Open events",
      detail: "Meetings, walks, outreach, and volunteer days",
    },
    {
      label: "Guiding approach",
      value: "Local first",
      detail: "Conservation, education, and practical native-plant use",
    },
  ],
} as const;

export const primaryNavigation: NavigationItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/news", label: "News" },
  { href: "/programs", label: "Programs" },
  { href: "/resources", label: "Resources" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/contact", label: "Contact" },
];

export const extendedNavigation: NavigationItem[] = [
  ...primaryNavigation,
  { href: "/leadership", label: "Leadership" },
  { href: "/documents", label: "Documents" },
];

export const footerLinkGroups = [
  {
    title: "Explore",
    links: primaryNavigation,
  },
  {
    title: "Chapter",
    links: [
      { href: "/leadership", label: "Leadership" },
      { href: "/documents", label: "Documents" },
      { href: "/contact", label: "Contact / Subscribe" },
      { href: siteConfig.contactUrl, label: "Email the Chapter" },
    ],
  },
  {
    title: "NPSOT",
    links: [
      { href: siteConfig.npsot.homeUrl, label: "NPSOT.org" },
      { href: siteConfig.npsot.joinUrl, label: "Join or Renew" },
      { href: siteConfig.npsot.startGardenUrl, label: "Start a Native Garden" },
      {
        href: siteConfig.npsot.plantDatabaseUrl,
        label: "Native Plant Database",
      },
    ],
  },
];

