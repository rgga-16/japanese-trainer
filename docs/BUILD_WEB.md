# Building the web app (browser + PWA)

Guide to building, deploying, and installing the web/PWA target on Windows (PowerShell), with bash equivalents alongside. For the native targets, see [`BUILD_ANDROID.md`](./BUILD_ANDROID.md) and [`BUILD_IOS.md`](./BUILD_IOS.md).

## 1. At a glance

This app ships three ways from one codebase:

| Target | How you get it | Covered here? |
| --- | --- | --- |
| Browser | Open the deployed URL, or `npm run dev` / `npm run preview` locally | Yes |
| Installable PWA | Same build as "Browser", installed via "Add to Home Screen" / Chrome's install prompt | Yes |
| Native Android/iOS app | Capacitor, `npm run build:native` + `cap sync` | No — see [`BUILD_ANDROID.md`](./BUILD_ANDROID.md) / [`BUILD_IOS.md`](./BUILD_IOS.md) |

The app is fully offline: all content is static TS compiled into the bundle, and progress persists to a single versioned `localStorage` key (`jlpt-n4-trainer`). No backend, no external APIs, no CDNs, no webfonts — so "deploying" the web target is just serving static files.

## 2. Local development

```powershell
npm install
npm run dev
```

Opens the Vite dev server (default `http://localhost:5173`) with HMR. This is a **dev-mode** bundle — unminified, no service worker, fast rebuilds.

To exercise the real production build (including the service worker, which `vite dev` never registers):

```powershell
npm run build
npm run preview
```

`npm run preview` serves the actual `dist/` output produced by `npm run build`, so it's the only local way to test offline behavior, install prompts, and PWA caching — `npm run dev` cannot do this.

## 3. Building for the web

```powershell
npm run build
```

This is `tsc --noEmit && vite build` — a type-check followed by the production build. Output lands in `dist/`:

- `index.html` + hashed JS/CSS assets
- `sw.js` — the Workbox-generated service worker
- `registerSW.js` — the snippet `index.html` loads to register it
- `manifest.webmanifest` — the PWA manifest
- the contents of `public/` (icons, `favicon.svg`) copied verbatim

### Web vs. native

Both targets are produced from the same [`../vite.config.ts`](../vite.config.ts) via Vite's `mode`, and both write to `dist/` — **don't confuse them**. Running `build:native` then deploying `dist/` to a web host ships relative asset paths and no service worker (broken offline support). Always use plain `npm run build` for web deploys.

| | `npm run build` (web) | `npm run build:native` |
| --- | --- | --- |
| `base` | `/` (or `VITE_BASE`) | `./` |
| Service worker / manifest | Yes (`vite-plugin-pwa`) | No |
| Where it's consumed | Any static web host | Copied into the native project via `cap sync` |
| When to use | Deploying to GitHub Pages / Netlify / any URL | `npm run sync` / `npm run android` / `npm run ios` |

## 4. Base paths and `VITE_BASE`

[`../vite.config.ts`](../vite.config.ts) sets the web build's base path from `process.env.VITE_BASE`, defaulting to `/`:

```ts
base: isNative ? "./" : (process.env.VITE_BASE ?? "/"),
```

**Trap**: this reads `process.env` directly — it is *not* passed through Vite's `loadEnv`, so putting `VITE_BASE=...` in a `.env` file does **nothing**. It must be a real shell environment variable set before the build runs.

For subpath hosting (e.g. GitHub Pages at `rgga-16/japanese-trainer`, served from `/japanese-trainer/`):

**PowerShell:**

```powershell
$env:VITE_BASE = "/japanese-trainer/"
npm run build
```

**bash:**

```bash
VITE_BASE=/japanese-trainer/ npm run build
```

The trailing slash matters — `base` is used as-is to prefix every asset URL.

`$env:VITE_BASE` persists for the rest of the PowerShell session once set. Unset it before a later root-domain build, or that build will silently inherit the subpath:

```powershell
Remove-Item Env:VITE_BASE
```

(bash's inline `VAR=... command` form doesn't leak into the shell at all, so nothing to unset there.)

## 5. Deploying

Because routing is **hash-based** (`react-router-dom` with `#/` URLs), no host-side SPA rewrite/redirect rules are ever needed. Every route request resolves to `index.html` at the base path — the part after `#` never reaches the server. Skip any "404 → index.html" rewrite config you may have seen in BrowserRouter guides; it's not applicable here.

### GitHub Pages (primary — `rgga-16/japanese-trainer`)

One-time setup: repo **Settings → Pages → Source → GitHub Actions**.

**Manual push** (build locally, push `dist/` to a `gh-pages` branch):

```powershell
$env:VITE_BASE = "/japanese-trainer/"
npm run build
Remove-Item Env:VITE_BASE
npx gh-pages -d dist
```

