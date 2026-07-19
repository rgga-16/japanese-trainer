import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import "./styles/global.css";
import ConjugationDrill from "./views/ConjugationDrill";
import Dashboard from "./views/Dashboard";
import LessonBrowser from "./views/LessonBrowser";
import LessonDetail from "./views/LessonDetail";
import MockResults from "./views/MockResults";
import MockTest from "./views/MockTest";
import PracticeSession from "./views/PracticeSession";
import ReviewSession from "./views/ReviewSession";
import Settings from "./views/Settings";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "lessons", element: <LessonBrowser /> },
      { path: "lessons/:id", element: <LessonDetail /> },
      { path: "practice/:id", element: <PracticeSession /> },
      { path: "review", element: <ReviewSession /> },
      { path: "drills", element: <ConjugationDrill /> },
      { path: "mock", element: <MockTest /> },
      { path: "mock/results", element: <MockResults /> },
      { path: "settings", element: <Settings /> },
    ],
  },
]);

const rootEl = document.getElementById("root");
if (rootEl) {
  createRoot(rootEl).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
