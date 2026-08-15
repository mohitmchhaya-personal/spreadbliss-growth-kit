"use client";

import { useState } from "react";
import { Icon, type IconComponent } from "@/components/icons";
import { ShareButton } from "@/components/ShareButton";
import {
  isSafeShareUrl,
  SHARE_PLATFORMS,
  type ShareContent,
  type SharePlatform,
  type SharePlatformId,
} from "@/lib/share";

const PLATFORM_ICONS: Record<SharePlatformId, IconComponent> = {
  "copy-link": Icon.Link,
  linkedin: Icon.LinkedIn,
  facebook: Icon.Facebook,
  instagram: Icon.Instagram,
  threads: Icon.Threads,
  pinterest: Icon.Pinterest,
  tiktok: Icon.TikTok,
  bluesky: Icon.Bluesky,
  x: Icon.X,
  youtube: Icon.YouTube,
  whatsapp: Icon.WhatsApp,
  email: Icon.Email,
};

type Feedback = {
  tone: "success" | "error";
  message: string;
  fallbackText?: string;
  fallbackUrl?: string;
  fallbackLabel?: string;
};

async function copyToClipboard(text: string): Promise<void> {
  if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
    throw new Error("Clipboard API unavailable");
  }
  await navigator.clipboard.writeText(text);
}

function openInNewTab(url: string): boolean {
  const opened = window.open(url, "_blank", "noopener,noreferrer");
  return opened !== null;
}

type SharePanelProps = {
  content: ShareContent | null;
};

export function SharePanel({ content }: SharePanelProps) {
  const ready = content !== null;
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const contentKey = content
    ? JSON.stringify([content.organizationName, content.profileUrl, content.message ?? ""])
    : "";
  const [prevContentKey, setPrevContentKey] = useState(contentKey);
  if (contentKey !== prevContentKey) {
    setPrevContentKey(contentKey);
    setFeedback(null);
  }

  async function handleShare(platform: SharePlatform) {
    if (!content) {
      return;
    }
    const plan = platform.buildPlan(content);

    if (plan.kind === "copy") {
      try {
        await copyToClipboard(plan.text);
        setFeedback({ tone: "success", message: plan.successMessage });
      } catch {
        setFeedback({
          tone: "error",
          message: "Couldn't copy automatically — select the text below and copy it yourself.",
          fallbackText: plan.text,
        });
      }
      return;
    }

    if (plan.kind === "open") {
      if (!isSafeShareUrl(plan.url)) {
        setFeedback({ tone: "error", message: "This share link looks invalid, so it wasn't opened." });
        return;
      }
      if (plan.target === "self") {
        setFeedback({ tone: "success", message: plan.successMessage });
        window.location.assign(plan.url);
        return;
      }
      if (openInNewTab(plan.url)) {
        setFeedback({ tone: "success", message: plan.successMessage });
      } else {
        setFeedback({
          tone: "error",
          message: `Your browser blocked the new tab. Use this link to continue on ${platform.label}:`,
          fallbackUrl: plan.url,
          fallbackLabel: `Open ${platform.label}`,
        });
      }
      return;
    }

    // copyThenOpen
    if (!isSafeShareUrl(plan.url)) {
      setFeedback({ tone: "error", message: "This share link looks invalid, so it wasn't opened." });
      return;
    }
    try {
      await copyToClipboard(plan.text);
    } catch {
      setFeedback({
        tone: "error",
        message: `Couldn't copy automatically — select the text below, copy it, then open ${platform.label}.`,
        fallbackText: plan.text,
        fallbackUrl: plan.url,
        fallbackLabel: `Open ${platform.label}`,
      });
      return;
    }
    if (openInNewTab(plan.url)) {
      setFeedback({ tone: "success", message: plan.successMessage });
    } else {
      setFeedback({
        tone: "error",
        message: `Your message was copied, but the browser blocked the new tab. Use this link to continue on ${platform.label}:`,
        fallbackUrl: plan.url,
        fallbackLabel: `Open ${platform.label}`,
      });
    }
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {SHARE_PLATFORMS.map((platform) => (
          <ShareButton
            key={platform.id}
            label={platform.label}
            icon={PLATFORM_ICONS[platform.id]}
            disabled={!ready}
            onClick={() => void handleShare(platform)}
          />
        ))}
      </div>

      <div aria-live="polite" role="status">
        {feedback ? (
          <div
            className={`mt-5 rounded-xl border px-4 py-3.5 text-[13.5px] leading-relaxed ${
              feedback.tone === "success"
                ? "border-brand/25 bg-brand-soft/60 text-brand-strong"
                : "border-gold/40 bg-gold-soft/50 text-ink"
            }`}
          >
            <p className="flex items-start gap-2 font-semibold">
              {feedback.tone === "success" ? (
                <Icon.Check className="mt-0.5 h-4 w-4 shrink-0" />
              ) : (
                <Icon.Sparkle className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              )}
              <span>{feedback.message}</span>
            </p>
            {feedback.fallbackText ? (
              <textarea
                readOnly
                value={feedback.fallbackText}
                onFocus={(event) => event.currentTarget.select()}
                aria-label="Prepared share text — select and copy manually"
                rows={3}
                className="mt-3 w-full resize-none rounded-lg border border-line bg-white px-3 py-2.5 font-mono text-[12.5px] text-ink focus-visible:outline-2 focus-visible:outline-brand"
              />
            ) : null}
            {feedback.fallbackUrl ? (
              <a
                href={feedback.fallbackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-lg border border-line bg-white px-3.5 py-2 text-[13px] font-semibold text-brand-strong transition hover:border-brand/40"
              >
                <Icon.Link className="h-4 w-4" />
                {feedback.fallbackLabel ?? "Open link"}
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
