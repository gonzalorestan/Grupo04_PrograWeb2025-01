import React, { useState } from "react";
import TopBar from "./components/TopBar/TopBar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import SearchResults from "./components/SearchResults/SearchResults";
import ProductDetail from "./components/ProductDetail/ProductDetail";

export default function App() {
  const [page, setPage] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleNavClick = (page, query = "") => {
    if (page === "search") {
      setSearchQuery(query);
    }
    setPage(page);
  };

  const handleShowProduct = (product) => {
    setSelectedProduct(product);
    setPage("product");
  };

  return (
    <>
      <TopBar onNavClick={handleNavClick} currentPage={page} />
      <main>
        {page === "home" && <Home onShowProduct={handleShowProduct} />}
        {page === "search" && <SearchResults query={searchQuery} onShowProduct={handleShowProduct} />}
        {page === "product" && selectedProduct && (
          <ProductDetail product={selectedProduct} />
        )}
        {page !== "home" && page !== "search" && page !== "product" && (
          <h2 style={{ margin: "50px", textAlign: "center" }}>
            Contenido de la página: {page}
          </h2>
        )}
      </main>
      <Footer />
    </>
  );
}
