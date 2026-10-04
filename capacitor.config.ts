import type { CapacitorConfig } from "@capacitor/cli";

// `webDir` is produced by `npm run build:native` (vite build --mode native),
// which emits relative asset paths for the WebView origin.
const config: CapacitorConfig = {
  appId: "com.rgeegallega.jlptn4trainer",
  appName: "JLPT N4 Trainer",
  webDir: "dist",
  // Matches --bg in src/styles/global.css so there is no white flash between
  // the splash screen and first paint.
  backgroundColor: "#10141c",
  android: {
    backgroundColor: "#10141c",
  },
  ios: {
    backgroundColor: "#10141c",
  },
};

export default config;
