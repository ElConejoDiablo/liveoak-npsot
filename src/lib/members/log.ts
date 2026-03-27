function maskEmail(email: string | null | undefined) {
  if (!email) {
    return undefined;
  }

  const normalized = email.trim().toLowerCase();
  const [localPart, domain] = normalized.split("@");

  if (!localPart || !domain) {
    return "[invalid-email]";
  }

  const visibleLocal = localPart.slice(0, 2);
  return `${visibleLocal}***@${domain}`;
}

export function logMembersPortalEvent(
  event: string,
  details: Record<string, unknown> = {},
) {
  console.error(`[members] ${event}`, details);
}

export function logMembersPortalAuthEvent(input: {
  event: string;
  email?: string | null;
  details?: Record<string, unknown>;
}) {
  console.warn(`[members-auth] ${input.event}`, {
    ...input.details,
    email: maskEmail(input.email),
  });
}
