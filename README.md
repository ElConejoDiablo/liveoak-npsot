# Live Oak Chapter, Native Plant Society of Texas

Production-ready chapter website for the Live Oak Chapter of the Native Plant Society of Texas. The site uses a local data/content model so chapter information can be updated without adding CMS overhead.

## Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS v4
- shadcn/ui primitives
- lucide-react icons
- Framer Motion for restrained entrance motion
- Markdown-based local blog content
- Auth.js email magic-link authentication for the members portal
- Prisma + Postgres for protected member exchange data
- Vercel Blob for member post images

## Local setup

```bash
pnpm install
pnpm dev
```

Helpful commands:

```bash
pnpm lint
pnpm test:members
pnpm typecheck
pnpm build
pnpm prisma:generate
pnpm prisma:push
```

The dev server defaults to `http://localhost:3000`, but will move to another port automatically if needed.

For the members portal, copy `.env.example` to `.env.local` and fill in the required values before using auth, database, or uploads.

## Content editing

Chapter content is centralized in a small set of files:

- `src/data/site.ts`
  Chapter identity, domain, contact email, social links, mission, service area, navigation, and leadership.
- `src/data/events.ts`
  Upcoming events and event-page guidance.
- `src/data/programs.ts`
  Program descriptions, seasonal highlights, and volunteer pathways.
- `src/data/resources.ts`
  Structured external and internal resource links.
- `src/data/documents.ts`
  Document placeholders and empty-state messaging.
- `src/data/member-documents.ts`
  Protected members-only document metadata.
- `src/data/members/active-members.md`
  Server-only allowlist used for members portal access checks.
- `src/content/posts/*.md`
  Blog/news posts with frontmatter metadata and Markdown content.
- `prisma/schema.prisma`
  Members portal database schema for auth, exchange posts, replies, transactions, and points.

## Project structure

```text
src/
  app/                 App Router pages and metadata routes
  components/          Layout, section, card, and shared UI building blocks
  content/posts/       Markdown articles
  data/                Editable chapter/site data
  lib/                 Blog parsing, metadata helpers, formatting utilities
  lib/members/         Server-only allowlist and members portal utilities
prisma/
  schema.prisma        Prisma schema for auth and members portal data
```

## Vercel deployment

This project is ready to import directly into Vercel.

- Framework preset: `Next.js`
- Install command: `pnpm install`
- Build command: `pnpm build`
- Output setting: default Next.js output
- Public site only: no environment variables required
- Members portal: requires environment variables for auth, database, and uploads

Suggested deployment steps:

1. Import the GitHub repository into Vercel.
2. Confirm the production domain `liveoak-npsot.org`.
3. Trigger the first production deployment.
4. Update site content in `src/data/*` and `src/content/posts/*` as chapter details evolve.

## Members portal setup

Required environment variables:

- `DATABASE_URL`
  Postgres connection string for Prisma and Auth.js session/user data.
- `AUTH_SECRET`
  Long random secret used by Auth.js for signing and encryption.
- `AUTH_EMAIL_FROM`
  Verified sender address used for magic-link emails.
  Format: `Display Name <email@example.com>`
- `AUTH_RESEND_API_KEY`
  Resend API key for sending sign-in emails.
- `NEXTAUTH_URL`
  Full base URL for the current environment.
  Use `http://localhost:3000` locally and the exact deployed `https://...` URL in staging and production.
- `BLOB_READ_WRITE_TOKEN`
  Vercel Blob token used for top-level member post image uploads.

Recommended setup flow:

```bash
cp .env.example .env.local
pnpm install
pnpm prisma:generate
pnpm prisma:push
pnpm dev
```

Environment setup notes:

- Copy `.env.example` to `.env.local` for local development.
- Do not commit real secrets.
- `AUTH_EMAIL_FROM` must be a Resend-verified sender and should stay in the exact `Display Name <email@example.com>` format.
- `NEXTAUTH_URL` must exactly match the environment where auth callbacks run. A wrong value here can break magic-link callbacks even when email delivery succeeds.
- The members portal is considered fully configured only when all six variables above are present and valid on the server.

Staging verification setup:

1. Set all required environment variables in the staging environment.
2. Set `NEXTAUTH_URL` to the exact staging URL that members will use.
3. Confirm `AUTH_EMAIL_FROM` is a verified sender in Resend.
4. Run `pnpm prisma:generate`.
5. Run `pnpm prisma:push` against the staging Postgres database.
6. Confirm the allowlist file at `src/data/members/active-members.md` contains the staging tester emails.
7. Deploy or start the app with the same env vars available to the server runtime.

