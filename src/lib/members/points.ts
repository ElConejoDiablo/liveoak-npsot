import { PointLedgerReason, Prisma } from "@prisma/client";

import { prisma } from "@/lib/db";

export async function awardCompletedInteractionPoints(input: {
  transactionId: string;
  ownerId: string;
  counterpartId: string;
}) {
  await prisma.$transaction(async (tx) => {
    const transaction = await tx.exchangeTransaction.findUnique({
      where: { id: input.transactionId },
      include: { post: true },
    });

    if (!transaction) {
      throw new Error("Transaction not found");
    }

    if (transaction.pointsAwardedAt) {
      return;
    }

    if (!transaction.ownerConfirmedAt || !transaction.counterpartConfirmedAt) {
      return;
    }

    const pointsAwardedAt = new Date();

    try {
      await tx.pointLedger.createMany({
        data: [
          {
            userId: input.ownerId,
            transactionId: input.transactionId,
            reason: PointLedgerReason.completed_interaction,
            points: 1,
          },
          {
            userId: input.counterpartId,
            transactionId: input.transactionId,
            reason: PointLedgerReason.completed_interaction,
            points: 1,
          },
        ],
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        await tx.exchangeTransaction.update({
          where: { id: input.transactionId },
          data: {
            pointsAwardedAt,
            completedAt: transaction.completedAt ?? pointsAwardedAt,
          },
        });
        return;
      }

      throw error;
    }

    await tx.user.update({
      where: { id: input.ownerId },
      data: { pointsTotal: { increment: 1 } },
    });

    await tx.user.update({
      where: { id: input.counterpartId },
      data: { pointsTotal: { increment: 1 } },
    });

    await tx.exchangeTransaction.update({
      where: { id: input.transactionId },
      data: {
        completedAt: transaction.completedAt ?? pointsAwardedAt,
        pointsAwardedAt,
      },
    });

    await tx.exchangePost.update({
      where: { id: transaction.postId },
      data: { status: "completed" },
    });
  });
}
