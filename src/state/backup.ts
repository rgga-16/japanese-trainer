// Pure logic for the "you haven't backed up in a while" reminder banner.
// Kept separate from AppStateContext/Settings so it's easy to unit test.

import type { AppSettings, StoredData } from "./types";

export const BACKUP_REMINDER_INTERVAL_DAYS = 14;

function daysSince(iso: string, now: Date): number {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return Number.POSITIVE_INFINITY;
  return (now.getTime() - then) / 86_400_000;
}

/** True once the learner has anything worth losing (SRS state or history). */
export function hasMeaningfulProgress(data: StoredData): boolean {
  return Object.keys(data.srs).length > 0 || data.history.length > 0;
}

/**
 * True when a backup reminder should be shown: there's progress to lose,
 * the user has never exported (or it's been a while), and they haven't
 * dismissed the reminder within the snooze window.
 */
export function shouldShowBackupReminder(
  data: StoredData,
  now: Date = new Date(),
): boolean {
  if (!hasMeaningfulProgress(data)) return false;
  const { lastBackupAt, backupRemindedAt }: AppSettings = data.settings;
  const needsBackup =
    !lastBackupAt ||
    daysSince(lastBackupAt, now) > BACKUP_REMINDER_INTERVAL_DAYS;
  if (!needsBackup) return false;
  if (
    backupRemindedAt &&
    daysSince(backupRemindedAt, now) < BACKUP_REMINDER_INTERVAL_DAYS
  ) {
    return false;
  }
  return true;
}
