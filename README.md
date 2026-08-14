# Spreadbliss Growth Kit

Static Next.js app for helping organizations promote their Spreadbliss profiles.

## Local setup

Use Node.js 24 LTS. The repository includes an `.nvmrc` with the expected version:

```bash
nvm use
npm install
```

Start the local development server at [http://localhost:3000](http://localhost:3000):

```bash
npm run dev
```

Run the checks:

```bash
npm run lint
npm run build
```

The build uses Next.js static export and writes the production output to `out/`.

## Scope

The MVP is a single page with five sections:

1. Organization Information
2. Share Your Profile
3. QR Code
4. Website Badge
5. Impact Card

The MVP has no backend, API routes, database, authentication, or cloud infrastructure.
