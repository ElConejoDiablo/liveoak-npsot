import { get } from "@vercel/blob";

import { auth, canAccessMembersPortalEmail } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { requireServerEnv } from "@/lib/env";

type ExchangeImageRouteProps = {
  params: Promise<{
    imageId: string;
  }>;
};

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: ExchangeImageRouteProps,
) {
  const { imageId } = await params;

  const image = await prisma.exchangePostImage.findUnique({
    where: { id: imageId },
    select: {
      blobPath: true,
      visibility: true,
    },
  });

  if (!image) {
    return new Response("Not found", { status: 404 });
  }

  if (image.visibility !== "public_teaser") {
    const session = await auth();
    const canView = await canAccessMembersPortalEmail(session?.user?.email);

    if (!canView) {
      return new Response("Not found", { status: 404 });
    }
  }

  const blob = await get(image.blobPath, {
    access: "private",
    token: requireServerEnv("BLOB_READ_WRITE_TOKEN"),
    useCache: false,
  });

  if (!blob || blob.statusCode !== 200) {
    return new Response("Not found", { status: 404 });
  }

  const headers = new Headers();
  headers.set("Content-Type", blob.blob.contentType ?? "application/octet-stream");
  headers.set("Content-Disposition", blob.blob.contentDisposition);
  headers.set("Cache-Control", "no-store, max-age=0");

  if (blob.blob.etag) {
    headers.set("ETag", blob.blob.etag);
  }

  return new Response(blob.stream, {
    status: 200,
    headers,
  });
}
