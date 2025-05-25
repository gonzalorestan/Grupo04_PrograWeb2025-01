import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import TopBar from "./components/TopBar/TopBar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import SearchResults from "./components/SearchResults/SearchResults";
import ProductDetail from "./pages/ProductDetail";

export default function App() {
  const [usuarioActivo, setUsuarioActivo] = useState(() => {
    const guardado = localStorage.getItem("usuarioActivo");
    return guardado ? JSON.parse(guardado) : null;
  });

  // Search query global state for search page and TopBar
  const [searchQuery, setSearchQuery] = useState("");

  // For showing product detail modal or page
  const [selectedProduct, setSelectedProduct] = useState(null);

  const actualizarUsuarioActivo = (usuario) => {
    if (usuario) {
      localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
      setUsuarioActivo(usuario);
    } else {
      localStorage.removeItem("usuarioActivo");
      setUsuarioActivo(null);
    }
  };

  return (
    <>
      <TopBar
        usuarioActivo={usuarioActivo}
        actualizarUsuarioActivo={actualizarUsuarioActivo}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main style={{ marginTop: "80px" }}>
        <Routes>
          <Route
            path="/"
            element={<Home onShowProduct={setSelectedProduct} />}
          />
          <Route
            path="/search"
            element={
              <SearchResults
                query={searchQuery}
                onShowProduct={setSelectedProduct}
              />
            }
          />
          <Route
            path="/producto/:id"
            element={<ProductDetail product={selectedProduct} />}
          />
          {/* Other routes unchanged */}
        </Routes>
      </main>

      <Footer />

      {/* Modal or detail page fallback */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}
