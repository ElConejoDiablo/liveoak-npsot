import type { PlantEntry } from "@/data/plant-library";
import { plantLibraryGroups } from "@/data/plant-library";

export type StarterCollection = {
  id: string;
  title: string;
  description: string;
  intro: string;
  plants: PlantEntry[];
  checklist?: string[];
  externalLink?: {
    href: string;
    label: string;
  };
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

const isMilkweed = (plant: PlantEntry) =>
  plant.commonName.toLowerCase().includes("milkweed") || plant.scientificName.startsWith("Asclepias");

const isMonarchWaystationPlant = (plant: PlantEntry) => {
  const haystack = [
    plant.commonName,
    plant.scientificName,
    plant.pollinatorValue,
    plant.hostValue,
    plant.hostSpeciesNotes,
    plant.seasonalRole,
    plant.bestLocalUse,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return isMilkweed(plant) || /monarch|nectar/.test(haystack);
};

const sortForMonarchWaystation = (plants: PlantEntry[]) =>
  [...plants].sort((a, b) => {
    const score = (plant: PlantEntry) =>
      Number(isMilkweed(plant)) * 8 +
      Number(Boolean(plant.hostValue)) * 4 +
      Number(/monarch/i.test(plant.pollinatorValue)) * 4 +
      Number(/nectar/i.test(plant.pollinatorValue)) * 2 +
      Number(plant.chapterRecommended) * 2 +
      Number(plant.countyRelevance.fayette !== "review") +
      Number(plant.countyRelevance.colorado !== "review") +
      Number(plant.countyRelevance.lavaca !== "review");

    return score(b) - score(a) || a.commonName.localeCompare(b.commonName);
  });

export const starterCollections: StarterCollection[] = [
  {
    id: "pollinators",
    title: "Best plants for pollinators",
    description: "The strongest nectar and host starters for bees, butterflies, and hummingbirds.",
    intro: "Use this when you want the biggest return for pollinators with a short starter list.",
    plants: sortByUsefulStarter(uniquePlants(allPlants.filter(hasStrongPollinatorValue))).slice(0, 6),
  },
  {
    id: "native-gardens",
    title: "Starter plants for native gardens",
    description: "Reliable chapter-friendly species that are easy to explain, find, and grow.",
    intro: "Good first stop if you are starting a native bed and want dependable, easy-to-read choices.",
    plants: sortByUsefulStarter(
      uniquePlants(allPlants.filter((plant) => plant.chapterRecommended && (isFullSun(plant) || isPartShade(plant)))),
    ).slice(0, 6),
  },
  {
    id: "prairie-structure",
    title: "Prairie grasses and structure plants",
    description: "Foundation grasses and upright prairie plants that build texture and habitat.",
    intro: "Helpful when you want prairie shape, movement, or a backbone for larger plantings.",
    plants: sortByUsefulStarter(uniquePlants(allPlants.filter(isPrairieStructure))).slice(0, 6),
  },
  {
    id: "habitat-trees-shrubs",
    title: "Trees and shrubs for habitat",
    description: "Woody plants that add shade, cover, berries, mast, and nesting structure.",
    intro: "Use this for bigger spaces, wildlife cover, and longer-term structure in the landscape.",
    plants: sortByUsefulStarter(uniquePlants(allPlants.filter(isHabitatWoody))).slice(0, 6),
  },
  {
    id: "sun",
    title: "Plants for sun",
    description: "Heat-tough selections for open, full-sun sites and prairie-style plantings.",
    intro: "Best for hot, open sites that stay bright most of the day and dry out quickly.",
    plants: sortByUsefulStarter(uniquePlants(allPlants.filter((plant) => isFullSun(plant) && isDrySite(plant)))).slice(0, 6),
  },
  {
    id: "part-shade",
    title: "Plants for part shade",
    description: "Useful species for woodland edges, filtered light, and softer garden transitions.",
    intro: "Good for morning sun, filtered light, or spots where trees make full-sun plants struggle.",
    plants: sortByUsefulStarter(uniquePlants(allPlants.filter(isPartShade))).slice(0, 6),
  },
  {
    id: "monarch-waystation",
    title: "Monarch Waystation Qualifier",
    description:
      "Milkweeds and nectar plants that help gardeners work toward Monarch Watch registration.",
    intro:
      "Use this collection when you are planning a monarch habitat and want a local-first starting point.",
    plants: sortForMonarchWaystation(uniquePlants(allPlants.filter(isMonarchWaystationPlant))).slice(0, 10),
    checklist: [
      "A habitat of at least 100 square feet works best.",
      "Aim for at least 6 hours of sun.",
      "Plant at least 10 milkweed plants if you can.",
      "Use 2 or more milkweed species when possible.",
      "Keep nectar plants blooming through the growing season.",
      "Manage the habitat to sustain it and avoid insecticide use.",
    ],
    externalLink: {
      href: "https://monarchwatch.org/waystations/waystation_requirements.pdf",
      label: "Official Monarch Watch Waystation requirements and application",
    },
  },
];

export const getStarterCollectionById = (id?: string) =>
  starterCollections.find((collection) => collection.id === id);
