import React from "react";
import styles from "./TopBar.module.css";

export default function TopBar({ onNavClick, currentPage }) {
  const menuItems = ["HOMBRE", "MUJER", "NIÑOS", "MARCAS"];

  return (
    <div className={styles.topBar}>
      <div className={styles.logo} onClick={() => onNavClick("home")}>
        <img
          src="/resources/logo.png"
          alt="LacedUp Logo"
          className={styles.logoImage}
          loading="lazy"
        />
      </div>

      <nav className={styles.nav}>
        {menuItems.map((item) => (
          <div
            key={item}
            onClick={() => onNavClick(item.toLowerCase())}
            className={`${styles.navLink} ${
              currentPage === item.toLowerCase() ? styles.active : ""
            }`}
          >
            {item}
          </div>
        ))}

        <input
          type="search"
          placeholder="Buscar"
          className={styles.searchInput}
          onKeyDown={(e) => {
            if (e.key === "Enter") onNavClick("search", e.target.value);
          }}
          aria-label="Buscar"
        />

        <button
          type="button"
          className={styles.iconButton}
          aria-label="Carrito de compras"
          onClick={() => {
            // Acción futura
          }}
        >
          <img
            src="/resources/carrito.png"
            alt="Carrito"
            className={styles.iconImage}
            loading="lazy"
          />
        </button>

        <button
          type="button"
          className={styles.iconButton}
          aria-label="Usuario"
          onClick={() => {
            // Acción futura
          }}
        >
          <img
            src="/resources/user.png"
            alt="Usuario"
            className={styles.iconImage}
            loading="lazy"
          />
        </button>
      </nav>
    </div>
  );
}
