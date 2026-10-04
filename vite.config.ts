/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// Two build targets share this config:
//
//   `vite build`                -> web/PWA. Absolute base (overridable via
//                                  VITE_BASE for project-page hosting such as
//                                  GitHub Pages) plus a precaching service
//                                  worker so the site installs and runs offline.
//   `vite build --mode native`  -> Capacitor. Relative base, because the
//                                  WebView loads the bundle from a local
//                                  origin. No service worker: the assets are
//                                  already on-device, and a SW there only adds
//                                  cache-staleness bugs across app updates.
export default defineConfig(({ mode }) => {
  const isNative = mode === "native";

  return {
    base: isNative ? "./" : (process.env.VITE_BASE ?? "/"),
    plugins: [
      react(),
      ...(isNative
        ? []
        : [
            VitePWA({
              registerType: "autoUpdate",
              injectRegister: "auto",
              includeAssets: ["favicon.svg", "apple-touch-icon-180x180.png"],
              manifest: {
                name: "JLPT N4 Trainer",
                short_name: "N4 Trainer",
                description:
                  "Offline JLPT N4 grammar trainer: lessons, exercises, SRS reviews, conjugation drills and mock tests.",
                lang: "en",
                display: "standalone",
                orientation: "portrait",
                background_color: "#10141c",
                theme_color: "#10141c",
                // Relative so they resolve against the manifest's own
                // location, which keeps VITE_BASE subpaths working.
                start_url: "./#/",
                scope: "./",
                icons: [
                  {
                    src: "pwa-192x192.png",
                    sizes: "192x192",
                    type: "image/png",
                  },
                  {
                    src: "pwa-512x512.png",
                    sizes: "512x512",
                    type: "image/png",
                  },
                  {
                    src: "pwa-maskable-512x512.png",
                    sizes: "512x512",
                    type: "image/png",
                    purpose: "maskable",
                  },
                ],
              },
              workbox: {
                globPatterns: ["**/*.{js,css,html,svg,png,ico,woff2}"],
                // The content layer compiles into one large chunk (no code
                // splitting) and the grammar/vocab banks keep growing, so lift
                // the 2 MiB default or the main bundle silently goes
                // un-precached and the app stops working offline.
                maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
                // Hash routing means every route is index.html.
                navigateFallback: "index.html",
              },
            }),
          ]),
    ],
    test: {
      environment: "node",
      include: ["src/**/__tests__/**/*.test.ts"],
    },
  };
});
