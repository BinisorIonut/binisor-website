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

## 4. App Store URL (after Apple approval)

In `src/components/AppStoreBadge.astro`, the badge currently has no link
(`href = "#"`). Once Apple approves DeskShift and gives you the canonical URL
(looks like `https://apps.apple.com/app/deskshift/id123456789`):

- Update the default `href` in `AppStoreBadge.astro`, OR
- Pass the URL where the badge is used:
  ```astro
  <AppStoreBadge href="https://apps.apple.com/app/deskshift/id..." />
  ```

---

## 5. Image assets (optional but nice)

Drop these PNGs into `public/`:
- `apple-touch-icon.png` — 180×180, no transparency. Used by iOS/macOS when
  the site is pinned to home screen.
- `og-default.png` — 1200×630. Used for link previews on Twitter, LinkedIn,
  Slack, iMessage, etc.
- `deskshift-icon.png` — 1024×1024. Hero image on `/deskshift`.

Easiest source: export from the finalized DeskShift app icon. Both PNG and
WebP work — keep them under 200 KB.

---

# Deploy

Once items 1–3 above are in (item 4 and 5 can come later), follow
**DEPLOY.md** to push to GitHub and wire up DNS on Cloudflare. ~30 min,
fully scripted.
