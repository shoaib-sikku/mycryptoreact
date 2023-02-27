import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style/index.scss";
import "./style/responsive.scss";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export const server = "https://api.coingecko.com";
