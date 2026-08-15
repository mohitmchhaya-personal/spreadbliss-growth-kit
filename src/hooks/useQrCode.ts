"use client";

import { useCallback, useEffect, useState } from "react";
import QRCode from "qrcode";

type QrInternalState =
  | { status: "idle" }
  | { status: "ready"; url: string; dataUrl: string }
  | { status: "error"; url: string };

export type QrCodeState = {
  /** QR code matching the current profile URL, or null while absent/generating. */
  current: { url: string; dataUrl: string } | null;
  /** True when generation failed for the current profile URL. */
  failed: boolean;
  retry: () => void;
};

/** Generates a QR PNG data URL for the profile URL, shared by every section that needs it. */
export function useQrCode(profileUrl: string | null): QrCodeState {
  const [qr, setQr] = useState<QrInternalState>({ status: "idle" });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!profileUrl) {
      return;
    }
    let cancelled = false;
    QRCode.toDataURL(profileUrl, { width: 480, margin: 2, errorCorrectionLevel: "M" })
      .then((dataUrl) => {
        if (!cancelled) {
          setQr({ status: "ready", url: profileUrl, dataUrl });
        }
      })
      .catch(() => {
        if (!cancelled) {
          setQr({ status: "error", url: profileUrl });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [profileUrl, attempt]);

  const current =
    profileUrl !== null && qr.status === "ready" && qr.url === profileUrl
      ? { url: qr.url, dataUrl: qr.dataUrl }
      : null;
  const failed = profileUrl !== null && qr.status === "error" && qr.url === profileUrl;
  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  return { current, failed, retry };
}
