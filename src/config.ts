/**
 * ============================================================================
 *  blog-sencillo — configuración
 *  blog-sencillo — configuration
 * ============================================================================
 *
 * ES: Este es el único archivo que tienes que editar para personalizar el
 *     blog (nombre, autor, redes, URL, paginación…). Los artículos viven
 *     en `content/posts/` como archivos Markdown. Luego: `npm run build`.
 *
 * EN: This is the only file you need to edit to customize the blog (name,
 *     author, socials, URL, pagination…). Posts live in `content/posts/`
 *     as Markdown files. Then run `npm run build`.
 *
 * No hace falta ningún secreto, API key ni servicio de pago.
 * No secrets, API keys or paid services required.
 */

export type Locale = "es" | "en";

/** Texto en un solo idioma, o uno distinto por idioma. */
export type I18nText = string | { es: string; en: string };

export type Social = {
  /**
   * Red: github | x | youtube | mastodon | bluesky | linkedin |
   * instagram | email | web | rss
   */
  network: string;
  url: string;
  /** Etiqueta accesible. Si se omite, se usa el nombre de la red. */
  label?: I18nText;
};

/**
 * -------------------------------------------------------------------------
 *  Tus datos  /  Your details
 * -------------------------------------------------------------------------
 *
 * Por defecto este es el blog de Sergio. Cambia estos campos por los tuyos.
 */
export const site = {
  /**
   * URL pública del blog, sin barra final.
   * Se usa en canonical, Open Graph, RSS y el sitemap.
   * Public URL of your blog, no trailing slash.
   */
  url: "https://example.com",

  /** Idioma por defecto de la UI (la otra versión vive en /en/). */
  defaultLocale: "es" as Locale,

  /** Muestra el conmutador ES / EN. Ponlo a false para un solo idioma. */
  showLanguageSwitch: true,

  /** Nombre del blog (cabecera, pestaña, RSS). */
  name: "Blog sencillo",

  /**
   * Título corto para SEO / OG. Si lo dejas vacío se usa el nombre.
   * Short SEO/OG title. Falls back to `name` when empty.
   */
  title: {
    es: "Blog sencillo — artículos en Markdown",
    en: "Blog sencillo — Markdown posts",
  } satisfies I18nText,

  /** Descripción para buscadores, RSS y tarjetas sociales. */
  description: {
    es: "Un blog estático en Markdown: añade un archivo y publica. Listo para Hostinger o un VPS con Docker.",
    en: "A static Markdown blog: add a file and publish. Ready for Hostinger or a VPS with Docker.",
  } satisfies I18nText,

  /** Frase bajo el nombre en la portada. */
  tagline: {
    es: "Escribes en Markdown. El sitio se construye solo.",
    en: "You write Markdown. The site builds itself.",
  } satisfies I18nText,

  author: {
    name: "Sergio Trujillo Muñoz",
    /** Handle o @usuario. Déjalo vacío para ocultarlo. */
    handle: "@sergiogrok",
    url: "https://github.com/serg-hash",
  },

  /**
   * Redes (pie de página e iconos).
   * `network` elige el pictograma; `url` es el destino.
   * El feed RSS se añade solo; no hace falta listarlo aquí.
   */
  socials: [
    { network: "github", url: "https://github.com/serg-hash", label: "GitHub" },
    { network: "x", url: "https://x.com/sergiogrok", label: "X" },
  ] satisfies Social[],

  /**
   * Artículos por página en el listado. Si hay más, aparece paginación.
   * Posts per page on the index. Pagination appears when there are more.
   */
  postsPerPage: 5,

  /**
   * Palabras por minuto para el tiempo de lectura (español ~200).
   * Words per minute for reading time.
   */
  wordsPerMinute: 200,
};

/** Convierte un texto i18n al idioma activo. */
export function localize(value: I18nText, locale: Locale): string {
  if (typeof value === "string") return value;
  return value[locale] || value.es || value.en;
}

export function siteUrl(): string {
  return site.url.replace(/\/+$/, "");
}
