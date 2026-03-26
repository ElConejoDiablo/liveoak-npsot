"use server";

import { ExchangeCategory } from "@prisma/client";
import { put } from "@vercel/blob";
import type { Route } from "next";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireMemberActionContext } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { awardCompletedInteractionPoints } from "@/lib/members/points";

export type MemberActionState = {
  status: "idle" | "error";
  message?: string;
};

const MAX_POST_IMAGES = 5;
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

function errorState(message: string): MemberActionState {
  return { status: "error", message };
}

function isValidCategory(value: string): value is ExchangeCategory {
  return Object.values(ExchangeCategory).includes(value as ExchangeCategory);
}

function normalizeTextField(value: FormDataEntryValue | null) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

async function uploadPostImages(files: File[], authorId: string) {
  if (!files.length) {
    return [];
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;

  if (!token) {
    throw new Error("Image uploads are not configured on this environment.");
  }

  const uploadedImages: { blobUrl: string; blobPath: string; sortOrder: number }[] = [];

  for (const [index, file] of files.entries()) {
    if (!ALLOWED_IMAGE_TYPES.has(file.type)) {
      throw new Error("Only JPG, PNG, WEBP, and GIF images are allowed.");
    }

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      throw new Error("Each image must be 5MB or smaller.");
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "-");
    const blob = await put(
      `members/exchange/${authorId}/${Date.now()}-${index}-${safeName}`,
      file,
      {
        access: "public",
        token,
        addRandomSuffix: true,
      },
    );

    uploadedImages.push({
      blobUrl: blob.url,
      blobPath: blob.pathname,
      sortOrder: index,
    });
  }

  return uploadedImages;
}

export async function createExchangePostAction(
  _previousState: MemberActionState,
  formData: FormData,
): Promise<MemberActionState> {
  const { user } = await requireMemberActionContext();

  const title = normalizeTextField(formData.get("title"));
  const description = normalizeTextField(formData.get("description"));
  const categoryValue = normalizeTextField(formData.get("category"));
  const county = normalizeTextField(formData.get("county")) || null;
  const availabilityNotes =
    normalizeTextField(formData.get("availabilityNotes")) || null;
  const swapPreference =
    normalizeTextField(formData.get("swapPreference")) || null;

  if (!title || title.length < 4) {
    return errorState("Add a short, clear title so members know what is available or needed.");
  }

  if (!description || description.length < 12) {
    return errorState("Add a little more detail so other members can respond usefully.");
  }

  if (!isValidCategory(categoryValue)) {
    return errorState("Choose one of the available exchange categories.");
  }

  const imageFiles = formData
    .getAll("images")
    .filter(
      (entry): entry is File =>
        entry instanceof File && entry.size > 0 && entry.name.length > 0,
    );

  if (imageFiles.length > MAX_POST_IMAGES) {
    return errorState(`You can upload up to ${MAX_POST_IMAGES} images per post.`);
  }

  try {
    const uploadedImages = await uploadPostImages(imageFiles, user.id);

    const post = await prisma.exchangePost.create({
      data: {
        title,
        description,
        category: categoryValue,
        county,
        availabilityNotes,
        swapPreference,
        authorId: user.id,
        images: {
          create: uploadedImages,
        },
      },
    });

    revalidatePath("/members");
    revalidatePath("/members/exchange");
    redirect(`/members/exchange/${post.id}` as Route);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "The post could not be created right now.";

    return errorState(message);
  }
}

export async function createExchangeReplyAction(
  _previousState: MemberActionState,
  formData: FormData,
): Promise<MemberActionState> {
  const { user } = await requireMemberActionContext();
  const postId = normalizeTextField(formData.get("postId"));
  const body = normalizeTextField(formData.get("body"));

  if (!postId) {
    return errorState("Missing post information.");
  }

  if (!body || body.length < 3) {
    return errorState("Write a short reply so the post owner knows how to follow up.");
  }

  await prisma.exchangeReply.create({
    data: {
      postId,
      authorId: user.id,
      body,
    },
  });

  revalidatePath(`/members/exchange/${postId}`);
  return { status: "idle" };
}

export async function selectCounterpartAction(formData: FormData) {
  const { user } = await requireMemberActionContext();
  const postId = normalizeTextField(formData.get("postId"));
  const counterpartId = normalizeTextField(formData.get("counterpartId"));

  if (!postId || !counterpartId) {
    throw new Error("Missing transaction selection.");
  }

  const post = await prisma.exchangePost.findUnique({
    where: { id: postId },
    include: {
      replies: {
        select: { authorId: true },
      },
    },
  });

  if (!post || post.authorId !== user.id) {
    throw new Error("You cannot update this transaction.");
  }

  const validCounterpart = post.replies.some(
    (reply) => reply.authorId === counterpartId && reply.authorId !== user.id,
  );

  if (!validCounterpart) {
    throw new Error("Choose a replying member to associate with this interaction.");
  }

  await prisma.exchangeTransaction.upsert({
    where: { postId },
    update: {
      counterpartId,
    },
    create: {
      postId,
      counterpartId,
    },
  });

  await prisma.exchangePost.update({
    where: { id: postId },
    data: {
      status: "pending",
    },
  });

  revalidatePath(`/members/exchange/${postId}`);
  revalidatePath("/members/exchange");
}

export async function confirmTransactionAction(formData: FormData) {
  const { user } = await requireMemberActionContext();
  const postId = normalizeTextField(formData.get("postId"));

  if (!postId) {
    throw new Error("Missing transaction information.");
  }

  const post = await prisma.exchangePost.findUnique({
    where: { id: postId },
    include: {
      transaction: true,
    },
  });

  if (!post || !post.transaction || !post.transaction.counterpartId) {
    throw new Error("This interaction is not ready for confirmation.");
  }

  const updates: {
    ownerConfirmedAt?: Date;
    counterpartConfirmedAt?: Date;
  } = {};

  if (user.id === post.authorId && !post.transaction.ownerConfirmedAt) {
    updates.ownerConfirmedAt = new Date();
  } else if (
    user.id === post.transaction.counterpartId &&
    !post.transaction.counterpartConfirmedAt
  ) {
    updates.counterpartConfirmedAt = new Date();
  } else {
    throw new Error("You are not allowed to confirm this interaction.");
  }

  const transaction = await prisma.exchangeTransaction.update({
    where: { id: post.transaction.id },
    data: updates,
  });

  if (
    (transaction.ownerConfirmedAt || updates.ownerConfirmedAt) &&
    (transaction.counterpartConfirmedAt || updates.counterpartConfirmedAt)
  ) {
    await awardCompletedInteractionPoints({
      transactionId: transaction.id,
      ownerId: post.authorId,
      counterpartId: post.transaction.counterpartId,
    });
  }

  revalidatePath(`/members/exchange/${postId}`);
  revalidatePath("/members");
  revalidatePath("/members/exchange");
}
