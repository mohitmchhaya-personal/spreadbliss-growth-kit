import type { ReactNode, SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement>;
export type IconComponent = (props: IconProps) => ReactNode;

export const Icon = {
  Link: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M10 13a5 5 0 0 0 7.07 0l3-3A5 5 0 0 0 13 3l-1.5 1.5" />
      <path d="M14 11a5 5 0 0 0-7.07 0l-3 3A5 5 0 0 0 11 21l1.5-1.5" />
    </svg>
  ),
  LinkedIn: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21H18.6v-5.3c0-1.26-.02-2.9-1.8-2.9-1.8 0-2.08 1.38-2.08 2.8V21H10.9V9Z" />
    </svg>
  ),
  Facebook: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H17V3.6c-.29-.04-1.27-.12-2.42-.12-2.4 0-4.04 1.46-4.04 4.15v2.32H7.8V13h2.74v8h2.96Z" />
    </svg>
  ),
  Instagram: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  ),
  Threads: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16.4 11.6c-2.4-1-4.5-.6-4.5 1 0 1.2 1.1 1.8 2.2 1.5 1.7-.5 1.9-2.7 1.4-4.4-.6-2-2.3-3-4.2-2.7-2.8.4-4 3-4 6.2 0 3.7 1.9 6.3 5.4 6.3 2.6 0 4.2-1.4 4.9-3.2" />
    </svg>
  ),
  Pinterest: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3a9 9 0 0 0-3.3 17.4c-.1-.7-.2-1.9 0-2.7l1.1-4.6s-.3-.6-.3-1.4c0-1.4.8-2.4 1.8-2.4.8 0 1.2.6 1.2 1.4 0 .9-.5 2.1-.8 3.3-.2.9.5 1.7 1.4 1.7 1.7 0 2.9-2.2 2.9-4.7 0-2-1.3-3.4-3.7-3.4a4 4 0 0 0-4.2 4c0 .8.3 1.4.6 1.8l-.4 1.4" />
    </svg>
  ),
  TikTok: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M14.5 3h-2.7v12.4a2.3 2.3 0 1 1-1.9-2.26v-2.7a5 5 0 1 0 4.6 5V9.1a6.2 6.2 0 0 0 3.7 1.2V7.6a3.6 3.6 0 0 1-3.7-3.4V3Z" />
    </svg>
  ),
  Bluesky: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 10.8C10.9 8.6 7.9 4.6 5.2 3.1 2.6 1.6 1.6 2.3 1 3.4c-.5 1 .3 6.3.8 7.5.5 1.2 1.9 1.6 3.4 1.4-2.2.4-2.7 1.7-1.5 3 2.3 2.4 3.3-1 3.6-1.8l.7-1.7.7 1.7c.3.8 1.3 4.2 3.6 1.8 1.2-1.3.7-2.6-1.5-3 1.5.2 2.9-.2 3.4-1.4.5-1.2 1.3-6.5.8-7.5-.6-1.1-1.6-1.8-4.2-.3C16.1 4.6 13.1 8.6 12 10.8Z" />
    </svg>
  ),
  X: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.6 3h3l-6.6 7.5L21.8 21h-6l-4.7-6.1L5.7 21h-3l7.1-8L2.5 3h6.2l4.2 5.6L17.6 3Zm-1 16.2h1.7L7.5 4.7H5.7l10.9 14.5Z" />
    </svg>
  ),
  YouTube: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22.5 8.2a2.7 2.7 0 0 0-1.9-1.9C18.9 5.8 12 5.8 12 5.8s-6.9 0-8.6.5A2.7 2.7 0 0 0 1.5 8.2 28 28 0 0 0 1 12a28 28 0 0 0 .5 3.8 2.7 2.7 0 0 0 1.9 1.9c1.7.5 8.6.5 8.6.5s6.9 0 8.6-.5a2.7 2.7 0 0 0 1.9-1.9A28 28 0 0 0 23 12a28 28 0 0 0-.5-3.8ZM9.9 15.3V8.7l5.7 3.3-5.7 3.3Z" />
    </svg>
  ),
  WhatsApp: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.3A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1 1 12 20Zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.2-2.8c-.2-.4.2-.4.6-1.2.1-.2 0-.3 0-.5l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5c-.2 0-.5.1-.7.3-.8.8-1 1.9-.6 3.1a11 11 0 0 0 4.7 4.6c1.6.7 2.3.8 3.1.7.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.4-.2Z" />
    </svg>
  ),
  Email: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  ),
  Download: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3v12m0 0 4-4m-4 4-4-4" />
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </svg>
  ),
  Upload: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 16V4m0 0L8 8m4-4 4 4" />
      <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
    </svg>
  ),
  Lock: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="4.5" y="10" width="15" height="10" rx="2.5" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </svg>
  ),
  Sparkle: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2c.4 3.9 1.6 6.6 4 8.4-2.4 1.8-3.6 4.5-4 8.4-.4-3.9-1.6-6.6-4-8.4 2.4-1.8 3.6-4.5 4-8.4Z" />
      <path d="M19 3c.2 1.7.7 2.9 1.8 3.7-1.1.8-1.6 2-1.8 3.7-.2-1.7-.7-2.9-1.8-3.7C18.3 5.9 18.8 4.7 19 3Z" opacity=".7" />
    </svg>
  ),
  Check: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m5 13 4 4L19 7" />
    </svg>
  ),
  Bolt: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13 2 4.5 13.5H11l-1 8.5L19.5 10H13l0-8Z" />
    </svg>
  ),
  Spinner: (props: IconProps) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" {...props}>
      <path d="M12 3a9 9 0 1 1-9 9" />
    </svg>
  ),
};