(`gh-pages` isn't a project dependency — `npx gh-pages` fetches it on demand. Requires push access to the repo.)

**GitHub Actions** (recommended — builds and deploys on every push to `main`). Save as `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: jlpt-n4-trainer
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm ci
      - run: npm run build
        env:
          VITE_BASE: /japanese-trainer/
      - uses: actions/upload-pages-artifact@v3
        with:
          path: jlpt-n4-trainer/dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Adjust `working-directory` / the artifact `path` if the workflow file lives in a different repo layout than this workspace's (each project here is its own git repo — see the workspace root `CLAUDE.md`). A `.nojekyll` file isn't required with the artifact-based deploy (`upload-pages-artifact` bypasses Jekyll processing) but doesn't hurt if you're carrying one over from an older setup.

### Netlify / Vercel / Cloudflare Pages

All three serve the site at the domain root, so **no `VITE_BASE` needed**, and hash routing means **no rewrite rules needed** either.

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Publish / output directory | `dist` |
| Base directory (if the platform asks) | `jlpt-n4-trainer` |

### Any static host / self-hosting

Upload the contents of `dist/` as-is. The only hard requirement: serve over **HTTPS** (or `localhost` for local testing) — service workers refuse to register over plain HTTP, so the PWA install prompt and offline support silently won't work on an `http://` origin.

## 6. Installing to a phone

### iOS (Safari only)

Safari is the **only** iOS browser that can install a PWA — Chrome/Firefox/Edge on iOS all use Safari's WebKit under the hood but don't expose the install affordance.

1. Open the deployed URL in Safari.
2. Tap **Share** → **Add to Home Screen**.
3. Confirm the name (defaults to the manifest's `short_name`, "N4 Trainer") and tap **Add**.

iOS has historically been aggressive about evicting web storage (including `localStorage`) for installed PWAs under storage pressure, especially if the app goes unused for a while. Since all progress lives in `localStorage`, treat this as real risk on iOS — use the app's backup export feature periodically for anything you'd be upset to lose.

### Android (Chrome)

1. Open the deployed URL in Chrome.
2. Either accept the **install banner/prompt** Chrome shows automatically, or tap the **⋮** menu → **Install app** (wording varies by Chrome version, sometimes "Add to Home screen").

### What "installed" gets you

Per the manifest ([`../vite.config.ts`](../vite.config.ts)): a standalone window with no browser chrome (`display: "standalone"`), locked to portrait orientation (`orientation: "portrait"`), and — once the service worker has cached the app once — full offline functionality.

## 7. Service worker behaviour and updates

`registerType: "autoUpdate"` (see [`../vite.config.ts`](../vite.config.ts)) means: when you deploy a new build, the browser downloads the new service worker in the background on the next visit, but the **currently open tab keeps running the old version**. The new version takes over on the next full load — closing and reopening the tab/app is usually enough; a manual reload sometimes isn't, if the old SW is still controlling the page.

### Hard-resetting during testing

In Chrome/Edge DevTools:

1. **Application → Service Workers → Unregister** (removes the installed SW so the next load registers fresh).
2. **Application → Storage → Clear site data**, if you also want to clear the Workbox cache.

**Warning**: "Clear site data" wipes `localStorage` too — including all trainer progress, since it's the app's only persistence. Use the app's backup export before clearing storage if you want to keep your progress.

## 8. The 5 MiB precache limit

[`../vite.config.ts`](../vite.config.ts) raises Workbox's precache file-size cap:

```ts
maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
```

Workbox's default is 2 MiB. This app's content layer (`src/content/`) compiles into one large chunk with no code splitting, and the grammar/vocab bank keeps growing — at the 2 MiB default, once the main JS bundle crosses that line, Workbox silently **excludes it** from the precache manifest instead of failing the build.

**Symptom if this regresses**: the build succeeds, a warning appears in the `vite build` output about a file being skipped, the app works fine online, but offline it fails to load because the main chunk was never cached. Watch the build output whenever the content bank grows substantially, and raise this constant further if the bundle approaches 5 MiB.

## 9. Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Blank page after deploying to a subpath | `VITE_BASE` wasn't set (or was wrong) at build time, so assets are requested from `/` instead of `/japanese-trainer/` | Rebuild with the correct `VITE_BASE` (§4); check the deployed `index.html`'s asset `<script>`/`<link>` paths |
| Site shows an old version after deploying | Service worker still controlling the tab with the old cache | Close/reopen the tab; or DevTools → Application → Service Workers → Unregister (§7) |
| Service worker never registers / no offline support / no install prompt | Served over plain HTTP | Serve over HTTPS, or test on `localhost` |
| `VITE_BASE` in `.env` has no effect | `vite.config.ts` reads `process.env.VITE_BASE` directly, not via `loadEnv` — `.env` files aren't consulted for this variable | Set it as a real shell env var (§4), not in `.env` |
| Assets 404 after switching between web and native builds | `dist/` is shared by both targets and still holds the other target's output | Re-run the build you actually need: `npm run build` for web, `npm run build:native` (or `npm run sync`) for native |
| A later root-domain build still uses the subpath | `$env:VITE_BASE` persists for the rest of the PowerShell session | `Remove-Item Env:VITE_BASE` before rebuilding (§4) |
