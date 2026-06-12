# Deploying binisor.com


GitHub Pages serves the static build, Cloudflare hosts the DNS. One-time setup
takes about 30 minutes; subsequent updates happen automatically on every
`git push` to `main`.

## 1. Push the code to GitHub

```bash
cd binisor-website
git init -b main
git add .
git commit -m "Initial site"
gh repo create binisor-website --public --source=. --remote=origin --push
```

(If you don't use the `gh` CLI: create `binisor-website` manually on GitHub as
a **public** repo, then `git remote add origin git@github.com:<your-user>/binisor-website.git && git push -u origin main`.)

## 2. Enable GitHub Pages

In the repo on GitHub:

1. **Settings → Pages**
2. **Source:** GitHub Actions
3. The first push triggers `.github/workflows/deploy.yml`. Wait for it to go
   green under the **Actions** tab. You'll see a temporary URL like
   `https://<your-user>.github.io/binisor-website/` — that's expected before
   DNS is wired up.

## 3. Cloudflare DNS records

Log into Cloudflare, pick `binisor.com`, open **DNS → Records**. Delete any
existing A/AAAA on the apex first, then add:

### Apex (binisor.com) → GitHub Pages

| Type | Name | Content                  | Proxy        | TTL  |
|------|------|--------------------------|--------------|------|
| A    | `@`  | `185.199.108.153`        | **DNS only** | Auto |
| A    | `@`  | `185.199.109.153`        | **DNS only** | Auto |
| A    | `@`  | `185.199.110.153`        | **DNS only** | Auto |
| A    | `@`  | `185.199.111.153`        | **DNS only** | Auto |
| AAAA | `@`  | `2606:50c0:8000::153`    | **DNS only** | Auto |
| AAAA | `@`  | `2606:50c0:8001::153`    | **DNS only** | Auto |
| AAAA | `@`  | `2606:50c0:8002::153`    | **DNS only** | Auto |
| AAAA | `@`  | `2606:50c0:8003::153`    | **DNS only** | Auto |

### www → apex redirect

| Type  | Name | Content                       | Proxy        | TTL  |
|-------|------|-------------------------------|--------------|------|
| CNAME | `www`| `<your-user>.github.io`       | **DNS only** | Auto |

**Important:** keep Proxy on **DNS only** (grey cloud) until GitHub finishes
provisioning the HTTPS certificate. With orange-cloud Proxy on, GitHub can't
see the request and never issues a cert. After it's live (~15 min — 24 h),
you can switch Proxy to ON if you want Cloudflare features.

## 4. Tell GitHub Pages about the custom domain

After DNS propagates (`dig binisor.com +short` should return the four `185.199.*.153` IPs):

1. **GitHub → Settings → Pages → Custom domain:** `binisor.com`
2. Save. GitHub does a DNS check (✅ when good) and starts cert provisioning.
3. Wait until **Enforce HTTPS** becomes available (not greyed out), then tick it.

The `public/CNAME` file in this repo already pins the domain, so the custom
domain survives every deploy.

## 5. Cloudflare SSL/TLS settings

Once GitHub HTTPS is on:

1. **SSL/TLS → Overview** → set mode to **Full (strict)**.
   ⚠️ Do **not** use *Flexible* — it creates redirect loops with GitHub Pages.
2. **SSL/TLS → Edge Certificates** → **Always Use HTTPS:** ON.
3. **SSL/TLS → Edge Certificates** → **Automatic HTTPS Rewrites:** ON.

## 6. www → apex redirect rule

Cloudflare → **Rules → Redirect Rules → Create rule**:

- Name: `www to apex`
- When incoming requests match: *Hostname* equals `www.binisor.com`
- Then:
  - Type: *Dynamic*
  - Expression: `concat("https://binisor.com", http.request.uri.path)`
  - Status code: `301`
  - Preserve query string: ON

## 7. Verification

Open Terminal:

```bash
dig binisor.com +short            # → 185.199.108.153, .109.153, .110.153, .111.153
curl -I https://binisor.com       # → 200, with cert subject = binisor.com
curl -I https://www.binisor.com   # → 301 redirect to https://binisor.com/
```

Open in the browser:

- `https://binisor.com` → personal landing
- `https://binisor.com/deskshift` → DeskShift marketing
- `https://binisor.com/deskshift/privacy` → privacy
- `https://binisor.com/deskshift/support` → support + form
- `https://binisor.com/deskshift/terms` → terms

Toggle macOS Appearance between Light and Dark — colors should flip without a
reload.

## 8. Wire URLs into App Store Connect

In App Store Connect → DeskShift → **App Information**:

- **Marketing URL:** `https://binisor.com/deskshift`
- **Support URL:** `https://binisor.com/deskshift/support`
- **Privacy Policy URL:** `https://binisor.com/deskshift/privacy`
- **License Agreement:** custom EULA — paste the contents of
  `src/pages/deskshift/terms.mdx` (App Store Connect has a "License Agreement"
  field that takes plain text, not a URL).

## Subsequent updates

Every push to `main` triggers a rebuild and redeploy. To preview locally:

```bash
npm run dev      # localhost:4321
npm run build    # output in dist/
npm run preview  # serve the production build locally on 4321
```
