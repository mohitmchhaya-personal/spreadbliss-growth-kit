"use client";

import { useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { FieldLabel } from "@/components/FieldLabel";
import { Icon } from "@/components/icons";
import {
  ACCEPTED_LOGO_LABEL,
  ACCEPTED_LOGO_TYPES,
  validateLogoFile,
  validateOrganizationName,
  validateProfileUrl,
} from "@/lib/validators";
import type { OrganizationInput } from "@/types/growth-kit";

const inputClass =
  "w-full rounded-xl border border-line bg-canvas/60 px-4 py-3 text-[15px] text-ink placeholder:text-muted/60 outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand-soft";

const invalidInputClass =
  "w-full rounded-xl border border-red-400 bg-canvas/60 px-4 py-3 text-[15px] text-ink placeholder:text-muted/60 outline-none transition focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100";

type OrganizationFormProps = {
  value: OrganizationInput;
  onChange: (next: OrganizationInput) => void;
};

export function OrganizationForm({ value, onChange }: OrganizationFormProps) {
  const [nameTouched, setNameTouched] = useState(false);
  const [urlTouched, setUrlTouched] = useState(false);
  const [logoError, setLogoError] = useState<string | null>(null);
  const [logoFileName, setLogoFileName] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const nameError = nameTouched ? validateOrganizationName(value.name) : null;
  const urlValidation = validateProfileUrl(value.profileUrl);
  const urlError = urlTouched
    ? urlValidation.status === "empty"
      ? "Spreadbliss profile URL is required."
      : urlValidation.status === "invalid"
        ? urlValidation.error
        : null
    : null;
  const urlWarning = urlValidation.status === "valid" ? urlValidation.warning : undefined;

  const acceptLogoFile = (file: File) => {
    const error = validateLogoFile(file);
    if (error) {
      setLogoError(error);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setLogoError(null);
        setLogoFileName(file.name);
        onChange({ ...value, logoDataUrl: reader.result });
      } else {
        setLogoError("We couldn't read that file. Please try a different image.");
      }
    };
    reader.onerror = () => {
      setLogoError("We couldn't read that file. Please try a different image.");
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) acceptLogoFile(file);
    event.target.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
    const file = event.dataTransfer.files?.[0];
    if (file) acceptLogoFile(file);
  };

  const removeLogo = () => {
    setLogoError(null);
    setLogoFileName(null);
    onChange({ ...value, logoDataUrl: undefined });
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div>
        <FieldLabel htmlFor="organization-name" required>
          Organization name
        </FieldLabel>
        <input
          id="organization-name"
          className={nameError ? invalidInputClass : inputClass}
          placeholder="e.g. Riverside Food Collective"
          value={value.name}
          onChange={(event) => onChange({ ...value, name: event.target.value })}
          onBlur={() => setNameTouched(true)}
          aria-invalid={nameError ? true : undefined}
          aria-describedby={nameError ? "organization-name-error" : undefined}
        />
        {nameError ? (
          <p id="organization-name-error" className="mt-2 text-[13px] font-semibold text-red-600">
            {nameError}
          </p>
        ) : null}
      </div>

      <div>
        <FieldLabel htmlFor="profile-url" required>
          Spreadbliss profile URL
        </FieldLabel>
        <input
          id="profile-url"
          type="url"
          className={urlError ? invalidInputClass : inputClass}
          placeholder="https://spreadbliss.org/your-organization"
          value={value.profileUrl}
          onChange={(event) => onChange({ ...value, profileUrl: event.target.value })}
          onBlur={() => setUrlTouched(true)}
          aria-invalid={urlError ? true : undefined}
          aria-describedby={
            urlError ? "profile-url-error" : urlWarning ? "profile-url-warning" : undefined
          }
        />
        {urlError ? (
          <p id="profile-url-error" className="mt-2 text-[13px] font-semibold text-red-600">
            {urlError}
          </p>
        ) : urlWarning ? (
          <p id="profile-url-warning" className="mt-2 text-[13px] font-semibold text-gold">
            {urlWarning}
          </p>
        ) : null}
      </div>

      <div className="lg:col-span-2">
        <FieldLabel htmlFor="organization-logo">Organization logo</FieldLabel>
        <input
          ref={fileInputRef}
          id="organization-logo"
          type="file"
          accept={ACCEPTED_LOGO_TYPES.join(",")}
          className="sr-only"
          onChange={handleFileInput}
          aria-describedby={logoError ? "organization-logo-error" : "organization-logo-help"}
        />
        {value.logoDataUrl ? (
          <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-canvas/50 px-5 py-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value.logoDataUrl}
              alt={`${value.name.trim() || "Organization"} logo preview`}
              className="h-16 w-16 shrink-0 rounded-2xl border border-line bg-white object-contain"
            />
            <div className="min-w-0">
              <p className="truncate text-[14px] font-semibold text-ink">
                {logoFileName ?? "Uploaded logo"}
              </p>
              <p id="organization-logo-help" className="text-[12.5px] text-muted">
                Uploaded · stays on your device
              </p>
            </div>
            <div className="ml-auto flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-lg border border-line bg-white px-3.5 py-2 text-[13px] font-semibold text-ink transition hover:border-brand/50 hover:bg-brand-soft/40"
              >
                Replace
              </button>
              <button
                type="button"
                onClick={removeLogo}
                className="rounded-lg border border-line bg-white px-3.5 py-2 text-[13px] font-semibold text-muted transition hover:border-red-300 hover:text-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div
            onDragOver={(event) => {
              event.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            className={`flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-6 py-9 text-center transition ${
              dragActive
                ? "border-brand bg-brand-soft/40"
                : "border-line bg-canvas/50 hover:border-brand/50 hover:bg-brand-soft/30"
            }`}
          >
            <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-brand shadow-sm">
              <Icon.Upload className="h-5 w-5" />
            </span>
            <p className="text-[14px] font-semibold text-ink">
              Drag &amp; drop your logo, or{" "}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-brand-strong underline underline-offset-2"
              >
                browse files
              </button>
            </p>
            <p id="organization-logo-help" className="text-[12.5px] text-muted">
              {ACCEPTED_LOGO_LABEL}, up to 5 MB — stays on your device
            </p>
          </div>
        )}
        {logoError ? (
          <p
            id="organization-logo-error"
            role="alert"
            className="mt-2 text-[13px] font-semibold text-red-600"
          >
            {logoError}
          </p>
        ) : null}
      </div>

      <div>
        <FieldLabel htmlFor="short-message">Short message / tagline</FieldLabel>
        <input
          id="short-message"
          className={inputClass}
          placeholder="e.g. Ending hunger, one neighbor at a time."
          value={value.message ?? ""}
          onChange={(event) =>
            onChange({ ...value, message: event.target.value === "" ? undefined : event.target.value })
          }
        />
      </div>
      <div>
        <FieldLabel htmlFor="impact-statement">Impact statement / statistic</FieldLabel>
        <input
          id="impact-statement"
          className={inputClass}
          placeholder="e.g. 42,000 meals served last year"
          value={value.impact ?? ""}
          onChange={(event) =>
            onChange({ ...value, impact: event.target.value === "" ? undefined : event.target.value })
          }
        />
      </div>
    </div>
  );
}
