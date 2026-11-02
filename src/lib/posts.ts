import { getCollection, type CollectionEntry } from "astro:content";
import { site } from "../config";
import { slugifyTag } from "./format";

export type Post = CollectionEntry<"posts">;

export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection("posts", ({ data }) => {
    if (import.meta.env.DEV) return true;
    return data.draft !== true;
  });

  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function paginatePosts(posts: Post[], page: number) {
  const size = Math.max(1, site.postsPerPage);
  const lastPage = Math.max(1, Math.ceil(posts.length / size));
  const current = Math.min(Math.max(1, page), lastPage);
  const start = (current - 1) * size;
  return {
    posts: posts.slice(start, start + size),
    current,
    lastPage,
    total: posts.length,
  };
}

export function uniqueTags(posts: Post[]): { tag: string; slug: string; count: number }[] {
  const counts = new Map<string, { tag: string; count: number }>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      const slug = slugifyTag(tag);
      if (!slug) continue;
      const prev = counts.get(slug);
      counts.set(slug, { tag: prev?.tag ?? tag, count: (prev?.count ?? 0) + 1 });
    }
  }
  return [...counts.entries()]
    .map(([slug, value]) => ({ slug, tag: value.tag, count: value.count }))
    .sort((a, b) => a.tag.localeCompare(b.tag, "es"));
}

export function postsForTag(posts: Post[], slug: string): Post[] {
  return posts.filter((post) => post.data.tags.some((tag) => slugifyTag(tag) === slug));
}

export function relatedPosts(posts: Post[], current: Post, limit = 2): Post[] {
  const tags = new Set(current.data.tags.map(slugifyTag));
  return posts
    .filter((post) => post.id !== current.id)
    .map((post) => ({
      post,
      score: post.data.tags.reduce((sum, tag) => sum + (tags.has(slugifyTag(tag)) ? 1 : 0), 0),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || b.post.data.date.valueOf() - a.post.data.date.valueOf())
    .slice(0, limit)
    .map((item) => item.post);
}
