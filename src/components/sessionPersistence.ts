// Mid-session persistence helpers: sessionStorage-backed so navigating away
// (e.g. to Settings) and back resumes the same question at the same index,
// instead of unmounting SessionRunner / re-seeding the exercise queue.
//
// Two independent records per session:
//   - the "run" record (index/results/feedback/finished), owned by SessionRunner
//   - the "queue" record (the built Exercise[]), owned by the view that builds it
//
// Both are namespaced under the same session key so a view and SessionRunner
// agree on what session they're resuming, but they're stored as separate
// sessionStorage entries so each owner can read/write/clear its own shape
// without knowing about the other's.

const RUN_PREFIX = "jlpt-n4-trainer-session:";
const QUEUE_PREFIX = "jlpt-n4-trainer-session-queue:";

function runKey(sessionKey: string): string {
  return `${RUN_PREFIX}${sessionKey}`;
}

function queueKey(sessionKey: string): string {
  return `${QUEUE_PREFIX}${sessionKey}`;
}

/** Parse JSON from sessionStorage, tolerating missing/corrupt entries. */
function readJson<T>(key: string): T | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function writeJson(key: string, value: unknown): void {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    // sessionStorage unavailable/full: persistence is best-effort, never fatal.
  }
}

function removeKey(key: string): void {
  try {
    sessionStorage.removeItem(key);
  } catch {
    // ignore
  }
}

export function loadRunRecord<T>(sessionKey: string): T | null {
  return readJson<T>(runKey(sessionKey));
}

export function saveRunRecord(sessionKey: string, value: unknown): void {
  writeJson(runKey(sessionKey), value);
}

export function clearRunRecord(sessionKey: string): void {
  removeKey(runKey(sessionKey));
}

export function loadQueueRecord<T>(sessionKey: string): T | null {
  return readJson<T>(queueKey(sessionKey));
}

export function saveQueueRecord(sessionKey: string, value: unknown): void {
  writeJson(queueKey(sessionKey), value);
}

export function clearQueueRecord(sessionKey: string): void {
  removeKey(queueKey(sessionKey));
}
