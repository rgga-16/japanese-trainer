import { Link } from "react-router-dom";
import { CONTENT_REVISION } from "../content";
import { MOCK_SECTION_LABELS, MOCK_SECTION_ORDER } from "../engine/mockBuilder";
import { useAppState } from "../state/AppStateContext";
import { mockFormatLabel, mockResultLevel } from "../state/mockLabels";
import type { MockResult } from "../state/types";

function formatDuration(totalSec: number): string {
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

function isStale(r: MockResult): boolean {
  return r.contentRevision !== undefined && r.contentRevision !== CONTENT_REVISION;
}

export default function MockResults() {
  const { data } = useAppState();
  const attempts = [...data.mockResults].sort((a, b) => b.at.localeCompare(a.at));

  if (attempts.length === 0) {
    return (
      <div className="mock-results-empty card">
        <p>You haven&apos;t taken a mock test yet.</p>
        <Link to="/mock">Start a mock test</Link>
      </div>
    );
  }

  return (
    <div className="mock-results">
      <h1>Mock Test History</h1>
      <div className="mock-table-wrap">
        <table className="mock-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Level</th>
              <th>Format</th>
              <th>Score</th>
              {MOCK_SECTION_ORDER.map((key) => (
                <th key={key}>{MOCK_SECTION_LABELS[key]}</th>
              ))}
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {attempts.map((r, i) => {
              const stale = r.paperId !== undefined && isStale(r);
              return (
                <tr
                  // biome-ignore lint/suspicious/noArrayIndexKey: `at` alone can collide when malformed records both backfill to the epoch; index disambiguates a static, non-reordered list
                  key={`${r.at}-${i}`}
                  className={r.paperId ? "mock-table-row-paper" : undefined}
                >
                  <td>{new Date(r.at).toLocaleString()}</td>
                  <td>{mockResultLevel(r)}</td>
                  <td>
                    {mockFormatLabel(r)}
                    {stale && (
                      <span
                        className="mock-table-stale"
                        title="This paper's questions have changed since this attempt (content bank updated)."
                      >
                        {" "}
                        ⚠
                      </span>
                    )}
                  </td>
                  <td>
                    {r.score}/{r.max}
                  </td>
                  {MOCK_SECTION_ORDER.map((key) => {
                    const section = r.perSection[key];
                    return (
                      <td key={key}>
                        {section ? `${section.correct}/${section.total}` : "—"}
                      </td>
                    );
                  })}
                  <td>{formatDuration(r.durationSec)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p>
        <Link to="/mock">Take another mock test</Link>
      </p>
    </div>
  );
}
