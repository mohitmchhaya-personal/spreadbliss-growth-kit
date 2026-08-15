"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Icon, type IconComponent } from "@/components/icons";
import { DisabledButton } from "@/components/DisabledButton";

const SUCCESS_STYLE = {
  background: "#eaf7ef",
  color: "#1f7a45",
  boxShadow: "inset 0 0 0 1px #bfe6cd",
};

type ActionButtonProps = {
  children: ReactNode;
  icon: IconComponent;
  variant?: "solid" | "outline";
  successLabel?: string;
  disabled?: boolean;
  className?: string;
  /** Return true to flash the transient success state on the button. */
  onAction: () => Promise<boolean> | boolean;
};

/** Enabled counterpart to DisabledButton with a transient in-button success state. */
export function ActionButton({
  children,
  icon: IconCmp,
  variant = "solid",
  successLabel = "Copied",
  disabled = false,
  className = "",
  onAction,
}: ActionButtonProps) {
  const [done, setDone] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  if (disabled) {
    return (
      <DisabledButton variant={variant} className={className}>
        <IconCmp className="h-4 w-4" /> {children}
      </DisabledButton>
    );
  }

  async function handleClick() {
    const succeeded = await onAction();
    if (!succeeded) {
      return;
    }
    setDone(true);
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => setDone(false), 1800);
  }

  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-[14px] font-semibold transition active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-brand";
  const styles =
    variant === "solid"
      ? "bg-brand text-white shadow-sm hover:bg-brand-strong"
      : "border border-line bg-white text-ink hover:border-brand/50 hover:bg-brand-soft/40";

  return (
    <button
      type="button"
      onClick={() => void handleClick()}
      className={`${base} ${done ? "" : styles} ${className}`}
      style={done ? SUCCESS_STYLE : undefined}
    >
      {done ? <Icon.Check className="h-4 w-4" /> : <IconCmp className="h-4 w-4" />}
      {done ? `${successLabel} ✓` : children}
    </button>
  );
}
