/** Fallback used when a name produces no usable slug characters. */
const FALLBACK_SLUG = "organization";

/** Keeps generated filenames within filesystem name limits. */
const MAX_SLUG_LENGTH = 60;

/**
 * Turns an organization name into a lowercase, ASCII, dash-separated slug
 * safe for filenames: "St. Mary's Café & Co." → "st-marys-cafe-co".
 */
export function slugify(value: string): string {
  const slug = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['\u2018\u2019]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, MAX_SLUG_LENGTH)
    .replace(/-+$/, "");
  return slug.length > 0 ? slug : FALLBACK_SLUG;
}
