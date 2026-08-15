"use client";

import { useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { ActionButton } from "@/components/ActionButton";
import { FeedbackBanner, type Feedback } from "@/components/FeedbackBanner";
import { Icon } from "@/components/icons";
import { IMPACT_CARD_SIZE, ImpactCardPreview } from "@/components/ImpactCardPreview";
import { downloadDataUrl } from "@/lib/download";
import { slugify } from "@/lib/slug";

type ImpactCardSectionProps = {
  ready: boolean;
  organizationName: string;
  profileUrl: string | null;
  qrDataUrl: string | null;
  logoDataUrl?: string;
  impact?: string;
  message?: string;
};

/** Waits for every image inside the export node to finish decoding. */
async function waitForImages(node: HTMLElement): Promise<void> {
  await Promise.all(
    Array.from(node.querySelectorAll("img")).map((img) =>
      img.complete && img.naturalWidth > 0 ? Promise.resolve() : img.decode().catch(() => undefined),
    ),
  );
}

export function ImpactCardSection({
  ready,
  organizationName,
  profileUrl,
  qrDataUrl,
  logoDataUrl,
  impact,
  message,
}: ImpactCardSectionProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [exporting, setExporting] = useState(false);
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const cardReady = ready && profileUrl !== null && qrDataUrl !== null;

  const [prevUrl, setPrevUrl] = useState(profileUrl);
  if (profileUrl !== prevUrl) {
    setPrevUrl(profileUrl);
    setFeedback(null);
  }

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) {
      return;
    }
    const update = () => setScale(frame.clientWidth / IMPACT_CARD_SIZE);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(frame);
    return () => observer.disconnect();
  }, [cardReady]);

  async function handleDownload(): Promise<boolean> {
    const node = cardRef.current;
    if (!node || !cardReady || exporting) {
      return false;
    }
    setExporting(true);
    setFeedback(null);
    const filename = `spreadbliss-${slugify(organizationName)}-impact-card.png`;
    try {
      await waitForImages(node);
      const dataUrl = await toPng(node, {
        width: IMPACT_CARD_SIZE,
        height: IMPACT_CARD_SIZE,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
        style: { transform: "none" },
      });
      downloadDataUrl(dataUrl, filename);
      setFeedback({
        tone: "success",
        message: `Downloading ${filename} — a 1080 × 1080 PNG ready to post.`,
      });
      return true;
    } catch {
      setFeedback({
        tone: "error",
        message: "Couldn't create the PNG. Your preview is unchanged — please try again.",
      });
      return false;
    } finally {
      setExporting(false);
    }
  }

  const items: { label: string; value: string; present: boolean }[] = [
    { label: "Organization name", value: ready ? organizationName : "Required", present: ready },
    {
      label: "Organization logo (optional)",
      value: logoDataUrl ? "Uploaded ✓" : "Not added yet",
      present: Boolean(logoDataUrl),
    },
    {
      label: "Impact statistic (optional)",
      value: impact ?? "Not added yet",
      present: Boolean(impact),
    },
    {
      label: "Short message (optional)",
      value: message ?? "Not added yet",
      present: Boolean(message),
    },
    {
      label: "Your profile QR code",
      value: cardReady ? "Ready ✓" : ready ? "Generating…" : "Requires your profile URL",
      present: cardReady,
    },
    { label: "Spreadbliss branding", value: "Included ✓", present: true },
  ];

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,380px)_1fr] lg:items-center">
      <div className="mx-auto w-full max-w-[380px]">
        {cardReady ? (
          <>
            <div
              ref={frameRef}
              className="relative aspect-square w-full overflow-hidden rounded-3xl border border-line shadow-[0_24px_60px_-30px_rgba(17,17,17,0.45)]"
            >
              <div
                ref={cardRef}
                className="absolute left-0 top-0 origin-top-left"
                style={{ transform: `scale(${scale})` }}
              >
                <ImpactCardPreview
                  organizationName={organizationName}
                  profileUrl={profileUrl}
                  qrDataUrl={qrDataUrl}
                  logoDataUrl={logoDataUrl}
                  impact={impact}
                  message={message}
                />
              </div>
            </div>
            <p className="mt-3 text-center text-[12px] text-muted">Exports as 1080 × 1080 PNG</p>
          </>
        ) : (
          <div className="relative grid aspect-square place-items-center overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-brand-soft/70 to-gold-soft/60">
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(circle at center, rgba(37,99,235,0.22) 1px, transparent 1.4px)",
                backgroundSize: "20px 20px",
              }}
            />
            <div className="relative flex flex-col items-center gap-3 px-8 text-center">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/70 text-brand">
                <Icon.Sparkle className="h-6 w-6" />
              </span>
              <p className="max-w-[220px] text-[14px] font-semibold leading-relaxed text-brand-strong">
                Add your organization information to create a shareable Impact Card.
              </p>
            </div>
          </div>
        )}
      </div>

      <div>
        <h3 className="font-display text-[16px] font-bold text-ink">
          {ready ? "This Impact Card includes" : "Your Impact Card will include"}
        </h3>
        <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {items.map(({ label, value, present }) => (
            <li key={label} className="flex items-start gap-2.5 text-[13.5px] text-ink">
              <span
                className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                  present ? "bg-brand-soft text-brand-strong" : "bg-canvas text-muted"
                }`}
              >
                <Icon.Check className="h-3 w-3" />
              </span>
              <span className="min-w-0">
                <span className="font-semibold">{label}</span>
                <span className="block break-words text-[12.5px] text-muted">{value}</span>
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-6 rounded-xl border-l-4 border-gold bg-gold-soft/40 px-4 py-3.5 text-[13.5px] font-semibold text-ink">
          {ready
            ? "Designed to celebrate your mission — not to advertise Spreadbliss."
            : "CTA on the card: “Discover our work on Spreadbliss”"}
        </div>
        <div className="mt-6">
          <ActionButton
            icon={Icon.Download}
            successLabel="Downloaded"
            disabled={!cardReady}
            busy={exporting}
            busyLabel="Preparing PNG…"
            onAction={handleDownload}
            className="w-full sm:w-auto"
          >
            Download Impact Card
          </ActionButton>
        </div>
        <p role="status" className="sr-only">
          {exporting ? "Preparing your Impact Card PNG…" : ""}
        </p>
        <FeedbackBanner feedback={feedback} />
      </div>
    </div>
  );
}
