// Platform-aware backup file delivery. On the web, `a.download` + a Blob URL
// triggers a normal browser download. Inside a Capacitor WebView there is no
// user-visible downloads folder and `a.download` is a no-op (iOS) or
// unreliable (Android), so the file is written to app cache and handed to
// the OS share sheet instead, letting the user save it to Files/Drive/etc.

import { Capacitor } from "@capacitor/core";
import { Directory, Encoding, Filesystem } from "@capacitor/filesystem";
import { Share } from "@capacitor/share";

export type BackupSaveResult = "saved" | "cancelled";

/** Substrings seen in Share plugin rejection messages when the user simply
 * dismisses the native share sheet, across iOS/Android/web fallbacks. */
const SHARE_CANCEL_PATTERNS = ["cancel", "abort"];

function isShareCancellation(err: unknown): boolean {
  const message = err instanceof Error ? err.message : String(err);
  const lower = message.toLowerCase();
  return SHARE_CANCEL_PATTERNS.some((pattern) => lower.includes(pattern));
}

async function saveBackupFileNative(
  json: string,
  filename: string,
): Promise<BackupSaveResult> {
  await Filesystem.writeFile({
    path: filename,
    data: json,
    directory: Directory.Cache,
    encoding: Encoding.UTF8,
  });
  const { uri } = await Filesystem.getUri({
    path: filename,
    directory: Directory.Cache,
  });
  try {
    await Share.share({
      title: filename,
      text: "JLPT N4 Trainer backup",
      files: [uri],
    });
    return "saved";
  } catch (err) {
    if (isShareCancellation(err)) return "cancelled";
    throw err;
  }
}

function saveBackupFileWeb(json: string, filename: string): BackupSaveResult {
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
  return "saved";
}

/** Delivers a backup file to the user, branching on native vs. web. */
export async function saveBackupFile(
  json: string,
  filename: string,
): Promise<BackupSaveResult> {
  if (Capacitor.isNativePlatform()) {
    return saveBackupFileNative(json, filename);
  }
  return saveBackupFileWeb(json, filename);
}
