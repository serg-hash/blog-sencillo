import type { APIRoute } from "astro";
import { siteUrl } from "../config";
import { getPublishedPosts, uniqueTags, paginatePosts } from "../lib/posts";
import { homePath, pagePath, postPath, tagPath, tagsIndexPath } from "../lib/paths";

export const GET: APIRoute = async () => {
  const base = siteUrl();
  const posts = await getPublishedPosts();
  const tags = uniqueTags(posts);
  const { lastPage } = paginatePosts(posts, 1);
  const locales = ["es", "en"] as const;

  const paths = [
    homePath("es"),
    homePath("en"),
    tagsIndexPath("es"),
    tagsIndexPath("en"),
    ...locales.flatMap((locale) =>
      Array.from({ length: lastPage }, (_, index) => index + 1)
        .filter((page) => page > 1)
        .map((page) => pagePath(locale, page)),
    ),
    ...posts.flatMap((post) => [postPath("es", post.id), postPath("en", post.id)]),
    ...tags.flatMap(({ slug }) => [tagPath("es", slug), tagPath("en", slug)]),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((path) => `  <url><loc>${base}${path === "/" ? "/" : path}</loc></url>`).join("\n")}
</urlset>
`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
