import {
  ExchangeCategory,
  ExchangePostStatus,
  type ExchangePost,
  type ExchangeReply,
  type ExchangeTransaction,
  type User,
} from "@prisma/client";

import { prisma } from "@/lib/db";

export const exchangeCategoryLabels: Record<ExchangeCategory, string> = {
  seeds: "Seeds",
  plants: "Plants",
  trees: "Trees",
  tools: "Tools",
  giveaway: "Giveaway",
  help_requested: "Help requested",
  help_offered: "Help offered",
};

export const exchangeStatusLabels: Record<ExchangePostStatus, string> = {
  open: "Open",
  pending: "Pending",
  completed: "Completed",
  closed: "Closed",
};

export type ExchangePostRecord = ExchangePost & {
  author: Pick<User, "id" | "name" | "email" | "pointsTotal">;
  images: { id: string; blobUrl: string; sortOrder: number }[];
  replies: (ExchangeReply & {
    author: Pick<User, "id" | "name" | "email" | "pointsTotal">;
  })[];
  transaction: (ExchangeTransaction & {
    counterpart: Pick<User, "id" | "name" | "email" | "pointsTotal"> | null;
  }) | null;
};

export type ExchangeFilters = {
  category?: ExchangeCategory;
  status?: ExchangePostStatus;
};

export async function getExchangePosts(filters: ExchangeFilters = {}) {
  return prisma.exchangePost.findMany({
    where: {
      category: filters.category,
      status: filters.status,
    },
    include: {
      author: {
        select: { id: true, name: true, email: true, pointsTotal: true },
      },
      images: {
        select: { id: true, blobUrl: true, sortOrder: true },
        orderBy: { sortOrder: "asc" },
      },
      replies: {
        include: {
          author: {
            select: { id: true, name: true, email: true, pointsTotal: true },
          },
        },
        orderBy: { createdAt: "asc" },
      },
      transaction: {
        include: {
          counterpart: {
            select: { id: true, name: true, email: true, pointsTotal: true },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getExchangePostById(postId: string) {
  return prisma.exchangePost.findUnique({
    where: { id: postId },
    include: {
      author: {
        select: { id: true, name: true, email: true, pointsTotal: true },
      },
      images: {
        select: { id: true, blobUrl: true, sortOrder: true },
        orderBy: { sortOrder: "asc" },
      },
      replies: {
        include: {
          author: {
            select: { id: true, name: true, email: true, pointsTotal: true },
          },
        },
        orderBy: { createdAt: "asc" },
      },
      transaction: {
        include: {
          counterpart: {
            select: { id: true, name: true, email: true, pointsTotal: true },
          },
        },
      },
    },
  });
}

export function getDistinctReplyAuthors(post: ExchangePostRecord) {
  const seen = new Set<string>();

  return post.replies
    .filter((reply) => {
      if (reply.author.id === post.author.id) {
        return false;
      }

      if (seen.has(reply.author.id)) {
        return false;
      }

      seen.add(reply.author.id);
      return true;
    })
    .map((reply) => reply.author);
}
