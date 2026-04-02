export type DocumentStatus = "Available now" | "Members only" | "Check back soon";

export type DocumentItem = {
  title: string;
  description: string;
  status: DocumentStatus;
  href?: string;
  hrefLabel?: string;
  updated?: string;
};

export type DocumentCollection = {
  title: string;
  description: string;
  emptyMessage: string;
  items: DocumentItem[];
};

export const documentCollections: DocumentCollection[] = [
  {
    title: "Meeting recaps and archives",
    description:
      "Public follow-up material from chapter gatherings, plus the member-only minutes path already available through the chapter portal.",
    emptyMessage:
      "This section will list chapter recaps, archived meeting notes, and related follow-up material as they are posted.",
    items: [
      {
        title: "Early spring chapter gathering recap",
        description:
          "Public recap from the March 14, 2026 chapter gathering, including the turnout, questions, and themes that shaped the chapter's early momentum.",
        status: "Available now",
        href: "/news/early-community-turnout-builds-momentum-for-the-live-oak-chapter",
        hrefLabel: "Read recap",
        updated: "March 14, 2026",
      },
      {
        title: "Past events archive",
        description:
          "Browse public chapter recaps, follow-up notes, and archived event summaries in one place.",
        status: "Available now",
        href: "/events/past",
        hrefLabel: "Open archive",
        updated: "Updated with current recaps",
      },
      {
        title: "March 2026 meeting minutes",
        description:
          "Protected member-only minutes from the early spring chapter gathering.",
        status: "Members only",
        href: "/members/documents",
        hrefLabel: "Open members portal",
        updated: "March 14, 2026",
      },
    ],
  },
  {
    title: "Guides and field notes",
    description:
      "Chapter-owned articles and practical guides that visitors can use right away for planting, observation, and seasonal questions.",
    emptyMessage:
      "This section will grow as more chapter handouts, field notes, and how-to guides are published.",
    items: [
      {
        title: "Getting started with Texas native plants",
        description:
          "A beginner-friendly chapter guide for starting small and learning from the site you already have.",
        status: "Available now",
        href: "/news/getting-started-with-texas-native-plants-in-fayette-colorado-and-lavaca-counties",
        hrefLabel: "Read guide",
        updated: "March 26, 2026",
      },
      {
        title: "Harvesting bluebonnet seeds",
        description:
          "Practical chapter guidance on timing, restraint, and permission when collecting bluebonnet seed.",
        status: "Available now",
        href: "/news/harvesting-bluebonnet-seeds",
        hrefLabel: "Read guide",
        updated: "March 20, 2026",
      },
      {
        title: "What's blooming now",
        description:
          "Seasonal chapter field notes on what is flowering across Fayette, Colorado, and Lavaca Counties.",
        status: "Available now",
        href: "/news/whats-blooming-now-in-fayette-colorado-and-lavaca-counties",
        hrefLabel: "Read field notes",
        updated: "March 25, 2026",
      },
    ],
  },
  {
    title: "Chapter pages and public references",
    description:
      "Public chapter pages that work as living reference material between meetings, events, and article updates.",
    emptyMessage:
      "This section will point to chapter-maintained reference pages as more material is organized.",
    items: [
      {
        title: "Programs overview",
        description:
          "A chapter-maintained overview of meetings, field walks, stewardship, outreach, and seasonal learning themes.",
        status: "Available now",
        href: "/programs",
        hrefLabel: "Open programs",
        updated: "Current chapter page",
      },
      {
        title: "Article archive",
        description:
          "Browse all chapter-published articles, guides, and field notes in one archive.",
        status: "Available now",
        href: "/news",
        hrefLabel: "Browse articles",
        updated: "Current chapter archive",
      },
      {
        title: "Volunteer overview",
        description:
          "A public overview of how chapter volunteers help with events, outreach, stewardship, and support work.",
        status: "Available now",
        href: "/volunteer",
        hrefLabel: "Open volunteer page",
        updated: "Current chapter page",
      },
    ],
  },
  {
    title: "Still to be posted",
    description:
      "These are the document types that still need a true public file or handout before they should be treated as available materials.",
    emptyMessage:
      "This section will shrink as more chapter files are posted publicly.",
    items: [
      {
        title: "Chapter bylaws",
        description: "The chapter's governing document once the public posting copy is ready.",
        status: "Check back soon",
      },
      {
        title: "Officer responsibilities overview",
        description: "A public summary of chapter leadership roles and responsibilities.",
        status: "Check back soon",
      },
      {
        title: "Volunteer welcome packet",
        description: "A future public-facing guide to volunteer roles, expectations, and ways to stay in touch.",
        status: "Check back soon",
      },
    ],
  },
];

export const documentsEmptyState =
  "If you are looking for a chapter file that is not posted yet, contact the chapter and we can tell you whether it is public, still in progress, or available through the members area.";
