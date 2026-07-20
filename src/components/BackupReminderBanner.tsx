import { useAppState } from "../state/AppStateContext";
import { shouldShowBackupReminder } from "../state/backup";

/**
 * Dismissible "back up your progress" nudge. Renders nothing when there's
 * no meaningful progress yet, a recent backup exists, or it was recently
 * dismissed (dismissing snoozes it for BACKUP_REMINDER_INTERVAL_DAYS).
 */
export default function BackupReminderBanner() {
  const { data, updateSettings } = useAppState();

  if (!shouldShowBackupReminder(data)) return null;

  return (
    <div className="card backup-banner" role="status">
      <p className="backup-banner-text">
        {data.settings.lastBackupAt
          ? "It's been a while since your last backup. Export your progress in case this browser's data ever gets cleared."
          : "You've built up progress here but never exported a backup. Consider exporting one in case this browser's data ever gets cleared."}
      </p>
      <button
        type="button"
        className="backup-banner-dismiss"
        onClick={() =>
          updateSettings({ backupRemindedAt: new Date().toISOString() })
        }
      >
        Dismiss
      </button>
    </div>
  );
}
