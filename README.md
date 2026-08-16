# Spreadbliss Growth Kit

A browser-only web app that helps organizations promote their own Spreadbliss profile to their followers, supporters, volunteers, donors, and partners. Organizations promote themselves, their audiences visit their Spreadbliss profiles, and Spreadbliss gains awareness organically.

Core product principle:

> Enter my information once -> everything is ready -> choose where I want to share.

Enter the organization name and Spreadbliss profile URL once, and every asset below is derived automatically — there are no per-platform "Generate" buttons.

## Features

The app is a single page with five sections:

1. **Organization Information** — organization name and Spreadbliss profile URL (required), plus optional logo (PNG/JPEG/WebP, up to 5 MB), short message/tagline, and impact statement.
2. **Share Your Profile** — Copy Link, LinkedIn, Facebook, Instagram, Threads, Pinterest, TikTok, Bluesky, X, YouTube, WhatsApp, and Email. Each button either opens a share/compose intent with prepared content or copies the prepared message and opens the platform.
3. **QR Code** — a QR code pointing to the profile URL, with PNG download and copy-link actions.
4. **Website Badge** — a "Find us on Spreadbliss" button preview plus a copyable HTML snippet for the organization's website.
5. **Impact Card** — a live 1:1 social-card preview (name, logo, impact statement, message, QR code, Spreadbliss branding, call to action) exported as a 1080 x 1080 PNG.

All processing happens locally in the browser: no data is uploaded, persisted, or sent anywhere, and the uploaded logo never leaves the browser.

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router) with static export (`output: 'export'`) — no backend, API routes, or server runtime
- React 19 + TypeScript
- Tailwind CSS 4
- [`qrcode`](https://www.npmjs.com/package/qrcode) for QR generation
- [`html-to-image`](https://www.npmjs.com/package/html-to-image) for the Impact Card PNG export
- Self-hosted fonts (no remote fonts or assets at runtime)

## Getting started

Use Node.js 24 LTS. The repository includes an `.nvmrc` with the expected version:

```bash
nvm use
npm install
```

Start the development server at [http://localhost:3000](http://localhost:3000):

```bash
npm run dev
```

## Checks

There is no test suite yet; lint and build are the required checks:

```bash
npm run lint
npm run build
```

The build uses Next.js static export and writes the production output to `out/`. To verify the static export locally:

```bash
python3 -m http.server 4173 --directory out
```

## Project structure

```text
src/
  app/          Next.js App Router entry (layout, page, global styles, fonts)
  components/   Feature sections and shared UI (form, share panel, QR, badge, impact card)
  hooks/        useQrCode — derives the QR data URL from the profile URL
  lib/          Shared utilities: share content, validators, clipboard, download, slug, strings
  types/        OrganizationInput and related types
```

All generated outputs (share copy, QR data, badge HTML, Impact Card content) are derived from a single organization input model held in ordinary React state — no state-management library and no duplicated mutable state.

## Scope and constraints

This MVP intentionally excludes backends, databases, authentication, social OAuth, automatic posting, AI APIs, analytics, and cloud infrastructure. See [AGENTS.md](AGENTS.md) for the full engineering guidelines, prohibited scope, and review rules that govern changes to this repository.
