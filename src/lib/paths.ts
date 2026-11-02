import { site, type Locale } from "../config";

export function homePath(locale: Locale): string {
  if (locale === site.defaultLocale) return "/";
  return locale === "es" ? "/es/" : "/en/";
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
  { from: /^\/en\/?$/, es: () => homePath("es"), en: () => homePath("en") },
  { from: /^\/es\/?$/, es: () => homePath("es"), en: () => homePath("en") },
  { from: /^\/?$/, es: () => homePath("es"), en: () => homePath("en") },
];

/** Equivalente de una ruta en el otro idioma de la UI. */
export function swapLocalePath(pathname: string, target: Locale): string {
  const path = pathname.replace(/\/+$/, "") || "/";
  for (const rule of swaps) {
    const match = path.match(rule.from);
    if (match) return rule[target](match);
  }
  return homePath(target);
}

export function absoluteUrl(base: string, path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const prefix = base.replace(/\/+$/, "");
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${prefix}${suffix}`;
}
