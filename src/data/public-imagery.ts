import type { CoverTheme } from "@/lib/blog";

export type PublicImageryKey =
  | CoverTheme
  | "fieldnotes"
  | "learning"
  | "stewardship"
  | "documents";

export const publicImagery: Record<
  PublicImageryKey,
  {
    src: string;
    alt: string;
  }
> = {
  savanna: {
    src: "/mock-imagery/oak-savanna.svg",
    alt: "Oak savanna with native grasses and warm evening light in south-central Texas.",
  },
  bluebonnet: {
    src: "/mock-imagery/bluebonnet-prairie.svg",
    alt: "Bluebonnets and spring wildflowers across a Texas prairie meadow.",
  },
  pollinator: {
    src: "/mock-imagery/pollinator-garden.svg",
    alt: "Pollinator planting with native blooms, goldenrod, and butterflies.",
  },
  monarch: {
    src: "/mock-imagery/monarch-habitat.svg",
    alt: "Monarch butterflies moving through native habitat near milkweed and asters.",
  },
  community: {
    src: "/mock-imagery/chapter-gathering.svg",
    alt: "Chapter volunteers and visitors gathered in a native planting space.",
  },
  fieldnotes: {
    src: "/mock-imagery/field-notes-meadow.svg",
    alt: "Layered meadow grasses, wildflowers, and field notes gathered from south-central Texas landscapes.",
  },
  learning: {
    src: "/mock-imagery/chapter-learning.svg",
    alt: "A chapter learning gathering with a speaker, listeners, and native-plant discussion under live oaks.",
  },
  stewardship: {
    src: "/mock-imagery/stewardship-workday.svg",
    alt: "A stewardship workday with volunteers tending native planting beds and prairie edges.",
  },
  documents: {
    src: "/mock-imagery/document-table.svg",
    alt: "Chapter handouts, notes, and plant references arranged on a tabletop.",
  },
};
