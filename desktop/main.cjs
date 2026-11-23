// Electron shell: serves the build:native bundle over app://jlpt and opens it in one window.
const path = require("node:path");
const { pathToFileURL } = require("node:url");
const { app, BrowserWindow, net, protocol, shell } = require("electron");

const ORIGIN = "app://jlpt/";
const APP_DIR = path.join(__dirname, "app");
let win = null;

protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { standard: true, secure: true, supportFetchAPI: true } },
]);

const isWeb = (url) => /^https?:\/\//i.test(url);

function createWindow() {
  win = new BrowserWindow({
    width: 1100,
    height: 800,
    minWidth: 380,
    minHeight: 560,
    backgroundColor: "#10141c",
    autoHideMenuBar: true,
    title: "JLPT N4 Trainer",
    show: false,
    webPreferences: { contextIsolation: true, sandbox: true, nodeIntegration: false },
  });
  win.once("ready-to-show", () => win.show());
  win.on("closed", () => {
    win = null;
  });

  // External links go to the system browser; the window never leaves the app origin.
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (isWeb(url)) shell.openExternal(url);
    return { action: "deny" };
  });
  win.webContents.on("will-navigate", (event, url) => {
    if (url.startsWith(ORIGIN)) return;
    event.preventDefault();
    if (isWeb(url)) shell.openExternal(url);
  });

  win.loadURL(`${ORIGIN}index.html`);
}

if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on("second-instance", () => {
    if (!win) return;
    if (win.isMinimized()) win.restore();
    win.focus();
  });

  app.whenReady().then(() => {
    protocol.handle("app", (req) => {
      const { pathname } = new URL(req.url);
      const rel = decodeURIComponent(pathname).replace(/^\/+/, "") || "index.html";
      const file = path.resolve(APP_DIR, rel);
      // Reject anything that resolves outside the app directory.
      if (file !== APP_DIR && !file.startsWith(APP_DIR + path.sep)) {
        return new Response("Not found", { status: 404 });
      }
      return net.fetch(pathToFileURL(file).toString());
    });
    createWindow();
  });

  app.on("window-all-closed", () => app.quit());
}
