export type NavigationItem = {
  href: string;
  label: string;
  description?: string;
};

export type FooterLinkGroup = {
  title: string;
  links: NavigationItem[];
};

export type LeadershipMember = {
  role: string;
  name: string;
  bio: string;
  focus: string;
  countyConnection: string;
  participationNote?: string;
};

export const siteConfig = {
  chapterName: "Live Oak Chapter, Native Plant Society of Texas",
  shortName: "Live Oak Chapter",
  organization: "Native Plant Society of Texas",
  domain: "liveoak-npsot.org",
  siteUrl: "https://liveoak-npsot.org",
  timeZone: "America/Chicago",
  contactEmail: "info@liveoak-npsot.org",
  mission:
    "The mission of the Native Plant Society of Texas is to promote conservation, research and utilization of native plants and plant habitats of Texas through education, outreach, and example.",
  description:
    "The Live Oak Chapter of the Native Plant Society of Texas serves Fayette, Colorado, and Lavaca Counties with events, field walks, native plant information, and local connection around south-central Texas landscapes.",
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
    calendarUrl: "https://www.npsot.org/calendar/",
    virtualEventsUrl: "https://www.npsot.org/virtual-events/",
    symposiumUrl: "https://www.npsot.org/our-work/symposium/symposium-overview/",
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
      bio: "Anthony helps guide chapter events, partnerships, and chapter priorities as the Live Oak Chapter grows across the region.",
      focus: "Chapter leadership, partnerships, and member engagement",
      countyConnection:
        "Serving members and visitors across Fayette, Colorado, and Lavaca Counties",
      participationNote:
        "A good contact for chapter leadership questions, partnerships, and broader chapter direction.",
    },
    {
      role: "Secretary",
      name: "Morgan Bubela",
      bio: "Morgan helps keep chapter communication, meeting records, and day-to-day coordination clear and dependable.",
      focus: "Communications, meeting records, and chapter coordination",
      countyConnection:
        "Helping keep chapter communication clear across the three-county service area",
      participationNote:
        "A good contact for chapter communication and coordination questions.",
    },
    {
      role: "Treasurer",
      name: "Barry Treas",
      bio: "Barry helps manage the financial side of the chapter so events, outreach, and volunteer work can keep moving.",
      focus: "Financial stewardship and chapter operations",
      countyConnection:
        "Supporting steady chapter operations across Fayette, Colorado, and Lavaca Counties",
      participationNote:
        "Helps with the practical side of chapter operations and financial stewardship.",
    },
  ] satisfies LeadershipMember[],
  about: {
    overview:
      "The Live Oak Chapter brings together people who care about Texas native plants in Fayette, Colorado, and Lavaca Counties through local events, field learning, and conservation-minded outreach.",
    regionalContext:
      "The chapter helps people learn which plants belong here, how they support habitat, and how to use them in home landscapes, public spaces, and everyday life.",
    whatWeDo: [
      "Host chapter meetings, talks, and public events focused on Texas native plants and habitat care.",
      "Offer plant walks and seasonal learning opportunities that connect local observation to practical action.",
      "Support native gardening, pollinator habitat, seed stewardship, and conservation-minded land care through education and example.",
      "Welcome members, neighbors, gardeners, and anyone who wants to learn more about native plants close to home.",
    ],
    howToParticipate: [
      "Attend a meeting, walk, or public event listed on the chapter calendar.",
      "Join NPSOT and connect with the Live Oak Chapter.",
      "Volunteer with chapter events, outreach, hospitality, or stewardship work.",
      "Contact the chapter with questions, ideas, or interest in helping.",
    ],
  },
  homePillars: [
    {
      title: "Learn native plants with confidence",
      description:
        "Events, field walks, and seasonal guidance that make local ecology easier to understand and use at home.",
    },
    {
      title: "Build habitat that belongs here",
      description:
        "From seed saving to pollinator gardening, the chapter centers plants and habitats that fit the region instead of fighting it.",
    },
    {
      title: "Meet neighbors doing the work",
      description:
        "A welcoming place to ask questions, share knowledge, and get involved.",
    },
  ],
  chapterStats: [
    {
      label: "Counties served",
      value: "3",
      detail: "Fayette, Colorado, and Lavaca",
    },
    {
      label: "What we share",
      value: "Events and articles",
      detail: "Meetings, walks, local guidance, and volunteer opportunities",
    },
    {
      label: "Chapter focus",
      value: "Native plants close to home",
      detail: "Education, habitat care, and practical local knowledge",
    },
  ],
} as const;

export const primaryNavigation: NavigationItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/news", label: "Articles" },
  { href: "/programs", label: "Programs" },
  { href: "/resources", label: "Resources" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/contact", label: "Contact" },
];

export const headerNavigation: NavigationItem[] = [
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/news", label: "Articles" },
  { href: "/resources", label: "Resources" },
];

export const mobilePrimaryNavigation: NavigationItem[] = [
  { href: "/", label: "Home" },
  ...headerNavigation,
  { href: "/contact", label: "Contact" },
];

export const secondaryNavigation: NavigationItem[] = [
  { href: "/programs", label: "Programs" },
  { href: "/volunteer", label: "Volunteer" },
  { href: "/leadership", label: "Leadership" },
  { href: "/documents", label: "Documents" },
];

export const footerLinkGroups: FooterLinkGroup[] = [
  {
    title: "Explore",
    links: [
      { href: "/about", label: "About" },
      { href: "/events", label: "Events" },
      { href: "/news", label: "Articles" },
      { href: "/resources", label: "Resources" },
    ],
  },
  {
    title: "Get involved",
    links: [
      { href: "/programs", label: "Programs" },
      { href: "/volunteer", label: "Volunteer" },
      {
        href: "/members/sign-in",
        label: "Member sign in",
      },
      {
        href: siteConfig.npsot.joinUrl,
        label: "Join NPSOT",
      },
    ],
  },
  {
    title: "Chapter",
    links: [
      { href: "/leadership", label: "Leadership" },
      { href: "/documents", label: "Documents" },
    ],
  },
  {
    title: "Statewide",
    links: [
      {
        href: siteConfig.npsot.homeUrl,
        label: "NPSOT.org",
      },
      {
        href: siteConfig.npsot.startGardenUrl,
        label: "Start a Native Garden",
      },
      {
        href: siteConfig.npsot.plantDatabaseUrl,
        label: "Native Plant Database",
      },
    ],
  },
];
