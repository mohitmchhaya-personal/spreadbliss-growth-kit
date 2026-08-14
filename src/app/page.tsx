import Image from "next/image";
import { DisabledButton } from "@/components/DisabledButton";
import { FieldLabel } from "@/components/FieldLabel";
import { Icon, type IconComponent } from "@/components/icons";
import { SectionCard } from "@/components/SectionCard";

const inputClass =
  "w-full rounded-xl border border-line bg-canvas/60 px-4 py-3 text-[15px] text-ink placeholder:text-muted/60 outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand-soft";

const shareTargets: { label: string; icon: IconComponent }[] = [
  { label: "Copy Link", icon: Icon.Link },
  { label: "LinkedIn", icon: Icon.LinkedIn },
  { label: "Facebook", icon: Icon.Facebook },
  { label: "Instagram", icon: Icon.Instagram },
  { label: "Threads", icon: Icon.Threads },
  { label: "Pinterest", icon: Icon.Pinterest },
  { label: "TikTok", icon: Icon.TikTok },
  { label: "Bluesky", icon: Icon.Bluesky },
  { label: "X", icon: Icon.X },
  { label: "YouTube", icon: Icon.YouTube },
  { label: "WhatsApp", icon: Icon.WhatsApp },
  { label: "Email", icon: Icon.Email },
];

const impactCardItems = [
  "Organization name",
  "Organization logo (optional)",
  "Impact statistic (optional)",
  "Short message (optional)",
  "Your profile QR code",
  "Spreadbliss branding",
];

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
        </div>
      </div>

      <main className="mx-auto flex max-w-[1180px] flex-col gap-7 px-6 pb-8 pt-8">
        <SectionCard
          step={1}
          title="Organization Information"
          helper="Enter your information once and your sharing tools will be prepared automatically."
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <FieldLabel htmlFor="organization-name" required>
                Organization name
              </FieldLabel>
              <input
                id="organization-name"
                className={inputClass}
                placeholder="e.g. Riverside Food Collective"
              />
            </div>
            <div>
              <FieldLabel htmlFor="profile-url" required>
                Spreadbliss profile URL
              </FieldLabel>
              <input
                id="profile-url"
                className={inputClass}
                placeholder="spreadbliss.org/your-organization"
              />
            </div>

            <div className="lg:col-span-2">
              <FieldLabel>Organization logo</FieldLabel>
              <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-line bg-canvas/50 px-6 py-9 text-center transition hover:border-brand/50 hover:bg-brand-soft/30">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-brand shadow-sm">
                  <Icon.Upload className="h-5 w-5" />
                </span>
                <p className="text-[14px] font-semibold text-ink">
                  Drag &amp; drop your logo, or{" "}
                  <span className="text-brand-strong underline underline-offset-2">browse files</span>
                </p>
                <p className="text-[12.5px] text-muted">PNG, JPG or SVG — stays on your device</p>
              </div>
            </div>

            <div>
              <FieldLabel htmlFor="short-message">Short message / tagline</FieldLabel>
              <input
                id="short-message"
                className={inputClass}
                placeholder="e.g. Ending hunger, one neighbor at a time."
              />
            </div>
            <div>
              <FieldLabel htmlFor="impact-statement">Impact statement / statistic</FieldLabel>
              <input
                id="impact-statement"
                className={inputClass}
                placeholder="e.g. 42,000 meals served last year"
              />
            </div>
          </div>
        </SectionCard>

        <SectionCard
          step={2}
          title="Share Your Profile"
          helper="Enter your organization name and Spreadbliss profile URL to activate your sharing options."
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {shareTargets.map(({ label, icon: ShareIcon }) => (
              <button
                key={label}
                type="button"
                disabled
                className="group flex cursor-not-allowed items-center gap-3 rounded-xl border border-line bg-canvas/60 px-4 py-3.5 text-left opacity-80"
                aria-disabled
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white text-muted shadow-sm">
                  <ShareIcon className="h-[18px] w-[18px]" />
                </span>
                <span className="text-[14px] font-semibold text-muted">{label}</span>
              </button>
            ))}
          </div>
          <p className="mt-5 flex items-center gap-2 text-[13px] text-muted">
            <Icon.Lock className="h-4 w-4 text-brand" />
            Sharing buttons unlock automatically — no social accounts or passwords needed.
          </p>
        </SectionCard>

        <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
          <SectionCard step={3} title="QR Code" helper="Point phones straight to your Spreadbliss profile.">
            <div className="grid place-items-center rounded-2xl border border-line bg-canvas/50 px-6 py-10">
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
                Your QR code will appear here once you enter your Spreadbliss profile URL.
              </p>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <DisabledButton>
                <Icon.Download className="h-4 w-4" /> Download QR Code
              </DisabledButton>
              <DisabledButton variant="outline">
                <Icon.Link className="h-4 w-4" /> Copy Profile Link
              </DisabledButton>
            </div>
          </SectionCard>

          <SectionCard
            step={4}
            title="Website Badge"
            helper="Add a badge to your own website so visitors can find you on Spreadbliss."
          >
            <div className="grid place-items-center rounded-2xl border border-line bg-canvas/50 px-6 py-8">
              <div className="inline-flex items-center gap-3 rounded-full border border-line bg-white px-5 py-3 opacity-60 shadow-sm">
                <span className="grid h-7 w-7 place-items-center rounded-full bg-brand text-white">
                  <Icon.Sparkle className="h-4 w-4" />
                </span>
                <span className="font-display text-[14px] font-bold text-ink">Find us on Spreadbliss</span>
              </div>
              <p className="mt-4 text-[12.5px] text-muted">Example preview</p>
            </div>
            <div className="mt-5 rounded-xl border border-line bg-[#111111] px-4 py-4 font-mono text-[12.5px] leading-relaxed">
              <span className="text-white/40">&lt;!-- Your embed code appears here --&gt;</span>
              <br />
              <span className="text-white/55">&lt;a href=&quot;…&quot;&gt;Find us on Spreadbliss&lt;/a&gt;</span>
            </div>
            <div className="mt-5">
              <DisabledButton>
                <Icon.Link className="h-4 w-4" /> Copy Website Code
              </DisabledButton>
            </div>
          </SectionCard>
        </div>

        <SectionCard
          step={5}
          title="Impact Card"
          helper="A ready-to-post square graphic that tells your story at a glance."
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,360px)_1fr] lg:items-center">
            <div className="mx-auto w-full max-w-[360px]">
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
            </div>

            <div>
              <h3 className="font-display text-[16px] font-bold text-ink">Your Impact Card will include</h3>
              <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {impactCardItems.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-[13.5px] text-ink">
                    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-soft text-brand-strong">
                      <Icon.Check className="h-3 w-3" />
                    </span>
                    {item}
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
