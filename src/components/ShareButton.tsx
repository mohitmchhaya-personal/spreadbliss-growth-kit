import type { ReactNode } from "react";
import type { IconComponent } from "@/components/icons";

type ShareButtonProps = {
  label: string;
  icon: IconComponent;
  disabled: boolean;
  onClick: () => void;
  children?: ReactNode;
};

export function ShareButton({ label, icon: ShareIcon, disabled, onClick }: ShareButtonProps) {
  if (disabled) {
    return (
      <button
        type="button"
        disabled
        aria-disabled
        className="group flex cursor-not-allowed items-center gap-3 rounded-xl border border-line bg-canvas/60 px-4 py-3.5 text-left opacity-80"
      >
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white text-muted shadow-sm">
          <ShareIcon className="h-[18px] w-[18px]" />
        </span>
        <span className="text-[14px] font-semibold text-muted">{label}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex items-center gap-3 rounded-xl border border-line bg-white px-4 py-3.5 text-left shadow-sm transition hover:border-brand/40 hover:shadow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand-strong transition group-hover:bg-brand group-hover:text-white">
        <ShareIcon className="h-[18px] w-[18px]" />
      </span>
      <span className="text-[14px] font-semibold text-ink">{label}</span>
    </button>
  );
}
