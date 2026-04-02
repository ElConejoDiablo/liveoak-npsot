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
      "This section will list approved governance documents once they are posted.",
    items: [
      {
        title: "Chapter bylaws",
        description: "The chapter's governing document.",
        status: "Check back soon",
      },
      {
        title: "Officer responsibilities overview",
        description: "A short guide to chapter leadership roles and responsibilities.",
        status: "Check back soon",
      },
    ],
  },
  {
    title: "Meeting materials",
    description:
      "A place for agendas, approved minutes, annual reports, and presentation materials that chapter participants may want to revisit.",
    emptyMessage:
      "This section will list agendas, minutes, and annual summaries once they are posted.",
    items: [
      {
        title: "Meeting minutes archive",
        description: "Approved meeting minutes and chapter summaries.",
        status: "Check back soon",
      },
      {
        title: "Annual chapter highlights",
        description: "Annual highlights, chapter milestones, and major outreach updates.",
        status: "Check back soon",
      },
    ],
  },
  {
    title: "Handouts",
    description:
      "Quick-reference educational materials that support chapter talks, plant walks, and public outreach.",
    emptyMessage:
      "This section will list recurring handouts and field references once they are posted.",
    items: [
      {
        title: "Native plant basics handout",
        description: "A starter guide for visitors beginning a native-plant project in Fayette, Colorado, or Lavaca County.",
        status: "Check back soon",
      },
      {
        title: "Seasonal seed stewardship notes",
        description: "A short reference sheet for seed workshops and seasonal demonstrations.",
        status: "Check back soon",
      },
    ],
  },
  {
    title: "Event flyers",
    description:
      "A central place for printable meeting notices, public talk flyers, and shareable event graphics.",
    emptyMessage:
      "This section will list printable notices for meetings and walks once they are posted.",
    items: [
      {
        title: "Upcoming meeting flyer archive",
        description: "Downloadable notices for public events.",
        status: "Check back soon",
      },
    ],
  },
  {
    title: "Member resources",
    description:
      "Materials that support chapter volunteers, members, and participants beyond individual public events.",
    emptyMessage:
      "This section will list volunteer guides, member welcome materials, and other chapter resources once they are posted.",
    items: [
      {
        title: "Volunteer welcome packet",
        description: "A simple guide to volunteer roles, chapter expectations, and ways to stay in touch.",
        status: "Check back soon",
      },
      {
        title: "Field outing participation guidance",
        description: "Field outing expectations, safety reminders, and related forms.",
        status: "Check back soon",
      },
    ],
  },
];

export const documentsEmptyState =
  "Some chapter files have not been posted yet. Contact the chapter if you are looking for something specific.";
