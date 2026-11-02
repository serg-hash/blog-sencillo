import { defineConfig } from "astro/config";
import { siteUrl } from "./src/config.ts";

export default defineConfig({
  output: "static",
  site: siteUrl(),
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
