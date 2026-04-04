"use server";

import { del, put } from "@vercel/blob";
import { PlantImageSourceType } from "@prisma/client";
import { randomUUID } from "node:crypto";
import type { Route } from "next";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";

import { requireAdminMemberContext } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { requireServerEnv } from "@/lib/env";

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

function normalizeTextField(value: FormDataEntryValue | null) {
  if (typeof value !== "string") return "";
  return value.trim();
}

function isValidSourceType(value: string): value is PlantImageSourceType {
  return Object.values(PlantImageSourceType).includes(value as PlantImageSourceType);
}

async function uploadPlantImages(files: File[], plantSlug: string, uploadedBy: string) {
  if (!files.length) return [];
  const token = requireServerEnv("BLOB_READ_WRITE_TOKEN");
  const uploaded: { blobPath: string; plantSlug: string; uploadedBy: string }[] = [];

  for (const [index, file] of files.entries()) {
    if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
      throw new Error("Only JPG, PNG, WEBP, and GIF images are allowed.");
    }
    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      throw new Error("Each image must be 5MB or smaller.");
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "-");
    const blob = await put(`plants/${plantSlug}/${Date.now()}-${index}-${safeName}`, file, {
      access: "private",
      token,
      addRandomSuffix: true,
    });

    uploaded.push({
      blobPath: blob.pathname,
      plantSlug,
      uploadedBy,
    });
  }

  return uploaded;
}

export async function uploadPlantImagesAction(
  formData: FormData,
): Promise<void> {
  try {
    const { user } = await requireAdminMemberContext();
    const plantSlug = normalizeTextField(formData.get("plantSlug"));
    const caption = normalizeTextField(formData.get("caption")) || null;
    const photographerCredit = normalizeTextField(formData.get("photographerCredit")) || null;
    const photographerCreditUrl = normalizeTextField(formData.get("photographerCreditUrl")) || null;
    const location = normalizeTextField(formData.get("location")) || null;
    const licenseNote = normalizeTextField(formData.get("licenseNote")) || null;
    const sourceTypeValue = normalizeTextField(formData.get("sourceType"));
    const approvedForWebPublication = formData.get("approvedForWebPublication") === "on";
    const isPrimary = formData.get("isPrimary") === "on";
    const sortOrderValue = normalizeTextField(formData.get("sortOrder"));

    if (!plantSlug) {
      throw new Error("Choose a plant before uploading images.");
    }

    const sourceType = isValidSourceType(sourceTypeValue) ? sourceTypeValue : "none";
    const files = formData
      .getAll("images")
      .filter((entry): entry is File => entry instanceof File && entry.size > 0 && entry.name.length > 0);

    if (!files.length) {
      throw new Error("Choose one or more image files to upload.");
    }

    const uploaded = await uploadPlantImages(files, plantSlug, user.id);
    const startingSortOrder = Number.parseInt(sortOrderValue || "0", 10) || 0;

    await prisma.$transaction(async (tx) => {
      if (isPrimary) {
        await tx.plantImage.updateMany({
          where: { plantSlug },
          data: { isPrimary: false },
        });
      }

      for (const [offset, fileRecord] of uploaded.entries()) {
        const imageId = randomUUID();
        await tx.plantImage.create({
          data: {
            id: imageId,
            plantSlug,
            imageUrl: `/api/plant-images/${imageId}`,
            blobPath: fileRecord.blobPath,
            altText: normalizeTextField(formData.get("altText")) || plantSlug,
            caption,
            photographerCredit,
            photographerCreditUrl,
            location,
            licenseNote,
            sourceType,
            approvedForWebPublication,
            isPrimary: isPrimary && offset === 0,
            sortOrder: startingSortOrder + offset,
            uploadedBy: fileRecord.uploadedBy,
          },
        });
      }
    });

    revalidatePath("/resources/plants");
    revalidatePath(`/resources/plants/${plantSlug}`);
    revalidatePath("/members/plant-images");
    revalidatePath(`/members/plant-images/${plantSlug}`);
  } catch (error) {
    if (isRedirectError(error)) throw error;
    throw error instanceof Error ? error : new Error("Image upload failed.");
  }
}

export async function updatePlantImageAction(formData: FormData): Promise<void> {
  const { user } = await requireAdminMemberContext();
  const imageId = normalizeTextField(formData.get("imageId"));
  const plantSlug = normalizeTextField(formData.get("plantSlug"));
  const caption = normalizeTextField(formData.get("caption")) || null;
  const altText = normalizeTextField(formData.get("altText")) || "";
  const photographerCredit = normalizeTextField(formData.get("photographerCredit")) || null;
  const photographerCreditUrl = normalizeTextField(formData.get("photographerCreditUrl")) || null;
  const location = normalizeTextField(formData.get("location")) || null;
  const licenseNote = normalizeTextField(formData.get("licenseNote")) || null;
  const sourceTypeValue = normalizeTextField(formData.get("sourceType"));
  const approvedForWebPublication = formData.get("approvedForWebPublication") === "on";
  const isPrimary = formData.get("isPrimary") === "on";
  const sortOrder = Number.parseInt(normalizeTextField(formData.get("sortOrder")) || "0", 10) || 0;

  if (!imageId || !plantSlug) {
    throw new Error("Invalid plant image update");
  }

  const sourceType = isValidSourceType(sourceTypeValue) ? sourceTypeValue : "none";

  if (isPrimary) {
    await prisma.plantImage.updateMany({
      where: { plantSlug, NOT: { id: imageId } },
      data: { isPrimary: false },
    });
  }

  await prisma.plantImage.update({
    where: { id: imageId },
    data: {
      caption,
      altText,
      photographerCredit,
      photographerCreditUrl,
      location,
      licenseNote,
      sourceType,
      approvedForWebPublication,
      isPrimary,
      sortOrder,
      uploadedBy: user.id,
    },
  });

  revalidatePath("/resources/plants");
  revalidatePath(`/resources/plants/${plantSlug}`);
  revalidatePath("/members/plant-images");
  revalidatePath(`/members/plant-images/${plantSlug}`);
  redirect(`/members/plant-images/${plantSlug}` as Route);
}

export async function deletePlantImageAction(formData: FormData): Promise<void> {
  await requireAdminMemberContext();
  const imageId = normalizeTextField(formData.get("imageId"));
  const plantSlug = normalizeTextField(formData.get("plantSlug"));

  if (!imageId || !plantSlug) {
    throw new Error("Invalid plant image deletion");
  }

  const image = await prisma.plantImage.findUnique({
    where: { id: imageId },
    select: { blobPath: true },
  });

  if (image) {
    await del(image.blobPath, {
      token: requireServerEnv("BLOB_READ_WRITE_TOKEN"),
    });
  }

  await prisma.plantImage.delete({ where: { id: imageId } });

  revalidatePath("/resources/plants");
  revalidatePath(`/resources/plants/${plantSlug}`);
  revalidatePath("/members/plant-images");
  revalidatePath(`/members/plant-images/${plantSlug}`);
  redirect(`/members/plant-images/${plantSlug}` as Route);
}
