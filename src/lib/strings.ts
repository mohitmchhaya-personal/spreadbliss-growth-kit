import type { GeneratedContent, OrganizationInput } from "@/types/growth-kit";

function escapeHtmlAttribute(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function buildShareMessage(name: string, profileUrl: string): string {
  return `Discover ${name} on Spreadbliss: ${profileUrl}`;
}

export function buildEmailSubject(name: string): string {
  return `Discover ${name} on Spreadbliss`;
}

export function buildEmailBody(name: string, profileUrl: string): string {
  return `Learn more about ${name} and our work on Spreadbliss:\n${profileUrl}`;
}

export function buildWebsiteBadgeHtml(profileUrl: string): string {
  return `<a href="${escapeHtmlAttribute(profileUrl)}"
   style="display:inline-flex;align-items:center;gap:8px;
          padding:10px 18px;border-radius:999px;
          background:#2563EB;color:#fff;font-weight:600;
          font-family:sans-serif;text-decoration:none">
  Find us on Spreadbliss
</a>`;
}

export function deriveGeneratedContent(org: OrganizationInput): GeneratedContent {
  const name = org.name.trim();
  const profileUrl = org.profileUrl.trim();
  return {
    shareMessage: buildShareMessage(name, profileUrl),
    emailSubject: buildEmailSubject(name),
    emailBody: buildEmailBody(name, profileUrl),
    websiteBadgeHtml: buildWebsiteBadgeHtml(profileUrl),
  };
}
