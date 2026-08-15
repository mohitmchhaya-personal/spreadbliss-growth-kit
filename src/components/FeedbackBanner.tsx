import { Icon } from "@/components/icons";

export type Feedback = {
  tone: "success" | "error";
  message: string;
  fallbackText?: string;
  fallbackUrl?: string;
  fallbackLabel?: string;
};

type FeedbackBannerProps = {
  feedback: Feedback | null;
};

/** Accessible live-region banner for clipboard/download success and error feedback. */
export function FeedbackBanner({ feedback }: FeedbackBannerProps) {
  return (
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
              aria-label="Prepared text — select and copy manually"
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
  );
}
