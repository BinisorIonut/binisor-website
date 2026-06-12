# TODO — what's left before going live

The site builds cleanly and is structurally complete. The items below are
things only you can do (third-party accounts, image assets, App Store
approval) — once they're in, the site goes live.

---

## ✅ Done

- LinkedIn URL wired into `/`
- GitHub URL wired into `/` (`github.com/BinisorIonut`)
- Bio drafted based on your LinkedIn (Senior iOS dev, Bucharest, 7 yrs Swift)
- Form service chosen: **Web3Forms** (free, no account needed beyond email confirm)
- Analytics chosen: **Cloudflare Web Analytics** (free, no cookies, no GDPR banner)
- Privacy / Terms / Support pages with full legal text
- Auto light/dark theme via `prefers-color-scheme`

---

## 1. Email at `hello@binisor.com` (free, ~10 min via Cloudflare)

You want a professional `@binisor.com` email. The fastest free path:

**Cloudflare Email Routing** — receive at `hello@binisor.com`, forward to
your Gmail. Free, no monthly cost, set up in 10 minutes since your DNS is
already on Cloudflare.

1. Cloudflare → your domain → **Email → Email Routing**
2. Enable Email Routing (Cloudflare adds the MX records automatically)
3. Add a route: `hello@binisor.com` → `binisor.ionut@gmail.com` (or whatever
   your destination Gmail is). Cloudflare sends a verification email to the
   destination — click the link.
4. Done. Mail to `hello@binisor.com` now lands in your Gmail inbox.

**Limitation:** this is receive-only. To reply *from* `hello@binisor.com`
(instead of your Gmail), you have two options later:
- Free path: configure Gmail "Send mail as" with an SMTP relay
  (SendGrid free tier or similar — 30 min setup)
- Paid path: Fastmail (~$5/mo) or Google Workspace (~$6/mo) — full-featured
  custom-domain mail, send & receive from the same address

For App Store launch, receive-only is enough. You can reply from Gmail and
users won't care.

**Once `hello@binisor.com` is live**, swap `binisor.ionut@gmail.com` in two
files for the cleaner branded address:
- `src/pages/deskshift/privacy.mdx` (two mentions)
- `src/pages/deskshift/terms.mdx` (two mentions)
- `src/pages/deskshift/support.astro` (FAQ text and Web3Forms destination — see
  item 2)

---

## 2. Web3Forms access key (~3 min)

1. Go to <https://web3forms.com>
2. Enter your destination email (`hello@binisor.com` once it's set up via
   Cloudflare, or `binisor.ionut@gmail.com` for now)
3. Confirm via the email they send
4. Copy the access key they show you
5. In `src/pages/deskshift/support.astro`, replace:
   ```ts
   const WEB3FORMS_ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";
   ```
   with the real key. The key is safe to commit publicly.

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
