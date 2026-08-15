"use client";

import Image from "next/image";
import { useState } from "react";
import { DisabledButton } from "@/components/DisabledButton";
import { Icon } from "@/components/icons";
import { OrganizationForm } from "@/components/OrganizationForm";
import { QrCodeSection } from "@/components/QrCodeSection";
import { SectionCard } from "@/components/SectionCard";
import { SharePanel } from "@/components/SharePanel";
import { WebsiteBadgeSection } from "@/components/WebsiteBadgeSection";
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

  const impactCardItems: { label: string; value: string; present: boolean }[] = [
    { label: "Organization name", value: ready ? trimmedName : "Required", present: ready },
    {
      label: "Organization logo (optional)",
      value: org.logoDataUrl ? "Uploaded ✓" : "Not added yet",
      present: Boolean(org.logoDataUrl),
    },
    {
      label: "Impact statistic (optional)",
      value: trimmedImpact ?? "Not added yet",
      present: Boolean(trimmedImpact),
    },
    {
      label: "Short message (optional)",
      value: trimmedMessage ?? "Not added yet",
      present: Boolean(trimmedMessage),
    },
    {
      label: "Your profile QR code",
      value: ready ? "Ready in an upcoming update" : "Requires your profile URL",
      present: ready,
    },
    { label: "Spreadbliss branding", value: "Included ✓", present: true },
  ];

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
                <Icon.Sparkle className="h-3.5 w-3.5" />
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
            />
          </SectionCard>

          <SectionCard
            step={4}
            title="Website Badge"
            helper="Add a badge to your own website so visitors can find you on Spreadbliss."
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
          helper="A ready-to-post square graphic that tells your story at a glance."
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,360px)_1fr] lg:items-center">
            <div className="mx-auto w-full max-w-[360px]">
              {ready ? (
                <div className="relative flex aspect-square flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-brand-strong text-white shadow-[0_24px_60px_-30px_rgba(37,99,235,0.7)]">
                  <div
                    className="pointer-events-none absolute inset-0 opacity-25"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at center, rgba(255,255,255,0.5) 1px, transparent 1.4px)",
                      backgroundSize: "22px 22px",
                    }}
                  />
                  <div className="relative flex flex-1 flex-col p-7">
                    <div className="flex items-center gap-3">
                      {org.logoDataUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={org.logoDataUrl}
                          alt={`${trimmedName} logo`}
                          className="h-11 w-11 shrink-0 rounded-xl bg-white/90 object-contain"
                        />
                      ) : (
                        <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/15 backdrop-blur">
                          <Icon.Sparkle className="h-6 w-6 text-white" />
                        </span>
                      )}
                      <span className="break-words font-display text-[17px] font-bold leading-tight">
                        {trimmedName}
                      </span>
                    </div>

                    <div className="mt-auto">
                      {trimmedImpact ? (
                        <p className="break-words font-display text-[28px] font-bold leading-tight tracking-tight">
                          {trimmedImpact}
                        </p>
                      ) : null}
                      {trimmedMessage ? (
                        <p className="mt-3 max-w-[16rem] break-words text-[15px] leading-snug text-white/85">
                          {trimmedMessage}
                        </p>
                      ) : null}
                    </div>

                    <div className="mt-6 flex items-end justify-between gap-3 border-t border-white/15 pt-4">
                      <div>
                        <p className="text-[12px] font-semibold text-white/70">Discover our work on</p>
                        <p className="font-display text-[16px] font-bold">Spreadbliss</p>
                      </div>
                      <div className="grid h-[58px] w-[58px] shrink-0 place-items-center rounded-lg bg-white p-1.5 shadow-sm">
                        <div
                          className="h-full w-full rounded-sm opacity-30"
                          style={{
                            backgroundImage:
                              "linear-gradient(#111111 25%, transparent 25%), linear-gradient(90deg, #111111 25%, transparent 25%)",
                            backgroundSize: "8px 8px",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
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
              {ready ? (
                <p className="mt-3 text-center text-[12px] text-muted">Exports as 1080 × 1080 PNG</p>
              ) : null}
            </div>

            <div>
              <h3 className="font-display text-[16px] font-bold text-ink">
                {ready ? "This Impact Card includes" : "Your Impact Card will include"}
              </h3>
              <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {impactCardItems.map(({ label, value, present }) => (
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
                CTA on the card: “Discover our work on Spreadbliss”
              </div>
              <div className="mt-6">
                <DisabledButton>
                  <Icon.Download className="h-4 w-4" /> Download Impact Card
                </DisabledButton>
              </div>
            </div>
          </div>
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
              <div className="mt-3 grid grid-cols-1 gap-3 text-[13.5px] leading-relaxed text-muted sm:grid-cols-3">
                <p>Your information stays in your browser — nothing is sent to a server.</p>
                <p>Logo files are processed on your device and never uploaded.</p>
                <p>No social-media credentials or logins are ever required.</p>
              </div>
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
