/** Fallback used when a name produces no usable slug characters. */
const FALLBACK_SLUG = "organization";

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
    .replace(/^-+|-+$/g, "");
  return slug.length > 0 ? slug : FALLBACK_SLUG;
}
