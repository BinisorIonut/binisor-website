# TODO — what's left before going live

The site builds cleanly and is structurally complete. The items below are
things only you can do (third-party accounts, image assets, App Store
approval) — once they're in, the site goes live.

---

## ✅ Done

- LinkedIn URL wired into `/`
- GitHub URL wired into `/` (`github.com/BinisorIonut`)
- Bio drafted based on your LinkedIn (Senior iOS dev, Bucharest, 7 yrs Swift)
- Form service: **Google Forms** — the support form shares one inbox with the app's in-app feedback
- Analytics chosen: **Cloudflare Web Analytics** (free, no cookies, no GDPR banner)
- Privacy / Terms / Support pages with full legal text
- Auto light/dark theme via `prefers-color-scheme`

---

## 1. Email at `deskshift@binisor.com` (via iCloud+ Custom Email Domain)

Set up through **iCloud+ → Custom Email Domain** on `binisor.com`, hosting
`deskshift@binisor.com` on iCloud Mail. Send *and* receive work natively from
Apple Mail once the domain is verified — no SMTP relay or third-party forwarder
needed.

Prerequisite: iCloud Mail must be enabled first (creates an `@icloud.com`
address, done on an Apple device). Then add the domain in iCloud Settings →
Custom Email Domain and publish the DNS records Apple provides (MX, SPF, DKIM)
at the registrar.

- [x] Branded address swapped into the site — `privacy.mdx`, `terms.mdx`, and
  `support.astro` all use `deskshift@binisor.com`.
- [ ] **Pending:** Apple's domain verification. Once it clears, send a test
  message to `deskshift@binisor.com` to confirm it receives mail before launch.

---

## 2. Contact form — already wired (Google Forms)

✅ Done. The support form posts to the **same Google Form** the macOS app's
in-app feedback uses, so app + website share one inbox (see
`src/pages/deskshift/support.astro`). No Web3Forms account or access key is
needed — that earlier plan was dropped.

---

## 3. Cloudflare Web Analytics token (~5 min)

1. Cloudflare → **Web Analytics** in the left nav (under Analytics &
   Logs)
2. **Add a site** → enter `binisor.com`
3. Cloudflare gives you a snippet that looks like:
   ```html
   <script defer src="..." data-cf-beacon='{"token": "abc123..."}'></script>
   ```
4. Copy just the `token` value (the long string after `"token": "`)
5. In `src/layouts/Base.astro`, replace:
   ```ts
   const CF_ANALYTICS_TOKEN = "";
   ```
   with the real token. The script only loads on production builds.

---

## 4. App Store URL — ✅ done 2026-10-03

The badge links to the App Store through `appStoreUrl()` in
`src/lib/deskshift.ts`. Set `PROVIDER_TOKEN` there (App Store Connect → App
Analytics → campaigns) to tag every link with a campaign name.

At every release, update `VERSION` and `VERSION_DATE` in the same file, and
`MIN_MACOS` and `LANGUAGES` when they change (1.3.0, 2026-10-13: macOS 15, 47
languages). The landing page's "What's new" list and the press kit's "New in
version" list are written by hand from the app's release notes; the
screenshots come from the app's screenshot script
(`DeskShift/docs/marketing/AppStoreScreenshots.md`).

---

## 5. Image assets — ✅ done 2026-10-03

`apple-touch-icon.png`, `og-default.png` and `deskshift/og.png` are in
`public/`; the icon and screenshots are in `src/assets/deskshift/`. The
landing page shows them optimized to WebP, and the press kit links to the
original PNGs.

---

# Deploy

Once items 1–3 above are in (item 4 and 5 can come later), follow
**DEPLOY.md** to push to GitHub and wire up DNS on Cloudflare. ~30 min,
fully scripted.
