import type { ReactNode } from "react";

type SectionCardProps = {
  step: number;
  title: string;
  helper: string;
  children: ReactNode;
};

export function SectionCard({ step, title, helper, children }: SectionCardProps) {
  return (
    <section className="rounded-3xl border border-line bg-card p-6 shadow-[0_1px_2px_rgba(16,48,43,0.04),0_12px_32px_-20px_rgba(16,48,43,0.25)] sm:p-9">
      <div className="flex items-start gap-4">
        <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-soft font-display text-[15px] font-bold text-brand-strong">
          {step}
        </span>
        <div>
          <h2 className="font-display text-[22px] font-bold text-ink">{title}</h2>
          <p className="mt-1 max-w-xl text-[14.5px] leading-relaxed text-muted">{helper}</p>
        </div>
      </div>
      <div className="mt-7">{children}</div>
    </section>
  );
}
