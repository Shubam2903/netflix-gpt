import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <App />
  // </StrictMode>,  // we have comment this  because when we are calling our nowplaying movie api then all the api are coming twice because of this strict mode .Hence , we have commented this and the issue is then fixed.
);
