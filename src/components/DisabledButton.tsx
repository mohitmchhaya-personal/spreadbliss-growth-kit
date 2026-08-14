import type { ReactNode } from "react";

type DisabledButtonProps = {
  children: ReactNode;
  variant?: "solid" | "outline";
  className?: string;
};

export function DisabledButton({
  children,
  variant = "solid",
  className = "",
}: DisabledButtonProps) {
  const base =
    "inline-flex cursor-not-allowed items-center justify-center gap-2 rounded-xl px-5 py-3 text-[14px] font-semibold transition";
  const styles =
    variant === "solid"
      ? "bg-brand/35 text-white"
      : "border border-line bg-canvas/60 text-muted";

  return (
    <button type="button" disabled className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  );
}
