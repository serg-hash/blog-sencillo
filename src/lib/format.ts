import type { Locale } from "../config";

export function formatDate(date: Date, locale: Locale): string {
  // Date-only frontmatter (`YYYY-MM-DD`) is parsed as midnight UTC.
  // Format in UTC so the calendar day matches the file, not the build TZ.
  return new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function slugifyTag(tag: string): string {
  return tag
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
