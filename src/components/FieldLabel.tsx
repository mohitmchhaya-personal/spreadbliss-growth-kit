import type { ReactNode } from "react";

type FieldLabelProps = {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
};

export function FieldLabel({ htmlFor, children, required }: FieldLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 flex items-center gap-2 text-[13.5px] font-semibold text-ink"
    >
      {children}
      {required ? (
        <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wide text-accent">
          Required
        </span>
      ) : (
        <span className="rounded-full bg-canvas px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wide text-muted">
          Optional
        </span>
      )}
    </label>
  );
}
