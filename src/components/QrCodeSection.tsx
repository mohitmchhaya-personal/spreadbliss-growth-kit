"use client";

import { useState } from "react";
import { ActionButton } from "@/components/ActionButton";
import { FeedbackBanner, type Feedback } from "@/components/FeedbackBanner";
import { Icon } from "@/components/icons";
import { copyToClipboard } from "@/lib/clipboard";
import { downloadDataUrl } from "@/lib/download";
import { slugify } from "@/lib/slug";
import type { QrCodeState } from "@/hooks/useQrCode";

type QrCodeSectionProps = {
  organizationName: string;
  profileUrl: string | null;
  qr: QrCodeState;
};

export function QrCodeSection({ organizationName, profileUrl, qr }: QrCodeSectionProps) {
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const [prevUrl, setPrevUrl] = useState(profileUrl);
  if (profileUrl !== prevUrl) {
    setPrevUrl(profileUrl);
    setFeedback(null);
  }

  const currentQr = qr.current;
  const qrFailed = qr.failed;

  function handleDownload(): boolean {
    if (!currentQr) {
      return false;
    }
    const filename = `spreadbliss-${slugify(organizationName)}-qr.png`;
    try {
      downloadDataUrl(currentQr.dataUrl, filename);
      setFeedback({ tone: "success", message: `Downloading ${filename} — check your downloads folder.` });
      return true;
    } catch {
      setFeedback({
        tone: "error",
        message: "Couldn't start the download. Right-click the QR code and choose “Save image as…” instead.",
      });
      return false;
    }
  }

  async function handleCopyLink(): Promise<boolean> {
    if (!profileUrl) {
      return false;
    }
    try {
      await copyToClipboard(profileUrl);
      setFeedback({ tone: "success", message: "Copied — your profile link is on the clipboard." });
      return true;
    } catch {
      setFeedback({
        tone: "error",
        message: "Couldn't copy automatically — select the link below and copy it yourself.",
        fallbackText: profileUrl,
      });
      return false;
    }
  }

  return (
    <div>
      <div className="grid place-items-center rounded-2xl border border-line bg-canvas/50 px-6 py-8">
        {currentQr ? (
          <>
            <div className="rounded-2xl border border-line bg-white p-4 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element -- data URL, no optimization needed */}
              <img
                src={currentQr.dataUrl}
                alt={`QR code linking to ${currentQr.url}`}
                width={168}
                height={168}
                style={{ width: 168, height: 168 }}
              />
            </div>
            <p className="mt-4 max-w-xs text-center text-[13px] leading-relaxed text-muted">
              Add to flyers, brochures, event materials, presentations, posters and business cards.
            </p>
          </>
        ) : qrFailed ? (
          <div role="alert" className="text-center">
            <p className="text-[13.5px] font-semibold text-ink">
              We couldn&apos;t generate your QR code.
            </p>
            <button
              type="button"
              onClick={qr.retry}
              className="mt-3 inline-flex items-center gap-2 rounded-lg border border-line bg-white px-3.5 py-2 text-[13px] font-semibold text-brand-strong transition hover:border-brand/40"
            >
              Try again
            </button>
          </div>
        ) : (
          <>
            <div className="grid h-40 w-40 place-items-center rounded-2xl border-2 border-dashed border-line bg-white">
              <div
                className="h-24 w-24 rounded-lg opacity-30"
                style={{
                  backgroundImage:
                    "linear-gradient(#cbd2dc 25%, transparent 25%), linear-gradient(90deg, #cbd2dc 25%, transparent 25%)",
                  backgroundSize: "12px 12px",
                }}
              />
            </div>
            <p className="mt-5 max-w-xs text-center text-[13.5px] leading-relaxed text-muted">
              Your QR code will appear here once you enter your organization name and Spreadbliss
              profile URL.
            </p>
          </>
        )}
      </div>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <ActionButton
          icon={Icon.Download}
          successLabel="Downloaded"
          disabled={!currentQr}
          onAction={handleDownload}
          className="w-full sm:w-auto"
        >
          Download QR Code
        </ActionButton>
        <ActionButton
          icon={Icon.Link}
          variant="outline"
          successLabel="Copied"
          disabled={!currentQr}
          onAction={handleCopyLink}
          className="w-full sm:w-auto"
        >
          Copy Profile Link
        </ActionButton>
      </div>
      <FeedbackBanner feedback={feedback} />
    </div>
  );
}
