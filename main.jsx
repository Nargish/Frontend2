import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ProveedorApp } from "./contextos/ContextoApp";
import "./estilos/principal.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ProveedorApp>
    <App />
  </ProveedorApp>
);