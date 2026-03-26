export type DocumentStatus = "Available" | "Check back soon";

export type DocumentItem = {
  title: string;
  description: string;
  status: DocumentStatus;
  href?: string;
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
    title: "Chapter governance",
    description:
      "Core documents that explain how the chapter is organized and how leadership responsibilities are carried out.",
    emptyMessage:
      "Governance files will be posted here as they are approved for public release.",
    items: [
      {
        title: "Chapter bylaws",
        description:
          "A public copy of the chapter bylaws can be added here once the board approves the version for posting.",
        status: "Check back soon",
      },
      {
        title: "Officer responsibilities overview",
        description:
          "A concise guide to chapter leadership roles for volunteers, officers, and chapter planning.",
        status: "Check back soon",
      },
    ],
  },
  {
    title: "Meeting materials",
    description:
      "A place for agendas, approved minutes, annual reports, and presentation materials that chapter participants may want to revisit.",
    emptyMessage:
      "Meeting materials will appear here as agendas, minutes, and annual summaries are posted.",
    items: [
      {
        title: "Meeting minutes archive",
        description:
          "Reserved for approved meeting minutes or chapter summaries once regular public records are posted.",
        status: "Check back soon",
      },
      {
        title: "Annual chapter highlights",
        description:
          "Annual accomplishments, chapter milestones, and major outreach updates can be shared here.",
        status: "Check back soon",
      },
    ],
  },
  {
    title: "Handouts",
    description:
      "Quick-reference educational materials that support chapter talks, plant walks, and public outreach.",
    emptyMessage:
      "Handouts will appear here as the chapter begins sharing recurring educational materials and field references.",
    items: [
      {
        title: "Native plant basics handout",
        description:
          "A starter guide for visitors beginning their first native-plant project in Fayette, Colorado, or Lavaca County.",
        status: "Check back soon",
      },
      {
        title: "Seasonal seed stewardship notes",
        description:
          "A short reference sheet the chapter can publish alongside seed workshops or educational demonstrations.",
        status: "Check back soon",
      },
    ],
  },
  {
    title: "Event flyers",
    description:
      "A central place for printable meeting notices, public talk flyers, and shareable event graphics.",
    emptyMessage:
      "Event flyers can be posted here whenever the chapter begins distributing printable notices for meetings and walks.",
    items: [
      {
        title: "Upcoming meeting flyer archive",
        description:
          "Downloadable notices for public programs can be shared here.",
        status: "Check back soon",
      },
    ],
  },
  {
    title: "Member resources",
    description:
      "Materials that support chapter volunteers, members, and participants beyond individual public events.",
    emptyMessage:
      "This area is ready for member welcome materials, volunteer guides, and chapter-specific resources as they are created.",
    items: [
      {
        title: "Volunteer welcome packet",
        description:
          "A simple guide to common volunteer roles, chapter expectations, and ways to stay in touch.",
        status: "Check back soon",
      },
      {
        title: "Field outing participation guidance",
        description:
          "Outing expectations, safety reminders, or field trip forms can be shared here.",
        status: "Check back soon",
      },
    ],
  },
];

export const documentsEmptyState =
  "Check back here for additional chapter files, or contact the chapter if you are looking for something specific.";