Production notes:

- Use the production database and production Resend sender/domain separately from staging.
- Set `NEXTAUTH_URL` to the final production site URL before testing magic links.
- Rotate `AUTH_SECRET`, Resend keys, and Blob tokens through your secret manager or Vercel project settings, not in the repo.

Members portal notes:

- The allowlist source of truth is `src/data/members/active-members.md`.
- Only allowlisted emails can complete member sign-in.
- Unauthorized users should see only generic auth failure messaging.
- Exchange posts, replies, transaction confirmations, and points live in Postgres, not markdown.
- Resend must be configured with a verified sender/domain for `AUTH_EMAIL_FROM`.
- Vercel Blob is required only for top-level member post image uploads.
- Without the members env vars, the public site still works, but local member sign-in stays unavailable by design.

Operational checks:

```bash
pnpm test:members
pnpm lint
pnpm typecheck
pnpm build
```

Current production-readiness notes:

- Server-side allowlist enforcement, protected member routes, and mutation guards are implemented.
- The members portal still needs real Postgres, Resend, and Vercel Blob credentials for full end-to-end verification.
- Protected member document metadata is ready, but real internal files still need to be supplied by the chapter.
- This MVP does not yet include moderation tools, admin dashboards, or member content editing/deletion flows.

## Members staging checklist

Use this checklist for a real staging verification run:

1. Auth and access
- Visit `/members` while signed out and confirm it redirects to `/members/sign-in`.
- Request a magic link with an allowlisted email and confirm the sign-in email is delivered.
- Request a magic link with a non-allowlisted email and confirm the UI stays generic and does not reveal roster membership.
- Complete a magic-link sign-in with an allowlisted email and confirm `/members` loads successfully.

2. Database and allowlist sync
- Confirm a matching `User` row exists in Postgres after successful sign-in.
- Confirm the signed-in user has the expected `role` from `src/data/members/active-members.md`.
- Confirm signed-out access to `/members`, `/members/documents`, `/members/exchange`, and `/members/exchange/[postId]` is blocked server-side.

3. Documents
- Confirm `/members/documents` renders for an authenticated allowlisted member.
- Confirm document metadata shows correctly and links resolve as expected for any real internal files added for staging.

4. Exchange board
- Create a new member post without images.
- Create a new member post with 1 or more images and confirm the images render on the detail page.
- Confirm invalid file types and oversize files fail with safe user-facing messages.
- Confirm the new post appears on `/members/exchange` and `/members`.
- Add a reply from a second allowlisted member.
- Confirm a stale or invalid post ID fails safely and does not expose internal errors.

5. Transaction confirmation and points
- As the post owner, select a valid replying member as the counterpart.
- Confirm the counterpart selection updates the post status to `pending`.
- Confirm once as the owner and verify the interaction remains incomplete.
- Confirm once as the counterpart and verify the interaction becomes `completed`.
- Confirm both users receive exactly 1 point.
- Repeat the confirmation submission and verify no extra points are awarded.
- Change the counterpart before completion and verify stale confirmations are cleared.

6. What to inspect during staging
- Resend delivery logs for magic-link delivery success/failure.
- Postgres rows for `User`, `ExchangePost`, `ExchangeReply`, `ExchangeTransaction`, and `PointLedger`.
- Blob objects under the `members/exchange/` prefix for uploaded post images.
- Server logs for `[members]` and `[members-auth]` events if auth, mutation, upload, or points-award failures occur.

7. Environment checks
- Set all six required members-portal variables in Vercel for the target environment.
- Verify the app can connect to Postgres before testing auth flows.
- Verify magic-link email delivery from Resend.
- Verify the callback/auth flow completes against the exact `NEXTAUTH_URL` for that environment.
- Verify Blob upload succeeds for a top-level member post image.

## Known manual verification limits

These still require a real staging environment with external services:

- live magic-link email delivery and callback handling
- real Postgres writes and persistence checks
- real Vercel Blob upload and retrieval behavior
- full multi-user confirmation and points verification across separate member accounts

## Included platform/SEO basics

- route-level metadata
- Open Graph image generation
- `robots.txt`
- `sitemap.xml`
- web app manifest
- placeholder site icon

## Notes

- Blog content is file-based and intentionally lightweight.
- Some member document entries are structured placeholders until real member files are supplied.
- Top-level member post image uploads use Vercel Blob and require `BLOB_READ_WRITE_TOKEN`.
