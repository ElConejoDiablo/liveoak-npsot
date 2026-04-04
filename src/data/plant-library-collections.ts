import type { PlantEntry } from "@/data/plant-library";
import { plantLibraryGroups } from "@/data/plant-library";

export type StarterCollection = {
  title: string;
  description: string;
  intro: string;
  plants: PlantEntry[];
};

const allPlants = plantLibraryGroups.flatMap((group) => group.plants);

const uniquePlants = (plants: PlantEntry[]) => {
  const seen = new Set<string>();

  return plants.filter((plant) => {
    if (seen.has(plant.scientificName)) {
      return false;
    }

    seen.add(plant.scientificName);
    return true;
  });
};

const sortByUsefulStarter = (plants: PlantEntry[]) =>
  [...plants].sort((a, b) => {
    const score = (plant: PlantEntry) =>
      Number(plant.chapterRecommended) * 4 +
      Number(Boolean(plant.localUseNote)) * 3 +
      Number(Boolean(plant.hostValue)) * 3 +
      Number(plant.pollinatorValue.length > 0) * 2 +
      Number(plant.countyRelevance.fayette !== "review") +
      Number(plant.countyRelevance.colorado !== "review") +
      Number(plant.countyRelevance.lavaca !== "review");

    return score(b) - score(a) || a.commonName.localeCompare(b.commonName);
  });

const isFullSun = (plant: PlantEntry) => plant.sun.toLowerCase().includes("full sun");

const isPartShade = (plant: PlantEntry) =>
  plant.sun.toLowerCase().includes("part shade") || plant.sun.toLowerCase().includes("shade");

const isDrySite = (plant: PlantEntry) =>
  plant.moisture.toLowerCase().includes("dry") || plant.moisture.toLowerCase().includes("average");

const isHabitatWoody = (plant: PlantEntry) => plant.plantType === "tree" || plant.plantType === "shrub";

const isPrairieStructure = (plant: PlantEntry) =>
  plant.plantType === "grass" ||
  plant.commonName === "Butterflyweed" ||
  plant.commonName === "Winecup" ||
  plant.commonName === "Engelmann daisy" ||
  plant.commonName === "Texas bluebonnet" ||
  plant.commonName === "Partridge pea";

const hasStrongPollinatorValue = (plant: PlantEntry) =>
  /excellent|outstanding|critical|strong|high-value|high value/i.test(plant.pollinatorValue) ||
  Boolean(plant.hostValue);

export const starterCollections: StarterCollection[] = [
  {
    title: "Best plants for pollinators",
    description: "The strongest nectar and host starters for bees, butterflies, and hummingbirds.",
    intro: "Use this when you want the biggest return for pollinators with a short starter list.",
    plants: sortByUsefulStarter(uniquePlants(allPlants.filter(hasStrongPollinatorValue))).slice(0, 6),
  },
  {
    title: "Starter plants for native gardens",
    description: "Reliable chapter-friendly species that are easy to explain, find, and grow.",
    intro: "Good first stop if you are starting a native bed and want dependable, easy-to-read choices.",
    plants: sortByUsefulStarter(
      uniquePlants(allPlants.filter((plant) => plant.chapterRecommended && (isFullSun(plant) || isPartShade(plant)))),
    ).slice(0, 6),
  },
  {
    title: "Prairie grasses and structure plants",
    description: "Foundation grasses and upright prairie plants that build texture and habitat.",
    intro: "Helpful when you want prairie shape, movement, or a backbone for larger plantings.",
    plants: sortByUsefulStarter(uniquePlants(allPlants.filter(isPrairieStructure))).slice(0, 6),
  },
  {
    title: "Trees and shrubs for habitat",
    description: "Woody plants that add shade, cover, berries, mast, and nesting structure.",
    intro: "Use this for bigger spaces, wildlife cover, and longer-term structure in the landscape.",
    plants: sortByUsefulStarter(uniquePlants(allPlants.filter(isHabitatWoody))).slice(0, 6),
  },
  {
    title: "Plants for sun",
    description: "Heat-tough selections for open, full-sun sites and prairie-style plantings.",
    intro: "Best for hot, open sites that stay bright most of the day and dry out quickly.",
    plants: sortByUsefulStarter(uniquePlants(allPlants.filter((plant) => isFullSun(plant) && isDrySite(plant)))).slice(0, 6),
  },
  {
    title: "Plants for part shade",
    description: "Useful species for woodland edges, filtered light, and softer garden transitions.",
    intro: "Good for morning sun, filtered light, or spots where trees make full-sun plants struggle.",
    plants: sortByUsefulStarter(uniquePlants(allPlants.filter(isPartShade))).slice(0, 6),
  },
];
