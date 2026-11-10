import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import { site } from "./src/config.ts";

const siteFromEnv = process.env.SITE_URL?.trim();
const baseFromEnv = process.env.BASE_PATH?.trim();
const base =
  !baseFromEnv || baseFromEnv === "/"
    ? "/"
    : `/${baseFromEnv.replace(/^\/+|\/+$/g, "")}`;

function joinBase(prefix, path) {
  if (!path || !path.startsWith("/") || path.startsWith("//")) return path;
  if (!prefix || prefix === "/") return path;
  if (path === prefix || path.startsWith(`${prefix}/`)) return path;
  return `${prefix}${path}`;
}

/** Markdown root-relative links ignore Astro `base`; patch leftover href/src in HTML. */
function prefixHtmlUrls(prefix) {
  return {
    name: "prefix-html-urls",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        if (!prefix || prefix === "/") return;
        const visit = async (folder) => {
          for (const entry of await readdir(folder, { withFileTypes: true })) {
            const full = join(folder, entry.name);
            if (entry.isDirectory()) {
              await visit(full);
              continue;
            }
            if (!entry.name.endsWith(".html")) continue;
            const original = await readFile(full, "utf8");
            const next = original.replace(
              /\b(href|src)="(\/[^"]*)"/g,
              (_all, attr, url) => `${attr}="${joinBase(prefix, url)}"`,
            );
            if (next !== original) await writeFile(full, next);
          }
        };
        await visit(fileURLToPath(dir));
      },
    },
  };
}

export default defineConfig({
  output: "static",
  site: (siteFromEnv || site.url).replace(/\/+$/, ""),
  base,
  integrations: [prefixHtmlUrls(base)],
  compressHTML: true,
  build: {
    inlineStylesheets: "auto",
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      defaultColor: false,
      wrap: true,
    },
  },
});
