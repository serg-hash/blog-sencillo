import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { localize, site, siteUrl } from "../config";
import { getPublishedPosts } from "../lib/posts";
import { postPath } from "../lib/paths";

export async function GET(context: APIContext) {
  const posts = await getPublishedPosts();
  return rss({
    title: site.name,
    description: localize(site.description, "es"),
    site: context.site ?? siteUrl(),
    xmlns: { atom: "http://www.w3.org/2005/Atom" },
    customData: `<language>es</language><atom:link href="${siteUrl()}/rss.xml" rel="self" type="application/rss+xml"/>`,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      categories: post.data.tags,
      link: postPath("es", post.id),
    })),
  });
}
