import type { UrlValidation } from "@/types/growth-kit";

const SPREADBLISS_DOMAINS = ["spreadbliss.com", "spreadbliss.org"];

export const ACCEPTED_LOGO_TYPES = ["image/png", "image/jpeg", "image/webp"];
export const ACCEPTED_LOGO_LABEL = "PNG, JPEG or WebP";
export const MAX_LOGO_BYTES = 5 * 1024 * 1024;

export function isSpreadblissHostname(hostname: string): boolean {
  const host = hostname.toLowerCase();
  return SPREADBLISS_DOMAINS.some((domain) => host === domain || host.endsWith(`.${domain}`));
}

export function validateOrganizationName(name: string): string | null {
  return name.trim().length === 0 ? "Organization name is required." : null;
}

export function validateProfileUrl(rawUrl: string): UrlValidation {
  const trimmed = rawUrl.trim();
  if (trimmed.length === 0) {
    return { status: "empty" };
  }

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return {
      status: "invalid",
      error: "Enter a complete URL, e.g. https://spreadbliss.org/your-organization",
    };
  }

  if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
    return {
      status: "invalid",
      error: "Only http:// and https:// links are supported.",
    };
  }

  return {
    status: "valid",
    url: trimmed,
    warning: isSpreadblissHostname(parsed.hostname)
      ? undefined
      : "This link is valid but doesn't look like a Spreadbliss profile URL. You can still use it.",
  };
}

export function validateLogoFile(file: File): string | null {
  if (!ACCEPTED_LOGO_TYPES.includes(file.type)) {
    return `That file type isn't supported — please choose a ${ACCEPTED_LOGO_LABEL} image.`;
  }
  if (file.size > MAX_LOGO_BYTES) {
    return "That file is larger than 5 MB — please choose a smaller image.";
  }
  return null;
}
