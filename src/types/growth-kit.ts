export type OrganizationInput = {
  name: string;
  profileUrl: string;
  logoDataUrl?: string;
  message?: string;
  impact?: string;
};

export type GeneratedContent = {
  shareMessage: string;
  emailSubject: string;
  emailBody: string;
  websiteBadgeHtml: string;
};

export type UrlValidation =
  | { status: "empty" }
  | { status: "invalid"; error: string }
  | { status: "valid"; url: string; warning?: string };
