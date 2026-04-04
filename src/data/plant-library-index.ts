import { plantLibraryGroups, type PlantEntry } from "@/data/plant-library";

export type PlantLibraryItem = PlantEntry & {
  slug: string;
  groupTitle: string;
};

export const slugifyPlantName = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const plantLibraryItems: PlantLibraryItem[] = plantLibraryGroups.flatMap((group) =>
  group.plants.map((plant) => ({
    ...plant,
    slug: slugifyPlantName(plant.scientificName),
    groupTitle: group.title,
  })),
);

export const getPlantBySlug = (slug: string) =>
  plantLibraryItems.find((plant) => plant.slug === slug);

