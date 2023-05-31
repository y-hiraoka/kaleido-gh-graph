import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "reset-css/reset.css";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Suspense>
      <App />
    </Suspense>
  </React.StrictMode>
);
