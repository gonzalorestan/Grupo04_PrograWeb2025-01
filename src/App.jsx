import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import TopBar from "./components/TopBar/TopBar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

export default function App() {
  const [page, setPage] = useState("home");
  const [usuarioActivo, setUsuarioActivo] = useState(null);

  // Cargar sesión al iniciar la app
  useEffect(() => {
    const storedUser = localStorage.getItem("usuarioActivo");
    if (storedUser) {
      setUsuarioActivo(JSON.parse(storedUser));
    } else {
      setUsuarioActivo(null);
    }
  }, []);

  const handleNavClick = (page) => {
    setPage(page);
  };

  // Se llama desde SignUp y Login para actualizar el menú
  const actualizarUsuarioActivo = () => {
    const storedUser = localStorage.getItem("usuarioActivo");
    if (storedUser) {
      setUsuarioActivo(JSON.parse(storedUser));
    } else {
      setUsuarioActivo(null);
    }
  };

  return (
    <Router>
      <TopBar
        onNavClick={handleNavClick}
        currentPage={page}
        usuarioActivo={usuarioActivo}
        actualizarUsuarioActivo={actualizarUsuarioActivo}
      />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={actualizarUsuarioActivo} />} />
          <Route path="/register" element={<SignUp onRegister={actualizarUsuarioActivo} />} />

          {/* Ruta comodín por si hay páginas no controladas */}
          <Route
            path="*"
            element={
              page !== "home" && page !== "search" ? (
                <h2 style={{ margin: "50px", textAlign: "center" }}>
                  Contenido de la página: {page}
                </h2>
              ) : null
            }
          />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}
