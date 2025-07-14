import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./pages/Context/AuthContext";
import { ProveedorCategoria } from "./pages/Context/ContextoCategoria";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProveedorCategoria>
          <App />
        </ProveedorCategoria>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
