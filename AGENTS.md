# AGENTS.md

Repository-specific instructions for coding agents and reviewers working on the Spreadbliss Growth Kit.

## 1. Project purpose

Spreadbliss Growth Kit helps organizations promote their own Spreadbliss profile to their existing followers, supporters, volunteers, donors, partners, and communities. Organizations promote themselves, their audiences visit their Spreadbliss profiles, and Spreadbliss gains awareness organically. The app must feel like the organization promoting its own mission — not an ad-creation tool for Spreadbliss.

Product invariant that must never be broken:

> Enter my information once -> everything is ready -> choose where I want to share.

The MVP is a single-page application with exactly five sections:

1. Organization Information
2. Share Your Profile
3. QR Code
4. Website Badge
5. Impact Card

## 2. Source-of-truth precedence

- **Product intent** comes from *Spreadbliss Growth Kit - Project Context*.
- **Engineering decisions** come from the approved *Spreadbliss Growth Kit - Architecture Plan and Technical Specification*.
- Where the two conflict on implementation, the approved Architecture and Technical Specification wins. Specifically, the approved Next.js architecture **overrides** the earlier Project Context preference for React + Vite.
- **Visual implementation** is controlled by the four approved Figma frames in the Figma project "Mastering Agentic AI - Project 1":
  1. desktop initial state,
  2. desktop ready/generated state,
  3. mobile ready state,
  4. the 1080 x 1080 Impact Card export.
- Anything outside these sources requires explicit owner approval before it is implemented.

## 3. Required technical baseline

- Next.js 16.x using the App Router
- React 19.2.x
- TypeScript throughout application code (avoid `any`)
- Tailwind CSS
- Node.js 24 LTS for local development
- Browser-only / client-side feature behavior
- Static-export compatible (`output: 'export'`)
- Local run target: `http://localhost:3000`

## 4. Explicitly prohibited scope

Do not add any of the following without explicit owner approval:

- NestJS backend or any backend service
- API routes used for product functionality
- Server actions used for product functionality
- Any database
- Authentication or user accounts
- Social OAuth, social profile discovery, or automatic posting
- AWS, S3, CloudFront, Lambda, deployment stack, or other cloud infrastructure
- Any AI API
- Analytics as a requirement
- A global state library (Redux, Zustand, MobX, etc.)
- Unnecessary enterprise abstractions, microservices, DI containers, repository layers
- Multi-page workflow, dashboard, wizard, or stepper

## 5. Implementation rules

- Keep organization data in ordinary React state.
- Derive every generated output (share copy, QR data, badge HTML, Impact Card content) from a single organization input model instead of storing duplicate mutable state.
- Use client components only where browser APIs or interactive state require them; never introduce a runtime server dependency.
- Prefer native browser APIs before adding a dependency (e.g. `navigator.clipboard`, the `URL` constructor, native file input + `FileReader`/object URLs, plain anchors/`window.open`).
- Keep dependencies minimal. The only expected feature libraries are a lightweight QR library such as `qrcode` and `html-to-image`, added when those phases are implemented.
- Never persist the uploaded logo and never send it anywhere.
- Never use `dangerouslySetInnerHTML` to preview the website badge code; render the equivalent visual with normal React elements and expose the code as plain copyable text.
- Keep platform-specific share behavior centralized in one share utility, not scattered across button components.
- Keep validation, slugging, download, and generated-string logic in small shared utilities rather than duplicating it across components.

## 6. UX, privacy, security, and accessibility invariants

- Required fields: organization name and a valid `http://` or `https://` profile URL.
- A valid but non-Spreadbliss hostname may warn; it must not be hard-blocked.
- Optional logo, short message, and impact statement must never block core sharing.
- Accepted logo types: PNG, JPEG, WebP, with a 5 MB maximum; invalid type/size produces an inline message.
- Uploaded logo data stays in the browser.
- All generated sections update automatically. Never add per-section or per-platform "Generate" buttons.
- Actions that depend on organization data stay disabled until the required information is valid.
- Clipboard and download actions must give visible, non-`alert` feedback (success and failure).
- Validate URLs before using them as navigation targets, and open external pages with safe navigation behavior such as `noopener,noreferrer` where applicable.
- User-provided HTML is never rendered.
- Every field has a visible label, keyboard focus stays visible, all actions are keyboard reachable, and success/error feedback is accessible (e.g. live region where practical).
- No secrets or API keys in frontend code.

## 7. Testing and pull request requirements

- Inspect the existing files first and make the smallest coherent change that satisfies the task.
- Required technical checks once the app exists: `npm run lint` and `npm run build` (build must pass with static-export configuration).
- Each feature task must also run targeted browser acceptance checks for the affected behavior and inspect the browser console for errors.
- A new heavy test framework is not required for this course MVP unless a concrete need justifies it.
- Every pull request must include: scope, changed files, commands run with their results, manual test evidence, screenshots when UI changes, and any unresolved limitations.
- Never silently add prohibited scope; call it out and get approval instead.

## 8. Code Review Rules

Reviewers must flag:

- Any backend, API route, server action, authentication, database, cloud, AI, analytics, or deployment scope introduced without explicit approval.
- Any change that loses static-export compatibility.
- Any separate per-platform or per-section "Generate" workflow instead of automatic derivation from the same input.
- Any duplicated mutable state for generated content that could be derived from the organization input model.
- Any required dependency on remote fonts, remote assets, or network services for the core local UI or the Impact Card export.
- Any social credential collection, social profile discovery, OAuth, or automatic publishing.
- Any unsafe URL scheme, arbitrary HTML rendering, uploaded-logo network transfer, or frontend secret.
- Any change that makes an optional field required.
- Any missing required share platform (Copy Link, LinkedIn, Facebook, Instagram, Threads, Pinterest, TikTok, Bluesky, X, YouTube, WhatsApp, Email) or missing one-page section.
- Any change that breaks the Figma-aligned desktop, mobile, or 1080 x 1080 Impact Card behavior.
