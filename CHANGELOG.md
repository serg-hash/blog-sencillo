# Changelog

All notable changes to this project are documented here.

## [0.1.0] — 2026-11-10

First tagged release of **blog-sencillo**: a minimal, Spanish-first Markdown blog.

### Added

- Static Astro site: Markdown posts, tags, pagination, RSS, sitemap, robots.txt
- Spanish UI at `/` and English chrome at `/en/` (posts stay in the language you write)
- Dark / light theme, reading time, Open Graph, JSON-LD, no tracking
- One config file (`src/config.ts`) plus posts in `content/posts/`
- Docker Compose + nginx image for a VPS
- GitHub Actions CI (`npm run check` and `npm run build`)
- GitHub Pages workflow that builds with `SITE_URL` and `BASE_PATH` so the demo works at `https://serg-hash.github.io/blog-sencillo/`
- Sample posts that explain how to write and publish

[0.1.0]: https://github.com/serg-hash/blog-sencillo/releases/tag/v0.1.0
