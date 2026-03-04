# CLAUDENOTES

## Image captions

Use title attribute syntax for captions: `![alt text](image.jpg "Caption text")`

Custom `rehypeImageCaptions` function defined inline in `astro.config.ts` (not a separate package).
Depends on `unist-util-visit` (transitive dep, no install needed).
Logic: finds `<p>` with single `<img>` child that has a `title` property → replaces `p` with `figure`, appends `figcaption` from title.

`rehype-figure` was tried but discarded — it uses alt text as caption, causing screen reader double-reading.

## Markdown plugins (astro.config.ts)

- remark: remarkMath, remarkToc, remarkCollapse (TOC trigger: "Table of contents")
- rehype: rehypeKatex, rehypeImageCaptions

## Images

Hosted externally at `https://images.steffnstuff.com/`. Not in the repo.

## Deployment

Cloudflare Pages. Dev subdomain: dev.steffnstuff.com. Build includes jampack optimization.
