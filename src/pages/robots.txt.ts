import type { APIRoute } from "astro";
import { SITE } from "@config";

export const GET: APIRoute = ({ site }) => {
  // Block all crawlers on dev subdomain
  const isDevSite = site?.hostname.startsWith('dev.');

  const robots = isDevSite
    ? `User-agent: *
Disallow: /`
    : `User-agent: Googlebot
Disallow: /nogooglebot/

User-agent: *
Allow: /

Sitemap: ${new URL("sitemap-index.xml", SITE.website).href}`;

  return new Response(robots.trim(), {
    headers: { "Content-Type": "text/plain" },
  });
};
