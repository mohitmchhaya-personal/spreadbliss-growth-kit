"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon } from "@/components/icons";
import { ImpactCardSection } from "@/components/ImpactCardSection";
import { OrganizationForm } from "@/components/OrganizationForm";
import { QrCodeSection } from "@/components/QrCodeSection";
import { SectionCard } from "@/components/SectionCard";
import { SharePanel } from "@/components/SharePanel";
import { WebsiteBadgeSection } from "@/components/WebsiteBadgeSection";
import { useQrCode } from "@/hooks/useQrCode";
import { deriveGeneratedContent } from "@/lib/strings";
import { buildShareText, type ShareContent } from "@/lib/share";
import { validateProfileUrl } from "@/lib/validators";
import type { OrganizationInput } from "@/types/growth-kit";

function Wordmark() {
  return (
    <Image
      src="/spreadbliss-logo.png"
      alt="SpreadBliss"
      width={1500}
      height={452}
      unoptimized
      className="h-16 w-auto shrink-0 select-none mix-blend-multiply"
    />
  );
}

export default function Home() {
  const [org, setOrg] = useState<OrganizationInput>({ name: "", profileUrl: "" });

  const trimmedName = org.name.trim();
  const urlValidation = validateProfileUrl(org.profileUrl);
  const ready = trimmedName.length > 0 && urlValidation.status === "valid";
  const profileUrl = urlValidation.status === "valid" ? urlValidation.url : null;
  const generated = ready ? deriveGeneratedContent(org) : null;

  const trimmedMessage = org.message?.trim() || undefined;
  const trimmedImpact = org.impact?.trim() || undefined;

  const shareContent: ShareContent | null =
    ready && profileUrl
      ? { organizationName: trimmedName, profileUrl, message: trimmedMessage }
      : null;

  const qr = useQrCode(ready ? profileUrl : null);

  return (
    <div className="min-h-screen bg-canvas">
      <header className="sticky top-0 z-20 border-b border-line/70 bg-canvas/80 backdrop-blur">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-4">
          <Wordmark />
          <span className="hidden items-center gap-2 rounded-full border border-line bg-white px-3.5 py-1.5 text-[12.5px] font-semibold text-muted sm:inline-flex">
            <Icon.Lock className="h-3.5 w-3.5 text-brand" />
            Your information stays in your browser.
          </span>
        </div>
      </header>

      <div className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(900px 340px at 82% -10%, #e7edfd 0%, transparent 60%), radial-gradient(680px 300px at 8% 0%, #f2ead9 0%, transparent 55%)",
          }}
        />
        <div className="relative mx-auto max-w-[1180px] px-6 pb-4 pt-14 text-center sm:pt-20">
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white px-4 py-1.5 text-[12.5px] font-semibold text-ink">
            <Icon.Sparkle className="h-3.5 w-3.5 text-gold" />
            For nonprofits &amp; social-impact teams
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl font-display text-[34px] font-bold leading-[1.1] tracking-tight text-ink sm:text-[54px]">
            Spreadbliss Growth Kit
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-muted">
            Everything you need to share your organization&apos;s Spreadbliss profile.
          </p>

          <div aria-live="polite">
            {ready ? (
              <div className="mx-auto mt-9 inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand-soft/60 px-4 py-2 text-[13px] font-semibold text-brand-strong">
                <Icon.Check className="h-4 w-4" />
                Everything below is ready for {trimmedName}
              </div>
            ) : (
              <div className="mx-auto mt-9 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  ["Enter once", "Add your details a single time."],
                  ["Everything ready", "Links, QR, badge & card prepared."],
                  ["Share anywhere", "Choose where you want to post."],
                ].map(([title, description], index) => (
                  <div key={title} className="rounded-2xl border border-line bg-card px-4 py-4 text-left">
                    <div className="flex items-center gap-2">
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-soft font-display text-[12px] font-bold text-brand-strong">
                        {index + 1}
                      </span>
                      <span className="font-display text-[14.5px] font-bold text-ink">{title}</span>
                    </div>
                    <p className="mt-2 text-[13px] leading-relaxed text-muted">{description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <main className="mx-auto flex max-w-[1180px] flex-col gap-7 px-6 pb-8 pt-8">
        <SectionCard
          step={1}
          title="Organization Information"
          helper={
            ready
              ? "Edit any field and every tool below updates instantly — no Generate button needed."
              : "Enter your information once and your sharing tools will be prepared automatically."
          }
          right={
            ready ? (
              <span className="hidden shrink-0 items-center gap-2 rounded-full border border-brand/25 bg-brand-soft/60 px-3 py-1.5 text-[12px] font-semibold text-brand-strong lg:inline-flex">
                <Icon.Bolt className="h-3.5 w-3.5" />
                Live — auto-updates below
              </span>
            ) : undefined
          }
        >
          <OrganizationForm value={org} onChange={setOrg} />
        </SectionCard>

        <SectionCard
          step={2}
          title="Share Your Profile"
          helper={
            ready
              ? "Choose where you want to share your Spreadbliss profile."
              : "Enter your organization name and Spreadbliss profile URL to activate your sharing options."
          }
        >
          <SharePanel content={shareContent} />

          {shareContent ? (
            <div className="mt-6 rounded-2xl border border-line bg-canvas/50 p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[12px] font-bold uppercase tracking-wide text-muted">
                  Prepared share message
                </p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-brand-strong shadow-sm">
                  <Icon.Sparkle className="h-3 w-3 text-gold" /> Auto-generated
                </span>
              </div>
              <p className="mt-3 break-words text-[15px] leading-relaxed text-ink">
                {buildShareText(shareContent)}
              </p>
            </div>
          ) : null}

          <p className="mt-5 flex items-center gap-2 text-[13px] text-muted">
            <Icon.Lock className="h-4 w-4 text-brand" />
            {ready
              ? "Some platforms don't support prefilled posts — for those, your message is copied so you can paste it after the platform opens."
              : "Sharing buttons unlock automatically — no social accounts or passwords needed."}
          </p>
        </SectionCard>

        <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
          <SectionCard step={3} title="QR Code" helper="Point phones straight to your Spreadbliss profile.">
            <QrCodeSection
              organizationName={trimmedName}
              profileUrl={ready ? profileUrl : null}
              qr={qr}
            />
          </SectionCard>

          <SectionCard
            step={4}
            title="Website Badge"
            helper={
              ready
                ? "Add this badge to your organization’s website to help visitors discover your work on Spreadbliss."
                : "Add a badge to your own website so visitors can find you on Spreadbliss."
            }
          >
            <WebsiteBadgeSection
              profileUrl={ready ? profileUrl : null}
              badgeHtml={generated?.websiteBadgeHtml ?? null}
            />
          </SectionCard>
        </div>

        <SectionCard
          step={5}
          title="Impact Card"
          helper={
            ready
              ? "A ready-to-post 1080 × 1080 square graphic that celebrates your organization."
              : "A ready-to-post square graphic that tells your story at a glance."
          }
        >
          <ImpactCardSection
            ready={ready}
            organizationName={trimmedName}
            profileUrl={ready ? profileUrl : null}
            qrDataUrl={qr.current?.dataUrl ?? null}
            logoDataUrl={org.logoDataUrl}
            impact={trimmedImpact}
            message={trimmedMessage}
          />
        </SectionCard>
      </main>

      <footer className="mx-auto max-w-[1180px] px-6 pb-16 pt-4">
        <div className="rounded-3xl border border-line bg-card p-7 sm:p-8">
          <div className="flex items-start gap-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-soft text-brand-strong">
              <Icon.Lock className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-display text-[16px] font-bold text-ink">Private by design</h3>
              <p className="mt-2 max-w-3xl text-[13.5px] leading-relaxed text-muted">
                Your organization information and uploaded logo stay in your browser — nothing is
                sent to a server. Spreadbliss Growth Kit never asks for social-media credentials
                and does not connect to or post directly to your social-media accounts.
              </p>
            </div>
          </div>
        </div>
        <p className="mt-8 text-center text-[13px] text-muted">
          <span className="font-display font-bold text-ink">Spreadbliss</span> Growth Kit — built for
          mission-driven teams.
        </p>
      </footer>
    </div>
  );
}
