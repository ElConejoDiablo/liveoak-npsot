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
  Postgres connection string for Prisma and Auth.js data.
- `AUTH_SECRET`
  Long random secret used by NextAuth/Auth.js.
- `AUTH_EMAIL_FROM`
  Verified sender address used for magic-link emails.
- `AUTH_RESEND_API_KEY`
  Resend API key for sending sign-in emails.
- `NEXTAUTH_URL`
  Base URL for local development, for example `http://localhost:3000`.
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
