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

## Local setup

```bash
pnpm install
pnpm dev
```

Helpful commands:

```bash
pnpm lint
pnpm typecheck
pnpm build
```

The dev server defaults to `http://localhost:3000`, but will move to another port automatically if needed.

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
- `src/content/posts/*.md`
  Blog/news posts with frontmatter metadata and Markdown content.

## Project structure

```text
src/
  app/                 App Router pages and metadata routes
  components/          Layout, section, card, and shared UI building blocks
  content/posts/       Markdown articles
  data/                Editable chapter/site data
  lib/                 Blog parsing, metadata helpers, formatting utilities
```

## Vercel deployment

This project is ready to import directly into Vercel.

- Framework preset: `Next.js`
- Install command: `pnpm install`
- Build command: `pnpm build`
- Output setting: default Next.js output
- Environment variables: none required

Suggested deployment steps:

1. Import the GitHub repository into Vercel.
2. Confirm the production domain `liveoak-npsot.org`.
3. Trigger the first production deployment.
4. Update site content in `src/data/*` and `src/content/posts/*` as chapter details evolve.

## Included platform/SEO basics

- route-level metadata
- Open Graph image generation
- `robots.txt`
- `sitemap.xml`
- web app manifest
- placeholder site icon

## Notes

- Blog content is file-based and intentionally lightweight.
- Several calendar and operational details are marked as sample content until the chapter publishes final schedules and documents.
- Newsletter signup currently uses an email-based placeholder flow until a dedicated mailing platform is chosen.
