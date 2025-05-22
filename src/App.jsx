import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import TopBar from "./components/TopBar/TopBar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProductPage from "./pages/ProductPage";
import ProductDetail from "./pages/ProductDetail";
import Carrito from "./pages/Carrito";
import Checkout from "./pages/Checkout";
import OrdenCompletada from "./pages/OrdenCompletada"; 

export default function App() {
  const [page, setPage] = useState("home");
  const [usuarioActivo, setUsuarioActivo] = useState(null);

  
  const [carrito, setCarrito] = useState([]);
  const [guardados, setGuardados] = useState([]);

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuarioActivo");
    if (usuarioGuardado) {
      setUsuarioActivo(JSON.parse(usuarioGuardado));
    }
  }, []);

  const handleNavClick = (pagina) => {
    setPage(pagina);
  };

  const actualizarUsuarioActivo = () => {
    const usuario = localStorage.getItem("usuarioActivo");
    setUsuarioActivo(usuario ? JSON.parse(usuario) : null);
  };

  return (
    <Router>
      <TopBar
        onNavClick={handleNavClick}
        currentPage={page}
        usuarioActivo={usuarioActivo}
        actualizarUsuarioActivo={actualizarUsuarioActivo}
      />
      <main style={{ marginTop: "80px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={<Login actualizarUsuarioActivo={actualizarUsuarioActivo} />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/productos/:genero/:categoria" element={<ProductPage />} />

          {/* ✅ Página de detalle de producto */}
          <Route
            path="/producto/:id"
            element={
              <ProductDetail
                setCarrito={setCarrito}
                setGuardados={setGuardados}
              />
            }
          />

          {/* ✅ Página de carrito */}
          <Route
            path="/carrito"
            element={
              <Carrito
                carrito={carrito}
                setCarrito={setCarrito}
                guardados={guardados}
                setGuardados={setGuardados}
              />
            }
          />

          {/* ✅ Página de checkout */}
          <Route
            path="/checkout"
            element={
              <Checkout
                carrito={carrito}
                setCarrito={setCarrito}
              />
            }
          />

          
          <Route path="/orden-completada" element={<OrdenCompletada />} />

          {/* Página por defecto si no existe ruta */}
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
