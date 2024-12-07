import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "./styles.css";
import { LangProvider } from "./context/LangContext"; // Importer le LangProvider

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </React.StrictMode>
);
