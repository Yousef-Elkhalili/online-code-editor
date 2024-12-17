import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { makeServer } from "./mirage";
import "./index.css"

if (import.meta.env.MODE === "development") {
  makeServer();
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
