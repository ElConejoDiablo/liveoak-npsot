import { PlantImageSourceType, type PlantImage } from "@prisma/client";
import { get } from "@vercel/blob";

import { prisma } from "@/lib/db";
import { requireServerEnv } from "@/lib/env";

export type PlantImageRecord = PlantImage;

export const plantImageSourceLabels: Record<PlantImageSourceType, string> = {
  owned: "Owned",
  licensed_approved_external: "Licensed approved external",
  unapproved_external: "Unapproved external",
  none: "No image",
};

export async function getApprovedPlantImagesBySlug(plantSlug: string) {
  const approvedImages = await prisma.plantImage.findMany({
    where: {
      plantSlug,
      approvedForWebPublication: true,
    },
    orderBy: [{ isPrimary: "desc" }, { sortOrder: "asc" }, { createdAt: "asc" }],
  });

  const usableImages = await Promise.all(
    approvedImages.map(async (image) => {
      if (!image.blobPath) {
        return null;
      }

      const blob = await get(image.blobPath, {
        access: "private",
        token: requireServerEnv("BLOB_READ_WRITE_TOKEN"),
        useCache: false,
      });

      return blob && blob.statusCode === 200 ? image : null;
    }),
  );

  return usableImages.filter((image): image is PlantImage => image !== null);
}

export async function getPlantImageAdminRecords(plantSlug: string) {
  return prisma.plantImage.findMany({
    where: { plantSlug },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });
}
