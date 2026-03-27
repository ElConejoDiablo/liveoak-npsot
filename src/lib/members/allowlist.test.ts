import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";

import {
  findActiveMemberByEmail,
  normalizeMemberEmail,
  parseActiveMembersMarkdown,
} from "@/lib/members/allowlist-parser";

test("normalizeMemberEmail trims and lowercases", () => {
  assert.equal(
    normalizeMemberEmail("  Nikki@SanctuaryNatives.com "),
    "nikki@sanctuarynatives.com",
  );
});

test("parseActiveMembersMarkdown ignores headings and blank lines", () => {
  const members = parseActiveMembersMarkdown(`
# Active Members

- Example Member | Example@Email.com | member
`);

  assert.deepEqual(members, [
    {
      name: "Example Member",
      email: "example@email.com",
      role: "member",
    },
  ]);
});

test("parseActiveMembersMarkdown rejects duplicate emails case-insensitively", () => {
  assert.throws(
    () =>
      parseActiveMembersMarkdown(`
- Person One | duplicate@example.com | member
- Person Two | Duplicate@Example.com | admin
`),
    /duplicate email/i,
  );
});

test("findActiveMemberByEmail matches case-insensitively against the server roster", async () => {
  const markdown = await readFile(
    path.join(
      process.cwd(),
      "src",
      "data",
      "members",
      "active-members.md",
    ),
    "utf8",
  );
  const members = parseActiveMembersMarkdown(markdown);
  const member = findActiveMemberByEmail(members, "  Mesecke@GMAIL.com ");

  assert.ok(member);
  assert.equal(member?.email, "mesecke@gmail.com");
  assert.equal(member?.role, "admin");
});

test("findActiveMemberByEmail rejects non-members without exposing roster contents", async () => {
  const markdown = await readFile(
    path.join(
      process.cwd(),
      "src",
      "data",
      "members",
      "active-members.md",
    ),
    "utf8",
  );
  const members = parseActiveMembersMarkdown(markdown);

  assert.equal(findActiveMemberByEmail(members, "outsider@example.com"), undefined);
});
