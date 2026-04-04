import { PlantImageSourceType, type PlantImage } from "@prisma/client";

import { prisma } from "@/lib/db";

export type PlantImageRecord = PlantImage;

export const plantImageSourceLabels: Record<PlantImageSourceType, string> = {
  owned: "Owned",
  licensed_approved_external: "Licensed approved external",
  unapproved_external: "Unapproved external",
  none: "No image",
};

export async function getApprovedPlantImagesBySlug(plantSlug: string) {
  return prisma.plantImage.findMany({
    where: {
      plantSlug,
      approvedForWebPublication: true,
    },
    orderBy: [{ isPrimary: "desc" }, { sortOrder: "asc" }, { createdAt: "asc" }],
  });
}

export async function getPlantImageAdminRecords(plantSlug: string) {
  return prisma.plantImage.findMany({
    where: { plantSlug },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
}
