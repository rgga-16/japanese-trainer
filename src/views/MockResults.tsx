import { Link } from "react-router-dom";
import { useAppState } from "../state/AppStateContext";

function formatDuration(totalSec: number): string {
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s < 10 ? "0" : ""}${s}`;
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
              <th>Score</th>
              <th>問題1</th>
              <th>問題2</th>
              <th>問題3</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {attempts.map((r) => (
              <tr key={r.at}>
                <td>{new Date(r.at).toLocaleString()}</td>
                <td>
                  {r.score}/{r.max}
                </td>
                <td>
                  {r.perSection.completion.correct}/{r.perSection.completion.total}
                </td>
                <td>
                  {r.perSection.ordering.correct}/{r.perSection.ordering.total}
                </td>
                <td>
                  {r.perSection.cloze.correct}/{r.perSection.cloze.total}
                </td>
                <td>{formatDuration(r.durationSec)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        <Link to="/mock">Take another mock test</Link>
      </p>
    </div>
  );
}
