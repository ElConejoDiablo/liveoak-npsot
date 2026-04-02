import type { CoverTheme } from "@/lib/blog";

export const publicImagery: Record<
  CoverTheme,
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
};
