export type TransactionConfirmationState = {
  ownerConfirmedAt: Date | null;
  counterpartConfirmedAt: Date | null;
  pointsAwardedAt: Date | null;
};

export function shouldResetTransactionForCounterpartChange(input: {
  currentCounterpartId: string | null;
  nextCounterpartId: string;
}) {
  return (
    Boolean(input.currentCounterpartId) &&
    input.currentCounterpartId !== input.nextCounterpartId
  );
}

export function getCounterpartSelectionUpdate(input: {
  currentCounterpartId: string | null;
  nextCounterpartId: string;
}) {
  if (
    shouldResetTransactionForCounterpartChange({
      currentCounterpartId: input.currentCounterpartId,
      nextCounterpartId: input.nextCounterpartId,
    })
  ) {
    return {
      counterpartId: input.nextCounterpartId,
      ownerConfirmedAt: null,
      counterpartConfirmedAt: null,
      completedAt: null,
      pointsAwardedAt: null,
    };
  }

  return {
    counterpartId: input.nextCounterpartId,
  };
}

export function getTransactionConfirmationUpdate(input: {
  actorUserId: string;
  ownerUserId: string;
  counterpartUserId: string | null;
  transaction: TransactionConfirmationState;
  now?: Date;
}) {
  const now = input.now ?? new Date();

  if (!input.counterpartUserId) {
    return {
      ok: false as const,
      message: "This interaction is not ready for confirmation yet.",
    };
  }

  if (input.transaction.pointsAwardedAt) {
    return {
      ok: false as const,
      message: "This interaction has already been completed.",
    };
  }

  if (
    input.actorUserId === input.ownerUserId &&
    !input.transaction.ownerConfirmedAt
  ) {
    return {
      ok: true as const,
      update: { ownerConfirmedAt: now },
    };
  }

  if (
    input.actorUserId === input.counterpartUserId &&
    !input.transaction.counterpartConfirmedAt
  ) {
    return {
      ok: true as const,
      update: { counterpartConfirmedAt: now },
    };
  }

  return {
    ok: false as const,
    message: "You are not allowed to confirm this interaction.",
  };
}
