import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";

// This module is server-only because it reads the member allowlist from disk for
// access control checks. It must never be imported into client components,
// exposed through public APIs, or bundled into browser code, or the roster would
// be leaked to unauthorized users.
//
// Safe maintenance notes:
// - edit only src/data/members/active-members.md
// - keep one member per line using the documented format
// - do not move the roster into public assets
// - surface only generic auth failures to end users; detailed parser errors are
//   for server logs and maintainer debugging only

export type MemberRole = "admin" | "member";

export type ActiveMember = {
  name: string;
  email: string;
  role: MemberRole;
};

const ACTIVE_MEMBERS_PATH = path.join(
  process.cwd(),
  "src",
  "data",
  "members",
  "active-members.md",
);

const SUPPORTED_ROLES = new Set<MemberRole>(["admin", "member"]);

function createRosterError(message: string, lineNumber?: number) {
  const location = lineNumber ? ` line ${lineNumber}` : "";
  return new Error(`Invalid active member roster entry at${location}: ${message}`);
}

function normalizeEmail(email: string) {
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
  const email = normalizeEmail(rawEmail);

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

function parseActiveMembersMarkdown(markdown: string): ActiveMember[] {
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

export async function getActiveMembers(): Promise<ActiveMember[]> {
  const markdown = await readFile(ACTIVE_MEMBERS_PATH, "utf8");
  return parseActiveMembersMarkdown(markdown);
}

export async function getMemberByEmail(
  email: string,
): Promise<ActiveMember | undefined> {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    return undefined;
  }

  const members = await getActiveMembers();
  return members.find((member) => member.email === normalizedEmail);
}

export async function isAllowedMemberEmail(email: string): Promise<boolean> {
  const member = await getMemberByEmail(email);
  return member !== undefined;
}

export async function isAdminMemberEmail(email: string): Promise<boolean> {
  const member = await getMemberByEmail(email);
  return member?.role === "admin";
}
