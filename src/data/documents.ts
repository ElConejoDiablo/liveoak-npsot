export type DocumentItem = {
  title: string;
  description: string;
  status: string;
  href?: string;
};

export const documentCollections = [
  {
    title: "Chapter governance",
    description:
      "Reserved space for the chapter's bylaws, officer responsibilities, and core governance documents.",
    items: [
      {
        title: "Chapter bylaws",
        description:
          "A downloadable chapter bylaws file can be posted here once the board finalizes the public version.",
        status: "Placeholder",
      },
      {
        title: "Board responsibilities overview",
        description:
          "Useful for volunteers, officers, and future succession planning once the chapter publishes role descriptions.",
        status: "Placeholder",
      },
    ] satisfies DocumentItem[],
  },
  {
    title: "Meeting records",
    description:
      "A clean place for meeting summaries, annual reports, and presentation files that the public may want to revisit later.",
    items: [
      {
        title: "Meeting minutes archive",
        description:
          "This space is ready for monthly meeting notes or approved summaries as they become available.",
        status: "Coming soon",
      },
      {
        title: "Annual chapter highlights",
        description:
          "A future collection for yearly chapter summaries, milestones, and outreach accomplishments.",
        status: "Coming soon",
      },
    ] satisfies DocumentItem[],
  },
  {
    title: "Volunteer and event forms",
    description:
      "Field trip waivers, volunteer sign-up materials, and shareable outreach pieces can live here when the chapter is ready.",
    items: [
      {
        title: "Volunteer welcome packet",
        description:
          "A future PDF for common chapter volunteer roles, expectations, and ways to stay in touch.",
        status: "Placeholder",
      },
      {
        title: "Event participation forms",
        description:
          "A future home for any outing waivers or event-specific forms the chapter wants to publish.",
        status: "Placeholder",
      },
    ] satisfies DocumentItem[],
  },
];

export const documentsEmptyState =
  "The document structure is ready for real files, but the chapter has not published its first public set yet.";

