import type { Locale } from "../config";

/**
 * Join a site `base` (`/` or `/blog-sencillo`) with a root-relative path.
 * Absolute, hash, mailto and already-prefixed URLs are left alone.
 */
export function joinBase(base: string, path: string): string {
  if (
    !path ||
    /^(https?:\/\/|\/\/|mailto:|tel:|#)/i.test(path) ||
    !path.startsWith("/")
  ) {
    return path;
  }

  const prefix =
    !base || base === "/" ? "" : `/${base.replace(/^\/+|\/+$/g, "")}`;
  if (!prefix) return path;
  if (path === prefix || path.startsWith(`${prefix}/`)) return path;
  return `${prefix}${path}`;
}

/** Prefix a root-relative path with Astro's `base` (needed on GitHub Pages). */
export function withBase(path: string): string {
  return joinBase(import.meta.env.BASE_URL || "/", path);
}

/** Strip Astro's `base` so locale routing can match `/articulo/...` etc. */
export function stripBase(pathname: string): string {
  const raw = pathname || "/";
  const base = import.meta.env.BASE_URL || "/";
  if (!base || base === "/") return raw;
  const prefix = `/${base.replace(/^\/+|\/+$/g, "")}`;
  if (raw === prefix || raw === `${prefix}/`) return "/";
  if (raw.startsWith(`${prefix}/`)) return raw.slice(prefix.length) || "/";
  return raw;
}

export function homePath(locale: Locale): string {
  return locale === "es" ? "/" : "/en/";
}

export function postPath(locale: Locale, slug: string): string {
  return locale === "es" ? `/articulo/${slug}` : `/en/post/${slug}`;
}

export function tagPath(locale: Locale, slug: string): string {
  return locale === "es" ? `/etiqueta/${slug}` : `/en/tag/${slug}`;
}

export function tagsIndexPath(locale: Locale): string {
  return locale === "es" ? "/etiquetas" : "/en/tags";
}

export function pagePath(locale: Locale, page: number): string {
  if (page <= 1) return homePath(locale);
  return locale === "es" ? `/pagina/${page}` : `/en/page/${page}`;
}

export function rssPath(): string {
  return "/rss.xml";
}

const swaps: Array<{ from: RegExp; es: (m: RegExpMatchArray) => string; en: (m: RegExpMatchArray) => string }> = [
  { from: /^\/en\/post\/([^/]+)\/?$/, es: (m) => `/articulo/${m[1]}`, en: (m) => `/en/post/${m[1]}` },
  { from: /^\/articulo\/([^/]+)\/?$/, es: (m) => `/articulo/${m[1]}`, en: (m) => `/en/post/${m[1]}` },
  { from: /^\/en\/tag\/([^/]+)\/?$/, es: (m) => `/etiqueta/${m[1]}`, en: (m) => `/en/tag/${m[1]}` },
  { from: /^\/etiqueta\/([^/]+)\/?$/, es: (m) => `/etiqueta/${m[1]}`, en: (m) => `/en/tag/${m[1]}` },
  { from: /^\/en\/tags\/?$/, es: () => "/etiquetas", en: () => "/en/tags" },
  { from: /^\/etiquetas\/?$/, es: () => "/etiquetas", en: () => "/en/tags" },
  { from: /^\/en\/page\/([^/]+)\/?$/, es: (m) => `/pagina/${m[1]}`, en: (m) => `/en/page/${m[1]}` },
  { from: /^\/pagina\/([^/]+)\/?$/, es: (m) => `/pagina/${m[1]}`, en: (m) => `/en/page/${m[1]}` },
  { from: /^\/en\/?$/, es: () => "/", en: () => "/en/" },
  { from: /^\/?$/, es: () => "/", en: () => "/en/" },
];

/** Equivalente de una ruta en el otro idioma de la UI. */
export function swapLocalePath(pathname: string, target: Locale): string {
  const path = stripBase(pathname).replace(/\/+$/, "") || "/";
  for (const rule of swaps) {
    const match = path.match(rule.from);
    if (match) return rule[target](match);
  }
  return target === "en" ? "/en/" : "/";
}

export function absoluteUrl(base: string, path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const prefix = base.replace(/\/+$/, "");
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${prefix}${suffix}`;
}
