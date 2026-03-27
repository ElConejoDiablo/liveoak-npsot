import test from "node:test";
import assert from "node:assert/strict";

import { shouldAwardCompletedInteractionPoints } from "@/lib/members/points";

test("points are not awarded before both confirmations exist", () => {
  assert.equal(
    shouldAwardCompletedInteractionPoints({
      ownerConfirmedAt: new Date("2026-03-26T10:00:00.000Z"),
      counterpartConfirmedAt: null,
      pointsAwardedAt: null,
    }),
    false,
  );
});

test("points are awarded once both confirmations exist and no award has been recorded", () => {
  assert.equal(
    shouldAwardCompletedInteractionPoints({
      ownerConfirmedAt: new Date("2026-03-26T10:00:00.000Z"),
      counterpartConfirmedAt: new Date("2026-03-26T11:00:00.000Z"),
      pointsAwardedAt: null,
    }),
    true,
  );
});

test("points are not awarded twice after an interaction has already been credited", () => {
  assert.equal(
    shouldAwardCompletedInteractionPoints({
      ownerConfirmedAt: new Date("2026-03-26T10:00:00.000Z"),
      counterpartConfirmedAt: new Date("2026-03-26T11:00:00.000Z"),
      pointsAwardedAt: new Date("2026-03-26T12:00:00.000Z"),
    }),
    false,
  );
});
