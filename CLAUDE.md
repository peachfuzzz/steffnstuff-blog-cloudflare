# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a personal blog built with Astro (v4), based on the AstroPaper theme. The blog focuses on games and design, deployed to Cloudflare Pages at https://steffnstuff.com (with dev subdomain at https://dev.steffnstuff.com).

## Development Commands

```bash
npm run dev          # Start dev server at localhost:4321
npm run build        # Build production site (includes jampack optimization)
npm run preview      # Preview production build locally
npm run sync         # Generate TypeScript types for Astro modules
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run lint         # Lint with ESLint
npm run cz           # Commit with commitizen (conventional commits)
```

## Architecture Overview

### Content System

- **Blog posts** live in `src/content/blog/` as Markdown files
- **Content schema** is defined in `src/content/config.ts` using Zod validation
- Posts support:
  - Frontmatter with required fields: `title`, `author`, `pubDatetime`, `description`
  - Optional fields: `modDatetime`, `featured`, `draft`, `tags`, `ogImage`, `canonicalURL`
  - Math equations via KaTeX (remark-math + rehype-katex)
  - Table of contents via remark-toc (collapsible)

### Configuration

- **Site config**: `src/config.ts` contains `SITE` (metadata, author, post count) and `SOCIALS` (social links)
- **Astro config**: `astro.config.ts` sets site URL, integrations, markdown plugins
- **Tailwind config**: `tailwind.config.cjs` uses CSS variables for theming with custom `withOpacity()` function

### Routing & Pages

Pages in `src/pages/` follow Astro's file-based routing:
- `/` - Homepage (index.astro)
- `/posts/` - All posts with pagination
- `/posts/[slug]/` - Individual post pages
- `/tags/` - All tags listing
- `/tags/[tag]/[page]` - Posts filtered by tag with pagination
- `/search` - Fuzzy search page (uses Fuse.js)
- `/rss.xml` - RSS feed (rss.xml.ts)

### Dynamic Image Generation

The blog generates Open Graph images dynamically using Satori and resvg-js:
- **Site OG image**: `/og.png` (generated via `src/pages/og.png.ts`)
- **Post OG images**: `/posts/[slug]/index.png` (one per blog post)
- **Templates**: Located in `src/utils/og-templates/`
- **Generator**: `src/utils/generateOgImages.tsx` fetches IBM Plex Mono fonts and converts images to base64

### Utilities

Core utilities in `src/utils/`:
- `getSortedPosts.ts` - Filters and sorts posts by date, handles drafts/scheduled posts
- `postFilter.ts` - Filters drafts and scheduled posts based on `SITE.scheduledPostMargin`
- `getPostsByTag.ts` - Filters posts by tag
- `getUniqueTags.ts` - Extracts unique tags with counts
- `getPagination.ts` - Calculates pagination offsets
- `getPageNumbers.ts` - Generates page number arrays
- `slugify.ts` - Creates URL-safe slugs

### Styling

- **TailwindCSS** with custom skin-based theming using CSS variables
- Light/dark mode support via CSS variables (--color-text-base, --color-fill, --color-accent, etc.)
- Typography plugin for prose content
- Custom fonts: IBM Plex Mono (monospace), Source Sans Pro (sans-serif)

### Components

Components in `src/components/` are primarily `.astro` files:
- Layout components: `Header.astro`, `Footer.astro`
- Navigation: `Breadcrumbs.astro`, `Pagination.astro`
- Content: `Tag.astro`, `ShareLinks.astro`, `Socials.astro`
- Some React components for interactivity (enabled via @astrojs/react)

### Layouts

Layouts in `src/layouts/`:
- `Layout.astro` - Base layout with head tags, theme script
- `Main.astro` - Main content wrapper
- `PostDetails.astro` - Individual blog post layout
- `Posts.astro` - Posts listing layout
- `TagPosts.astro` - Tag-filtered posts layout
- `AboutLayout.astro` - About page layout

## Important Notes

- **Deployment**: Built with jampack optimization, deployed to Cloudflare Pages
- **Git workflow**: Uses Husky for pre-commit hooks with lint-staged (Prettier formatting)
- **Commit style**: Conventional commits via Commitizen
- **Environment variables**: `PUBLIC_GOOGLE_SITE_VERIFICATION` for Google Search Console (optional)
- **Scheduled posts**: Posts with future dates are hidden based on `scheduledPostMargin` (15 min buffer)
