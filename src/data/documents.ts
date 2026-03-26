export type DocumentStatus = "Available" | "In preparation" | "Not yet posted";

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
      "Governance files will be posted here as the chapter finalizes public-facing versions for members and visitors.",
    items: [
      {
        title: "Chapter bylaws",
        description:
          "A public copy of the chapter bylaws can be added here once the board approves the version for posting.",
        status: "In preparation",
      },
      {
        title: "Officer responsibilities overview",
        description:
          "A concise guide to chapter leadership roles, useful for volunteers, future officers, and succession planning.",
        status: "In preparation",
      },
    ],
  },
  {
    title: "Meeting materials",
    description:
      "A place for agendas, approved minutes, annual reports, and presentation materials that chapter participants may want to revisit.",
    emptyMessage:
      "Meeting materials will appear as the chapter begins publishing regular agendas, recaps, and annual summaries.",
    items: [
      {
        title: "Meeting minutes archive",
        description:
          "Reserved for approved meeting minutes or chapter summaries once regular public records are posted.",
        status: "Not yet posted",
      },
      {
        title: "Annual chapter highlights",
        description:
          "A future archive for annual accomplishments, chapter milestones, and major outreach updates.",
        status: "Not yet posted",
      },
    ],
  },
  {
    title: "Handouts",
    description:
      "Quick-reference educational materials that support chapter talks, plant walks, and public outreach.",
    emptyMessage:
      "Handouts will be especially useful once the chapter begins sharing recurring educational materials and field references.",
    items: [
      {
        title: "Native plant basics handout",
        description:
          "A future starter guide for visitors beginning their first native-plant project in Fayette, Colorado, or Lavaca County.",
        status: "In preparation",
      },
      {
        title: "Seasonal seed stewardship notes",
        description:
          "A short reference sheet the chapter can publish alongside seed workshops or educational demonstrations.",
        status: "In preparation",
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
          "Reserved for downloadable event notices once the chapter starts publishing flyers for public programs.",
        status: "Not yet posted",
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
          "A future PDF for common volunteer roles, chapter expectations, and ways to stay in touch.",
        status: "In preparation",
      },
      {
        title: "Field outing participation guidance",
        description:
          "A future home for outing expectations, safety reminders, or any field trip forms the chapter wants to share.",
        status: "In preparation",
      },
    ],
  },
];

export const documentsEmptyState =
  "The document library now has a clear structure, even though the chapter is still assembling its first public files.";
