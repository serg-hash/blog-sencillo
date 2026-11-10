import type { APIRoute } from "astro";
import { localize, site } from "../config";
import { withBase } from "../lib/paths";

export const GET: APIRoute = () => {
  const body = {
    name: site.name,
    short_name: site.name,
    description: localize(site.description, site.defaultLocale),
    start_url: withBase("/"),
    display: "standalone",
    background_color: "#12110e",
    theme_color: "#12110e",
    lang: site.defaultLocale,
    icons: [
      { src: withBase("/favicon.svg"), type: "image/svg+xml", sizes: "any", purpose: "any" },
      { src: withBase("/apple-touch-icon.png"), type: "image/png", sizes: "180x180" },
    ],
  };

  return new Response(JSON.stringify(body), {
    headers: { "Content-Type": "application/manifest+json; charset=utf-8" },
  });
};
