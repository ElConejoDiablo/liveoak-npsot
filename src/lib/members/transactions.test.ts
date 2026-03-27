import test from "node:test";
import assert from "node:assert/strict";

import {
  getCounterpartSelectionUpdate,
  getTransactionConfirmationUpdate,
  shouldResetTransactionForCounterpartChange,
} from "@/lib/members/transactions";

test("changing the selected counterpart resets stale confirmation state", () => {
  const update = getCounterpartSelectionUpdate({
    currentCounterpartId: "member-a",
    nextCounterpartId: "member-b",
  });

  assert.deepEqual(update, {
    counterpartId: "member-b",
    ownerConfirmedAt: null,
    counterpartConfirmedAt: null,
    completedAt: null,
    pointsAwardedAt: null,
  });
});

test("keeping the same counterpart does not reset existing transaction state", () => {
  assert.equal(
    shouldResetTransactionForCounterpartChange({
      currentCounterpartId: "member-a",
      nextCounterpartId: "member-a",
    }),
    false,
  );
});

test("post owner can confirm once when the transaction is pending", () => {
  const now = new Date("2026-03-26T12:00:00.000Z");
  const result = getTransactionConfirmationUpdate({
    actorUserId: "owner-1",
    ownerUserId: "owner-1",
    counterpartUserId: "member-2",
    transaction: {
      ownerConfirmedAt: null,
      counterpartConfirmedAt: null,
      pointsAwardedAt: null,
    },
    now,
  });

  assert.deepEqual(result, {
    ok: true,
    update: {
      ownerConfirmedAt: now,
    },
  });
});

test("a completed transaction cannot be confirmed again", () => {
  const result = getTransactionConfirmationUpdate({
    actorUserId: "owner-1",
    ownerUserId: "owner-1",
    counterpartUserId: "member-2",
    transaction: {
      ownerConfirmedAt: new Date("2026-03-24T10:00:00.000Z"),
      counterpartConfirmedAt: new Date("2026-03-24T11:00:00.000Z"),
      pointsAwardedAt: new Date("2026-03-24T12:00:00.000Z"),
    },
  });

  assert.deepEqual(result, {
    ok: false,
    message: "This interaction has already been completed.",
  });
});

test("unrelated members cannot confirm another member's interaction", () => {
  const result = getTransactionConfirmationUpdate({
    actorUserId: "outsider",
    ownerUserId: "owner-1",
    counterpartUserId: "member-2",
    transaction: {
      ownerConfirmedAt: null,
      counterpartConfirmedAt: null,
      pointsAwardedAt: null,
    },
  });

  assert.deepEqual(result, {
    ok: false,
    message: "You are not allowed to confirm this interaction.",
  });
});
