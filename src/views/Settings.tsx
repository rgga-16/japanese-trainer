import { type ChangeEvent, useRef, useState } from "react";
import Furigana from "../components/Furigana";
import { todayIso } from "../engine/srs";
import { useAppState } from "../state/AppStateContext";
import { exportJson, parseStoredJson } from "../state/storage";

interface ImportMessage {
  kind: "ok" | "error";
  text: string;
}

const FURIGANA_SAMPLE = "日本語[にほんご]を勉強[べんきょう]する";

export default function Settings() {
  const { data, updateSettings, replaceData, resetAll } = useAppState();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importMessage, setImportMessage] = useState<ImportMessage | null>(null);
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
  }

  async function handleImportFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = parseStoredJson(text);
      replaceData(parsed);
      setImportMessage({ kind: "ok", text: "Import successful — your data has been replaced." });
    } catch (err) {
      setImportMessage({
        kind: "error",
        text: err instanceof Error ? `Import failed: ${err.message}` : "Import failed.",
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
        <label className="settings-row">
          <input
            type="checkbox"
            checked={data.settings.showFurigana}
            onChange={(e) => updateSettings({ showFurigana: e.target.checked })}
          />
          <span>Show furigana</span>
          <span className="settings-sample">
            <Furigana text={FURIGANA_SAMPLE} show={data.settings.showFurigana} />
          </span>
        </label>
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
                updateSettings({ reviewCap: Math.min(50, Math.max(5, Math.round(n))) });
              }
            }}
          />
        </label>
      </div>

      <div className="card settings-card">
        <h2>Data</h2>
        <p className="settings-hint">
          Export a backup, restore from one, or wipe everything and start fresh.
        </p>
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
            className={resetArmed ? "settings-reset-btn settings-reset-armed" : "settings-reset-btn"}
            onClick={handleResetClick}
          >
            {resetArmed ? "Click again to confirm reset" : "Reset all data"}
          </button>
        </div>
        {importMessage && (
          <p className={importMessage.kind === "ok" ? "settings-msg-ok" : "settings-msg-error"}>
            {importMessage.text}
          </p>
        )}
      </div>

      <p className="settings-about">
        文法 N4 Trainer runs entirely offline — nothing is ever sent off this device. All
        progress lives in this browser's localStorage; clearing site data or switching browsers
        will lose it unless you export a backup first.
      </p>
    </div>
  );
}
