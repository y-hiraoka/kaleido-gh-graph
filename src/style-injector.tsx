import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { StyleInjector } from "./components/StyleInjector";

const root = document.createElement("div");
root.id = "kaliedo-github-graph-root";
document.body.appendChild(root);

createRoot(root).render(
  <StrictMode>
    <Suspense>
      <StyleInjector />
    </Suspense>
  </StrictMode>
);
