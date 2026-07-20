import { Link } from "react-router-dom";
import BackupReminderBanner from "../components/BackupReminderBanner";
import Furigana from "../components/Furigana";
import { allGrammarPoints, grammarPointById } from "../content";
import { buildReviewQueue, todayIso } from "../engine/srs";
import { useAppState } from "../state/AppStateContext";
import { readiness, weakestPoints } from "../state/stats";
import "../styles/browse.css";

export default function Dashboard() {
  const { data } = useAppState();
  const furiganaMode = data.settings.furiganaMode;

  const reviewQueue = buildReviewQueue(
    Object.values(data.srs),
    todayIso(),
    data.settings.reviewCap,
  );

  const introducedCount = Object.keys(data.srs).length;
  const totalPoints = allGrammarPoints.length;
  const readinessPct = Math.round(readiness(data) * 100);
  const weakest = weakestPoints(data);
  const recentMocks = [...data.mockResults].slice(-3).reverse();
  const isBrandNew =
    introducedCount === 0 &&
    data.history.length === 0 &&
    data.mockResults.length === 0;

  if (isBrandNew) {
    return (
      <div className="dash-root">
        <h1>Dashboard</h1>
        <div className="card dash-welcome">
          <h2>Welcome to 文法 N4 Trainer</h2>
          <p>
            You haven't studied any grammar points yet. Browse the lesson list
            to pick a point and start practicing — it'll show up here once you
            begin.
          </p>
          <Link to="/lessons" className="browse-btn browse-btn-primary">
            Browse lessons
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="dash-root">
      <h1>Dashboard</h1>

      <BackupReminderBanner />

      <div
        className={`card dash-cta ${reviewQueue.length > 0 ? "dash-cta-due" : "dash-cta-clear"}`}
      >
        {reviewQueue.length > 0 ? (
          <>
            <div className="dash-cta-count">{reviewQueue.length}</div>
            <div className="dash-cta-text">
              <div className="dash-cta-title">
                point{reviewQueue.length === 1 ? "" : "s"} due for review
              </div>
              <Link to="/review" className="browse-btn browse-btn-primary">
                Review now
              </Link>
            </div>
          </>
        ) : (
          <div className="dash-cta-text">
            <div className="dash-cta-title">All caught up ✓</div>
            <p className="dash-cta-sub">No reviews due today. Nice work.</p>
          </div>
        )}
      </div>

      <div className="dash-grid">
        <div className="card dash-stat">
          <div className="dash-stat-value">
            🔥 {data.stats.currentStreak}{" "}
            {data.stats.currentStreak === 1 ? "day" : "days"}
          </div>
          <div className="dash-stat-label">
            current streak · longest {data.stats.longestStreak}
          </div>
        </div>

        <div className="card dash-stat">
          <div className="dash-stat-value">
            {introducedCount} / {totalPoints}
          </div>
          <div className="dash-stat-label">grammar points introduced</div>
        </div>

        <div className="card dash-stat dash-stat-wide">
          <div className="dash-stat-value">{readinessPct}%</div>
          <div className="dash-gauge" aria-hidden="true">
            <div
              className="dash-gauge-fill"
              style={{ width: `${readinessPct}%` }}
            />
          </div>
          <div className="dash-stat-label">
            N4 readiness — grammar-section estimate
          </div>
        </div>
      </div>

      <section className="dash-section">
        <h2>Weakest points</h2>
        {weakest.length === 0 ? (
          <p className="dash-empty">
            Not enough data yet — a point needs at least 5 attempts before it
            shows up here.
          </p>
        ) : (
          <div className="card dash-weakest">
            {weakest.map((w) => {
              const point = grammarPointById.get(w.grammarPointId);
              if (!point) return null;
              return (
                <Link
                  key={w.grammarPointId}
                  to={`/lessons/${w.grammarPointId}`}
                  className="dash-weakest-row"
                >
                  <span className="dash-weakest-title">
                    <Furigana text={point.title} mode={furiganaMode} />
                  </span>
                  <span className="dash-weakest-acc">
                    {Math.round(w.accuracy * 100)}%
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {recentMocks.length > 0 && (
        <section className="dash-section">
          <h2>Recent mock results</h2>
          <div className="card dash-mocks">
            {recentMocks.map((m) => (
              <div key={m.at} className="dash-mock-row">
                <span>{new Date(m.at).toLocaleDateString()}</span>
                <span>
                  {m.score} / {m.max}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
