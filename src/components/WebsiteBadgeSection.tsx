"use client";

import { useState } from "react";
import { ActionButton } from "@/components/ActionButton";
import { FeedbackBanner, type Feedback } from "@/components/FeedbackBanner";
import { Icon } from "@/components/icons";
import { copyToClipboard } from "@/lib/clipboard";

type WebsiteBadgeSectionProps = {
  profileUrl: string | null;
  badgeHtml: string | null;
};

export function WebsiteBadgeSection({ profileUrl, badgeHtml }: WebsiteBadgeSectionProps) {
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const [prevBadgeHtml, setPrevBadgeHtml] = useState(badgeHtml);
  if (badgeHtml !== prevBadgeHtml) {
    setPrevBadgeHtml(badgeHtml);
    setFeedback(null);
  }

  async function handleCopyCode(): Promise<boolean> {
    if (!badgeHtml) {
      return false;
    }
    try {
      await copyToClipboard(badgeHtml);
      setFeedback({ tone: "success", message: "Copied — paste the badge code into your website's HTML." });
      return true;
    } catch {
      setFeedback({
        tone: "error",
        message: "Couldn't copy automatically — select the code below and copy it yourself.",
        fallbackText: badgeHtml,
      });
      return false;
    }
  }

  return (
    <div>
      <div className="grid place-items-center rounded-2xl border border-line bg-canvas/50 px-6 py-8">
        {profileUrl ? (
          <>
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full bg-brand px-5 py-3 font-display text-[14px] font-bold text-white shadow-sm transition hover:bg-brand-strong"
            >
              <Icon.Sparkle className="h-4 w-4 text-gold" />
              Find us on Spreadbliss
            </a>
            <p className="mt-4 text-[12.5px] text-muted">Live preview</p>
          </>
        ) : (
          <>
            <div className="inline-flex items-center gap-3 rounded-full border border-line bg-white px-5 py-3 opacity-60 shadow-sm">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-brand text-white">
                <Icon.Sparkle className="h-4 w-4" />
              </span>
              <span className="font-display text-[14px] font-bold text-ink">
                Find us on Spreadbliss
              </span>
            </div>
            <p className="mt-4 text-[12.5px] text-muted">Example preview</p>
          </>
        )}
      </div>
      <div className="mt-5 overflow-hidden rounded-xl border border-line bg-[#111111]">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="ml-2 text-[11px] font-semibold text-white/40">badge.html</span>
        </div>
        <pre className="overflow-x-auto px-4 py-4 font-mono text-[12.5px] leading-relaxed text-white/80">
          {badgeHtml ?? (
            <>
              <span className="text-white/40">&lt;!-- Your embed code appears here --&gt;</span>
              {"\n"}
              <span className="text-white/55">
                &lt;a href=&quot;…&quot;&gt;Find us on Spreadbliss&lt;/a&gt;
              </span>
            </>
          )}
        </pre>
      </div>
      <div className="mt-5">
        <ActionButton
          icon={Icon.Link}
          successLabel="Code copied"
          disabled={!badgeHtml}
          onAction={handleCopyCode}
          className="w-full sm:w-auto"
        >
          Copy Website Code
        </ActionButton>
      </div>
      <FeedbackBanner feedback={feedback} />
    </div>
  );
}
