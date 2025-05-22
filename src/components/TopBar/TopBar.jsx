import React from "react";
import styles from "./TopBar.module.css";

export default function TopBar({ onNavClick, currentPage }) {
  const menuItems = ["HOMBRE", "MUJER", "NIÑOS", "MARCAS"];

  return (
    <div className={styles.topBar}>
      <div className={styles.logo} onClick={() => onNavClick("home")}>
        LACEDUP
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
        />
        <div className={styles.icon}>🛒</div>
        <div className={styles.icon}>👤</div>
      </nav>
    </div>
  );
}
