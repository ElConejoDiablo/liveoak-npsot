import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";

import {
  findActiveMemberByEmail,
  normalizeMemberEmail,
  parseActiveMembersMarkdown,
  type ActiveMember,
  type MemberRole,
} from "@/lib/members/allowlist-parser";

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

const ACTIVE_MEMBERS_PATH = path.join(
  process.cwd(),
  "src",
  "data",
  "members",
  "active-members.md",
);

export async function getActiveMembers(): Promise<ActiveMember[]> {
  const markdown = await readFile(ACTIVE_MEMBERS_PATH, "utf8");
  return parseActiveMembersMarkdown(markdown);
}

export async function getMemberByEmail(
  email: string,
): Promise<ActiveMember | undefined> {
  const normalizedEmail = normalizeMemberEmail(email);

  if (!normalizedEmail) {
    return undefined;
  }

  const members = await getActiveMembers();
  return findActiveMemberByEmail(members, normalizedEmail);
}

export async function isAllowedMemberEmail(email: string): Promise<boolean> {
  const member = await getMemberByEmail(email);
  return member !== undefined;
}

export async function isAdminMemberEmail(email: string): Promise<boolean> {
  const member = await getMemberByEmail(email);
  return member?.role === "admin";
}

export type { ActiveMember, MemberRole };
export { normalizeMemberEmail, parseActiveMembersMarkdown };
