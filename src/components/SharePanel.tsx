"use client";

import { useState } from "react";
import { Icon, type IconComponent } from "@/components/icons";
import { FeedbackBanner, type Feedback } from "@/components/FeedbackBanner";
import { ShareButton } from "@/components/ShareButton";
import { copyToClipboard } from "@/lib/clipboard";
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

function openInNewTab(url: string): boolean {
  // Passing a "noopener" feature string makes window.open return null even on
  // success, so open first and sever the opener reference afterwards.
  const opened = window.open(url, "_blank");
  if (!opened) {
    return false;
  }
  opened.opener = null;
  return true;
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

      <FeedbackBanner feedback={feedback} />
    </div>
  );
}
