import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import TopBar from "./components/TopBar/TopBar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import ProductPage from "./pages/ProductPage/ProductPage";
import ProductDetail from "./pages/ProductDetail"; // este ya está suelto
import Carrito from "./pages/Carrito"; // este también está suelto
import Checkout from "./pages/Checkout/Checkout";
import OrdenCompletada from "./pages/OrdenCompletada"; // este está suelto también

export default function App() {
  const [usuarioActivo, setUsuarioActivo] = useState(null);
  const [carrito, setCarrito] = useState([]);
  const [guardados, setGuardados] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("usuarioActivo");
    if (storedUser) {
      setUsuarioActivo(JSON.parse(storedUser));
    }
  }, []);

  const actualizarUsuarioActivo = () => {
    const storedUser = localStorage.getItem("usuarioActivo");
    setUsuarioActivo(storedUser ? JSON.parse(storedUser) : null);
  };

  return (
    <Router>
      <TopBar
        usuarioActivo={usuarioActivo}
        actualizarUsuarioActivo={actualizarUsuarioActivo}
      />
      <main style={{ marginTop: "80px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login actualizarUsuarioActivo={actualizarUsuarioActivo} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/productos/:genero/:categoria" element={<ProductPage />} />
          <Route path="/productos/:genero/:categoria" element={<ProductPage />} />


          <Route path="/producto/:id" element={<ProductDetail setCarrito={setCarrito} setGuardados={setGuardados} />} />
          <Route path="/carrito" element={<Carrito carrito={carrito} setCarrito={setCarrito} guardados={guardados} setGuardados={setGuardados} />} />
          <Route path="/checkout" element={<Checkout carrito={carrito} setCarrito={setCarrito} />} />
          <Route path="/orden-completada" element={<OrdenCompletada />} />
          <Route path="*" element={<h2 style={{ margin: "50px", textAlign: "center" }}>Página no encontrada.</h2>} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}
