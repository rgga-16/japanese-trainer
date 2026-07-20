import { type ChangeEvent, useRef, useState } from "react";
import BackupReminderBanner from "../components/BackupReminderBanner";
import Furigana from "../components/Furigana";
import { todayIso } from "../engine/srs";
import { useAppState } from "../state/AppStateContext";
import { exportJson, parseStoredJson } from "../state/storage";
import type { FuriganaMode } from "../state/types";

interface ImportMessage {
  kind: "ok" | "error";
  text: string;
}

const FURIGANA_SAMPLE = "日本語[にほんご]を勉強[べんきょう]する";

const FURIGANA_MODE_OPTIONS: { value: FuriganaMode; label: string }[] = [
  { value: "always", label: "常に表示 (always shown)" },
  { value: "hover", label: "ホバーで表示 (show on hover/tap)" },
  { value: "hidden", label: "非表示 (hidden)" },
];

export default function Settings() {
  const { data, updateSettings, replaceData, resetAll } = useAppState();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importMessage, setImportMessage] = useState<ImportMessage | null>(
    null,
  );
  const [resetArmed, setResetArmed] = useState(false);

  function handleExport() {
    const json = exportJson(data);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `jlpt-n4-trainer-backup-${todayIso()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    updateSettings({ lastBackupAt: new Date().toISOString() });
  }

  async function handleImportFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = parseStoredJson(text);
      replaceData(parsed);
      setImportMessage({
        kind: "ok",
        text: "Import successful — your data has been replaced.",
      });
    } catch (err) {
      setImportMessage({
        kind: "error",
        text:
          err instanceof Error
            ? `Import failed: ${err.message}`
            : "Import failed.",
      });
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function handleResetClick() {
    if (resetArmed) {
      resetAll();
      setResetArmed(false);
      setImportMessage(null);
    } else {
      setResetArmed(true);
    }
  }

  return (
    <div className="settings-root">
      <h1>Settings</h1>

      <div className="card settings-card">
        <h2>Display</h2>
        <fieldset className="settings-furigana-fieldset">
          <legend>Furigana</legend>
          {FURIGANA_MODE_OPTIONS.map((opt) => (
            <label key={opt.value} className="settings-row">
              <input
                type="radio"
                name="furiganaMode"
                value={opt.value}
                checked={data.settings.furiganaMode === opt.value}
                onChange={() => updateSettings({ furiganaMode: opt.value })}
              />
              <span>{opt.label}</span>
            </label>
          ))}
          <span className="settings-sample">
            <Furigana
              text={FURIGANA_SAMPLE}
              mode={data.settings.furiganaMode}
            />
          </span>
        </fieldset>
      </div>

      <div className="card settings-card">
        <h2>Reviews</h2>
        <label className="settings-row">
          <span>Review cap (points per session)</span>
          <input
            type="number"
            min={5}
            max={50}
            value={data.settings.reviewCap}
            onChange={(e) => {
              const n = Number(e.target.value);
              if (Number.isFinite(n)) {
                updateSettings({
                  reviewCap: Math.min(50, Math.max(5, Math.round(n))),
                });
              }
            }}
          />
        </label>
      </div>

      <div className="card settings-card">
        <h2>Data</h2>
        <p className="settings-hint">
          Your progress saves automatically in this browser as you study —
          there's nothing to click. Export creates a backup file you can keep in
          case this browser's data is ever cleared or you switch devices; Import
          restores from one.
        </p>
        <BackupReminderBanner />
        <div className="settings-actions">
          <button type="button" onClick={handleExport}>
            Export data
          </button>
          <button type="button" onClick={() => fileInputRef.current?.click()}>
            Import data
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            className="settings-file-input"
            onChange={handleImportFile}
          />
          <button
            type="button"
            className={
              resetArmed
                ? "settings-reset-btn settings-reset-armed"
                : "settings-reset-btn"
            }
            onClick={handleResetClick}
          >
            {resetArmed ? "Click again to confirm reset" : "Reset all data"}
          </button>
        </div>
        {importMessage && (
          <p
            className={
              importMessage.kind === "ok"
                ? "settings-msg-ok"
                : "settings-msg-error"
            }
          >
            {importMessage.text}
          </p>
        )}
      </div>

      <p className="settings-about">
        文法 N4 Trainer runs entirely offline — nothing is ever sent off this
        device. All progress lives in this browser's localStorage; clearing site
        data or switching browsers will lose it unless you export a backup
        first.
      </p>
    </div>
  );
}
