export type MemberRole = "admin" | "member";

export type ActiveMember = {
  name: string;
  email: string;
  role: MemberRole;
};

const SUPPORTED_ROLES = new Set<MemberRole>(["admin", "member"]);

function createRosterError(message: string, lineNumber?: number) {
  const location = lineNumber ? ` line ${lineNumber}` : "";
  return new Error(`Invalid active member roster entry at${location}: ${message}`);
}

export function normalizeMemberEmail(email: string) {
  return email.trim().toLowerCase();
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function parseMemberLine(line: string, lineNumber: number): ActiveMember {
  if (!line.startsWith("- ")) {
    throw createRosterError(
      'expected a member line starting with "- Full Name | email@example.com | role"',
      lineNumber,
    );
  }

  const parts = line
    .slice(2)
    .split("|")
    .map((part) => part.trim());

  if (parts.length !== 3) {
    throw createRosterError(
      "expected exactly 3 fields separated by | characters",
      lineNumber,
    );
  }

  const [name, rawEmail, rawRole] = parts;
  const email = normalizeMemberEmail(rawEmail);

  if (!name) {
    throw createRosterError("member name is required", lineNumber);
  }

  if (!email) {
    throw createRosterError("member email is required", lineNumber);
  }

  if (!isValidEmail(email)) {
    throw createRosterError(`invalid email "${rawEmail}"`, lineNumber);
  }

  if (!rawRole) {
    throw createRosterError("member role is required", lineNumber);
  }

  if (!SUPPORTED_ROLES.has(rawRole as MemberRole)) {
    throw createRosterError(
      `unsupported role "${rawRole}"; expected one of: ${Array.from(SUPPORTED_ROLES).join(", ")}`,
      lineNumber,
    );
  }

  return {
    name,
    email,
    role: rawRole as MemberRole,
  };
}

export function parseActiveMembersMarkdown(markdown: string): ActiveMember[] {
  const members: ActiveMember[] = [];
  const seenEmails = new Set<string>();

  for (const [index, rawLine] of markdown.split(/\r?\n/).entries()) {
    const lineNumber = index + 1;
    const line = rawLine.trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    const member = parseMemberLine(line, lineNumber);

    if (seenEmails.has(member.email)) {
      throw createRosterError(`duplicate email "${member.email}"`, lineNumber);
    }

    seenEmails.add(member.email);
    members.push(member);
  }

  return members;
}

export function findActiveMemberByEmail(
  members: ActiveMember[],
  email: string,
): ActiveMember | undefined {
  const normalizedEmail = normalizeMemberEmail(email);

  if (!normalizedEmail) {
    return undefined;
  }

  return members.find((member) => member.email === normalizedEmail);
}
