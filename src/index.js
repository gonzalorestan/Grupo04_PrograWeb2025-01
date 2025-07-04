import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";  // puedes crear un archivo vacío o con estilos globales
import App from "./App";
import { AuthProvider } from "./pages/Context/AuthContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <App />
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
