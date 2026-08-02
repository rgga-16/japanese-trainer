import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAppState } from "./state/AppStateContext";

const links = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/lessons", label: "Lessons" },
  { to: "/review", label: "Review" },
  { to: "/drills", label: "Drills" },
  { to: "/reading", label: "Reading" },
  { to: "/mock", label: "Mock Test" },
  { to: "/settings", label: "Settings" },
];

/** Unobtrusive "your progress auto-saves" status, with a brief flash after each save. */
function SavedIndicator() {
  const { lastSavedAt } = useAppState();
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    if (!lastSavedAt) return;
    setJustSaved(true);
    const t = setTimeout(() => setJustSaved(false), 2500);
    return () => clearTimeout(t);
  }, [lastSavedAt]);

  const title = lastSavedAt
    ? `Last saved ${new Date(lastSavedAt).toLocaleTimeString()}`
    : "Progress saves automatically in this browser";

  return (
    <span
      className={
        justSaved
          ? "app-saved-indicator app-saved-flash"
          : "app-saved-indicator"
      }
      title={title}
    >
      ✓ 自動保存 <span className="app-saved-sub">auto-saved</span>
    </span>
  );
}

export default function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <span className="app-logo">
          文法<span className="app-logo-sub">N4 Trainer</span>
        </span>
        <nav className="app-nav">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                isActive ? "nav-link nav-link-active" : "nav-link"
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <SavedIndicator />
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
