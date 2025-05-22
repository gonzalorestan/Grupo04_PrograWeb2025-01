import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import TopBar from "./components/TopBar/TopBar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import SearchResults from "./components/SearchResults/SearchResults";
import ProductDetail from "./components/ProductDetail/ProductDetail";

export default function App() {
  const [usuarioActivo, setUsuarioActivo] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("usuarioActivo");
    if (storedUser) {
      setUsuarioActivo(JSON.parse(storedUser));
    }
  }, []);

  const actualizarUsuarioActivo = () => {
    const storedUser = localStorage.getItem("usuarioActivo");
    if (storedUser) {
      setUsuarioActivo(JSON.parse(storedUser));
    } else {
      setUsuarioActivo(null);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleShowProduct = (product) => {
    setSelectedProduct(product);
  };

  return (
    <Router>
      <>
        <TopBar
          onNavClick={handleSearch}
          usuarioActivo={usuarioActivo}
          actualizarUsuarioActivo={actualizarUsuarioActivo}
        />
        <main>
          <Routes>
            <Route path="/" element={<Home onShowProduct={handleShowProduct} />} />
            <Route path="/login" element={<Login onLogin={actualizarUsuarioActivo} />} />
            <Route path="/register" element={<SignUp onRegister={actualizarUsuarioActivo} />} />
            <Route path="/search" element={<SearchResults query={searchQuery} onShowProduct={handleShowProduct} />} />
            <Route path="/product" element={<ProductDetail product={selectedProduct} />} />
            <Route
              path="*"
              element={
                <h2 style={{ margin: "50px", textAlign: "center" }}>
                  Página no encontrada.
                </h2>
              }
            />
          </Routes>
        </main>
        <Footer />
      </>
    </Router>
  );
}
