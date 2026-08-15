import { buildEmailBody, buildEmailSubject, buildShareMessage } from "@/lib/strings";

/**
 * Centralized sharing behavior for every platform in the "Share Your Profile"
 * section. Content generation and platform strategy live here; components only
 * render buttons and execute the returned plan.
 *
 * Platform endpoints verified against first-party sources on 2026-08-15:
 * - LinkedIn:  https://www.linkedin.com/sharing/share-offsite/?url= (Microsoft LinkedIn Share Plugin docs)
 * - Facebook:  https://www.facebook.com/sharer/sharer.php?u= (URL-only; custom text params unsupported)
 * - Threads:   https://www.threads.com/intent/post?text=&url= (developers.facebook.com Threads Web Intents)
 * - Pinterest: https://www.pinterest.com/pin/create/button/?url=&description= (developers.pinterest.com Save button)
 * - Bluesky:   https://bsky.app/intent/compose?text= (docs.bsky.app Action Intent Links; 300-char post limit)
 * - X:         https://x.com/intent/post?text=&url= (X for Websites Web Intent; twitter.com/intent/tweet redirects here)
 * - WhatsApp:  https://wa.me/?text= (faq.whatsapp.com Click to Chat)
 * - Instagram, TikTok, YouTube: no public browser prefill mechanism → copy-and-open.
 */

export type ShareContent = {
  organizationName: string;
  /** Already validated as an http/https URL by the caller. */
  profileUrl: string;
  message?: string;
};

export type SharePlatformId =
  | "copy-link"
  | "linkedin"
  | "facebook"
  | "instagram"
  | "threads"
  | "pinterest"
  | "tiktok"
  | "bluesky"
  | "x"
  | "youtube"
  | "whatsapp"
  | "email";

export type SharePlan =
  | { kind: "copy"; text: string; successMessage: string }
  | { kind: "open"; url: string; target: "tab" | "self"; successMessage: string }
  | { kind: "copyThenOpen"; text: string; url: string; successMessage: string };

export type SharePlatform = {
  id: SharePlatformId;
  label: string;
  strategy: "copy" | "direct" | "copy-open";
  buildPlan: (content: ShareContent) => SharePlan;
};

/** Keeps extended copy within X/Bluesky-friendly lengths. */
const MAX_EXTENDED_TEXT = 280;

function withOptionalMessage(base: string, message: string | undefined): string {
  const trimmed = message?.trim();
  if (!trimmed) {
    return base;
  }
  const extended = `${base} — ${trimmed}`;
  return extended.length <= MAX_EXTENDED_TEXT ? extended : base;
}

/** Full prepared message including the profile URL. */
export function buildShareText(content: ShareContent): string {
  return withOptionalMessage(
    buildShareMessage(content.organizationName, content.profileUrl),
    content.message,
  );
}

/** Prepared caption without the URL, for platforms that take the URL as a separate parameter. */
export function buildShareCaption(content: ShareContent): string {
  return withOptionalMessage(
    `Discover ${content.organizationName} on Spreadbliss`,
    content.message,
  );
}

export function buildMailtoUrl(content: ShareContent): string {
  const subject = encodeURIComponent(buildEmailSubject(content.organizationName));
  const body = encodeURIComponent(buildEmailBody(content.organizationName, content.profileUrl));
  return `mailto:?subject=${subject}&body=${body}`;
}

const SAFE_NAVIGATION_PROTOCOLS = new Set(["http:", "https:", "mailto:"]);

/** Guards navigation targets so an unexpected scheme can never be opened. */
export function isSafeShareUrl(url: string): boolean {
  try {
    return SAFE_NAVIGATION_PROTOCOLS.has(new URL(url).protocol);
  } catch {
    return false;
  }
}

function encoded(value: string): string {
  return encodeURIComponent(value);
}

function copyOpenPlan(content: ShareContent, platformName: string, url: string): SharePlan {
  return {
    kind: "copyThenOpen",
    text: buildShareText(content),
    url,
    successMessage: `Message copied — paste it into your ${platformName} post.`,
  };
}

export const SHARE_PLATFORMS: readonly SharePlatform[] = [
  {
    id: "copy-link",
    label: "Copy Link",
    strategy: "copy",
    buildPlan: (content) => ({
      kind: "copy",
      text: content.profileUrl,
      successMessage: "Copied — your profile link is on the clipboard.",
    }),
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    strategy: "direct",
    buildPlan: (content) => ({
      kind: "open",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded(content.profileUrl)}`,
      target: "tab",
      successMessage: "Opening the LinkedIn share dialog…",
    }),
  },
  {
    id: "facebook",
    label: "Facebook",
    strategy: "direct",
    buildPlan: (content) => ({
      kind: "open",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encoded(content.profileUrl)}`,
      target: "tab",
      successMessage: "Opening the Facebook share dialog…",
    }),
  },
  {
    id: "instagram",
    label: "Instagram",
    strategy: "copy-open",
    buildPlan: (content) => copyOpenPlan(content, "Instagram", "https://www.instagram.com/"),
  },
  {
    id: "threads",
    label: "Threads",
    strategy: "direct",
    buildPlan: (content) => ({
      kind: "open",
      url: `https://www.threads.com/intent/post?text=${encoded(buildShareCaption(content))}&url=${encoded(content.profileUrl)}`,
      target: "tab",
      successMessage: "Opening the Threads composer…",
    }),
  },
  {
    id: "pinterest",
    label: "Pinterest",
    strategy: "direct",
    buildPlan: (content) => ({
      kind: "open",
      url: `https://www.pinterest.com/pin/create/button/?url=${encoded(content.profileUrl)}&description=${encoded(buildShareCaption(content))}`,
      target: "tab",
      successMessage: "Opening the Pinterest pin builder…",
    }),
  },
  {
    id: "tiktok",
    label: "TikTok",
    strategy: "copy-open",
    buildPlan: (content) => copyOpenPlan(content, "TikTok", "https://www.tiktok.com/"),
  },
  {
    id: "bluesky",
    label: "Bluesky",
    strategy: "direct",
    buildPlan: (content) => ({
      kind: "open",
      url: `https://bsky.app/intent/compose?text=${encoded(buildShareText(content))}`,
      target: "tab",
      successMessage: "Opening the Bluesky composer…",
    }),
  },
  {
    id: "x",
    label: "X",
    strategy: "direct",
    buildPlan: (content) => ({
      kind: "open",
      url: `https://x.com/intent/post?text=${encoded(buildShareCaption(content))}&url=${encoded(content.profileUrl)}`,
      target: "tab",
      successMessage: "Opening the X composer…",
    }),
  },
  {
    id: "youtube",
    label: "YouTube",
    strategy: "copy-open",
    buildPlan: (content) => ({
      kind: "copyThenOpen",
      text: buildShareText(content),
      url: "https://www.youtube.com/",
      successMessage: "Message copied — paste it into a YouTube post or video description.",
    }),
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    strategy: "direct",
    buildPlan: (content) => ({
      kind: "open",
      url: `https://wa.me/?text=${encoded(buildShareText(content))}`,
      target: "tab",
      successMessage: "Opening WhatsApp with your message…",
    }),
  },
  {
    id: "email",
    label: "Email",
    strategy: "direct",
    buildPlan: (content) => ({
      kind: "open",
      url: buildMailtoUrl(content),
      target: "self",
      successMessage: "Opening your email app with a prepared message…",
    }),
  },
];
