import React, { useState } from "react";
import TopBar from "./components/TopBar/TopBar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";

export default function App() {
  const [page, setPage] = useState("home");

  const handleNavClick = (page, query) => {
    setPage(page);
  };

  return (
    <>
      <TopBar onNavClick={handleNavClick} currentPage={page} />
      <main>
        {page === "home" && <Home />}
        {page !== "home" && page !== "search" && (
          <h2 style={{ margin: "50px", textAlign: "center" }}>
            Contenido de la página: {page}
          </h2>
        )}
        {/* Si agregas más componentes, puedes ampliar esta lógica */}
      </main>
      <Footer />
    </>
  );
}
