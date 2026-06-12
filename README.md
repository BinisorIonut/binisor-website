# binisor.com

Personal site and DeskShift landing pages. Built with [Astro](https://astro.build),
deployed to GitHub Pages, served via Cloudflare DNS.

## Routes

- `/` — personal landing
- `/deskshift` — DeskShift marketing
- `/deskshift/privacy` — Privacy Policy (required by App Store)
- `/deskshift/support` — FAQ + contact form (required by App Store)
- `/deskshift/terms` — Terms / EULA

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
npm run preview  # serves the production build locally
```

## Before going live

See **TODO.md** for the placeholder values that still need to be filled in
(LinkedIn URL, GitHub URL, Web3Forms key, Cloudflare Analytics token, App
Store URL).

## Deploy

See **DEPLOY.md** for the one-time GitHub Pages + Cloudflare DNS setup.
After that, every push to `main` triggers an automatic redeploy.

## Stack

- Astro 6 (static output)
- Tailwind CSS v4 (auto light/dark via `prefers-color-scheme`)
- MDX for the legal pages
- `@astrojs/sitemap` for sitemap.xml
- Web3Forms for the contact form
- Cloudflare Web Analytics (privacy-friendly, no cookies)
