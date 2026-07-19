import { NavLink, Outlet } from "react-router-dom";

const links = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/lessons", label: "Lessons" },
  { to: "/review", label: "Review" },
  { to: "/drills", label: "Drills" },
  { to: "/mock", label: "Mock Test" },
  { to: "/settings", label: "Settings" },
];

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
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
