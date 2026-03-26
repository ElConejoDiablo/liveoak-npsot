export type MemberDocumentCategory =
  | "meeting-minutes"
  | "meeting-agendas"
  | "member-handouts"
  | "internal-resources";

export type MemberDocumentEntry = {
  id: string;
  title: string;
  category: MemberDocumentCategory;
  date: string;
  description: string;
  fileLabel: string;
  href?: string;
};

export const memberDocumentCategories: Record<MemberDocumentCategory, string> = {
  "meeting-minutes": "Meeting minutes",
  "meeting-agendas": "Meeting agendas",
  "member-handouts": "Member handouts",
  "internal-resources": "Internal chapter resources",
};

export const memberDocuments: MemberDocumentEntry[] = [
  {
    id: "minutes-2026-03",
    title: "March 2026 chapter meeting notes",
    category: "meeting-minutes",
    date: "2026-03-14",
    description:
      "Member notes from the early spring chapter gathering, including follow-up topics and committee interests.",
    fileLabel: "Meeting minutes",
  },
  {
    id: "agenda-2026-04",
    title: "April 2026 member agenda outline",
    category: "meeting-agendas",
    date: "2026-04-10",
    description:
      "Draft agenda topics for the next member gathering, including programming, outreach, and volunteer coordination.",
    fileLabel: "Agenda outline",
  },
  {
    id: "handout-native-grasses",
    title: "Native grasses member handout",
    category: "member-handouts",
    date: "2026-04-16",
    description:
      "Quick-reference handout on regionally useful native grasses discussed during chapter programming.",
    fileLabel: "Reference handout",
  },
  {
    id: "resource-member-contacts",
    title: "Internal volunteer coordination notes",
    category: "internal-resources",
    date: "2026-03-20",
    description:
      "A placeholder slot for member-only coordination materials and internal planning references.",
    fileLabel: "Internal resource",
  },
];
