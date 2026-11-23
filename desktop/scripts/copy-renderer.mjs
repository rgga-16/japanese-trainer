// Copies the build:native output (../dist) into desktop/app and the icon into desktop/build.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "..", "dist");
const icon = path.join(root, "..", "public", "pwa-512x512.png");

if (!fs.existsSync(path.join(dist, "index.html"))) {
  console.error(`Missing ${path.join(dist, "index.html")} - run "npm run build:native" first.`);
  process.exit(1);
}

fs.rmSync(path.join(root, "app"), { recursive: true, force: true });
fs.cpSync(dist, path.join(root, "app"), { recursive: true });

fs.mkdirSync(path.join(root, "build"), { recursive: true });
fs.copyFileSync(icon, path.join(root, "build", "icon.png"));
console.log("Renderer copied to desktop/app");
