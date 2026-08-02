import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { AppStateProvider } from "./state/AppStateContext";
import "./styles/global.css";
import Dashboard from "./views/Dashboard";
import DrillHub from "./views/DrillHub";
import LessonBrowser from "./views/LessonBrowser";
import LessonDetail from "./views/LessonDetail";
import MockResults from "./views/MockResults";
import MockTest from "./views/MockTest";
import PracticeSession from "./views/PracticeSession";
import ReadingView from "./views/ReadingView";
import ReviewSession from "./views/ReviewSession";
import Settings from "./views/Settings";
import TestOut from "./views/TestOut";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "lessons", element: <LessonBrowser /> },
      { path: "lessons/:id", element: <LessonDetail /> },
      { path: "practice/:id", element: <PracticeSession /> },
      { path: "testout/:id", element: <TestOut /> },
      { path: "review", element: <ReviewSession /> },
      { path: "drills", element: <DrillHub /> },
      { path: "drills/:drillId", element: <DrillHub /> },
      { path: "reading", element: <ReadingView /> },
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
      <AppStateProvider>
        <RouterProvider router={router} />
      </AppStateProvider>
    </StrictMode>,
  );
}
