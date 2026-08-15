/* eslint-disable @next/next/no-img-element -- self-contained export node: data URLs + local asset */
import type { Ref } from "react";

/** CSS pixel size of the export node; captured at pixelRatio 2 for a 1080 × 1080 PNG. */
export const IMPACT_CARD_SIZE = 540;

const GOLD = "#b08d57";
const INK = "#111111";

const displayFont = "var(--font-dm-sans), ui-sans-serif, system-ui, sans-serif";
const bodyFont = "var(--font-inter), ui-sans-serif, system-ui, sans-serif";

type ImpactStat = { value: string | null; label: string };

/** Split "500,000 meals delivered" into { value: "500,000", label: "meals delivered" }. */
function parseImpact(impact: string): ImpactStat {
  const match = impact.trim().match(/^([\d.,]+\+?\s*[KkMmBb%]?)\s+(.+)$/);
  if (match) {
    return { value: match[1].trim(), label: match[2].trim() };
  }
  return { value: null, label: impact.trim() };
}

/** Deterministic type scale so long content still fits the fixed-size card. */
function fitFontSize(text: string, base: number, steps: [number, number][]): number {
  for (const [maxLength, size] of steps) {
    if (text.length <= maxLength) {
      return size;
    }
  }
  return base;
}

export type ImpactCardPreviewProps = {
  organizationName: string;
  profileUrl: string;
  qrDataUrl: string;
  logoDataUrl?: string;
  impact?: string;
  message?: string;
  ref?: Ref<HTMLDivElement>;
};

/**
 * The exact 1080 × 1080 Impact Card asset, rendered at a fixed 540 × 540 CSS-pixel
 * size (the parent scales it responsively; export captures it at pixel ratio 2).
 * Always shows the organization name, QR code, CTA, and Spreadbliss branding;
 * logo, impact, and message collapse cleanly when absent.
 */
export function ImpactCardPreview({
  organizationName,
  profileUrl,
  qrDataUrl,
  logoDataUrl,
  impact,
  message,
  ref,
}: ImpactCardPreviewProps) {
  const host = profileUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const stat = impact ? parseImpact(impact) : null;

  const nameSize = fitFontSize(organizationName, 15, [
    [28, 23],
    [56, 19],
  ]);
  const statValueSize = stat?.value
    ? fitFontSize(stat.value, 40, [
        [8, 100],
        [14, 68],
      ])
    : 0;
  const statLabelSize = stat ? fitFontSize(stat.label, 14, [[36, stat.value ? 23 : 42]]) : 0;
  const messageSize = message ? fitFontSize(message, 14, [[90, 22]]) : 0;

  return (
    <div
      ref={ref}
      style={{
        width: IMPACT_CARD_SIZE,
        height: IMPACT_CARD_SIZE,
        boxSizing: "border-box",
        background: "#ffffff",
        color: INK,
        fontFamily: bodyFont,
        display: "flex",
        flexDirection: "column",
        padding: "48px 50px",
        position: "relative",
        overflow: "hidden",
        textAlign: "left",
      }}
    >
      {/* full-width gold accent across the very top */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 6, background: GOLD }} />

      {/* Header: organization identity */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        {logoDataUrl ? (
          <img
            src={logoDataUrl}
            alt={`${organizationName} logo`}
            style={{
              width: 52,
              height: 52,
              flexShrink: 0,
              borderRadius: 12,
              objectFit: "contain",
            }}
          />
        ) : null}
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontFamily: displayFont,
              fontWeight: 700,
              fontSize: nameSize,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              overflowWrap: "anywhere",
            }}
          >
            {organizationName}
          </div>
          <div
            style={{
              marginTop: 5,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.02em",
              color: "#6b7280",
            }}
          >
            Nonprofit &amp; social impact
          </div>
        </div>
      </div>

      {/* Hero: impact statistic + tagline (collapses when absent) */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 14,
          minHeight: 0,
        }}
      >
        {stat ? (
          <div>
            {stat.value ? (
              <>
                <div
                  style={{
                    fontFamily: displayFont,
                    fontWeight: 800,
                    fontSize: statValueSize,
                    lineHeight: 0.9,
                    letterSpacing: "-0.04em",
                    overflowWrap: "anywhere",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    marginTop: 12,
                    fontFamily: displayFont,
                    fontWeight: 700,
                    fontSize: statLabelSize,
                    lineHeight: 1.05,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: GOLD,
                    overflowWrap: "anywhere",
                  }}
                >
                  {stat.label}
                </div>
              </>
            ) : (
              <div
                style={{
                  fontFamily: displayFont,
                  fontWeight: 800,
                  fontSize: statLabelSize,
                  lineHeight: 0.98,
                  letterSpacing: "-0.03em",
                  textTransform: "uppercase",
                  overflowWrap: "anywhere",
                }}
              >
                {stat.label}
              </div>
            )}
          </div>
        ) : null}
        {message ? (
          <div
            style={{
              fontFamily: displayFont,
              fontWeight: 500,
              fontSize: messageSize,
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              maxWidth: 360,
              color: "#1f2937",
              overflowWrap: "anywhere",
            }}
          >
            {message}
          </div>
        ) : null}
      </div>

      {/* Footer: CTA + Spreadbliss branding + QR */}
      <div style={{ borderTop: "1px solid #ececec", paddingTop: 20 }}>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          <div style={{ minWidth: 0 }}>
            <div
              style={{
                fontFamily: displayFont,
                fontWeight: 700,
                fontSize: 20,
                lineHeight: 1.15,
                letterSpacing: "-0.01em",
                maxWidth: 280,
              }}
            >
              Discover our work on Spreadbliss
            </div>
            {/* subtle Spreadbliss branding blended onto the white ground */}
            <div style={{ marginTop: 13, display: "flex", alignItems: "center", gap: 9 }}>
              <img
                src="/spreadbliss-logo.png"
                alt="Spreadbliss"
                style={{
                  height: 48,
                  width: "auto",
                  objectFit: "contain",
                  mixBlendMode: "multiply",
                  marginLeft: -4,
                }}
              />
              <span style={{ fontSize: 11, color: "#9ca3af" }} aria-hidden="true">
                ·
              </span>
              <span
                style={{
                  fontSize: 11,
                  color: "#6b7280",
                  fontWeight: 500,
                  minWidth: 0,
                  overflowWrap: "anywhere",
                }}
              >
                {host}
              </span>
            </div>
          </div>

          {/* QR — always present, scannable to the profile */}
          <div style={{ flexShrink: 0, textAlign: "center" }}>
            <div
              style={{
                border: "1px solid #ececec",
                borderRadius: 10,
                padding: 7,
                background: "#ffffff",
              }}
            >
              <img
                src={qrDataUrl}
                alt={`QR code linking to ${profileUrl}`}
                width={94}
                height={94}
                style={{ display: "block", width: 94, height: 94 }}
              />
            </div>
            <div
              style={{
                marginTop: 6,
                fontSize: 9,
                fontWeight: 600,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: "#9ca3af",
              }}
            >
              Scan to visit
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
