import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./TopBar.module.css";

export default function TopBar({ onNavClick, currentPage, usuarioActivo, actualizarUsuarioActivo }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submenuVisible, setSubmenuVisible] = useState({
    hombre: false,
    mujer: false,
    niños: false,
    marcas: false,
  });
  const menuRef = useRef(null);
  const submenuRefs = {
    hombre: useRef(null),
    mujer: useRef(null),
    niños: useRef(null),
    marcas: useRef(null),
  };
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !menuRef.current?.contains(event.target) &&
        !Object.values(submenuRefs).some(ref => ref.current?.contains(event.target))
      ) {
        setMenuOpen(false);
        setSubmenuVisible({ hombre: false, mujer: false, niños: false, marcas: false });
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("usuarioActivo");
    setMenuOpen(false);
    if (actualizarUsuarioActivo) actualizarUsuarioActivo();
    navigate("/");
  };

  const toggleSubmenu = (key) => {
    setSubmenuVisible(prev => ({
      hombre: false,
      mujer: false,
      niños: false,
      marcas: false,
      [key]: !prev[key],
    }));
  };

  const renderSubmenu = (key, tallas, linkText) => (
    <div className={styles.submenu} ref={submenuRefs[key]}>
      <div className={styles.submenuContent}>
        <div className={styles.submenuSection}>
          <h4>Zapatillas</h4>
          <ul>
            <li>Running</li><li>Urbanas</li><li>Premium</li><li>Chunky</li>
            <li><a href="#">{linkText}</a></li>
            <li><a href="#">Ver Todo Zapatillas</a></li>
          </ul>
        </div>
        <div className={styles.submenuSection}>
          <ul><li>Sandalias</li><li>Jordan</li><li>Fútbol</li><li>Tenis</li></ul>
        </div>
        <div className={styles.submenuSection}>
          <h4>Comprar por Talla</h4>
          <div className={styles.tallas}>
            {tallas.map(t => <div key={t} className={styles.tallaBox}>{t}</div>)}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSubmenuMarcas = () => (
    <div className={styles.submenu} ref={submenuRefs.marcas}>
      <div className={`${styles.submenuContent} ${styles.marcasGrid}`}>
        {["nike", "adidas", "nb", "vans", "on", "asics", "lv", "gucci", "puma", "reebok"].map(marca => (
          <div
            key={marca}
            className={styles.logoContainer}
            onMouseEnter={(e) =>
              (e.currentTarget.querySelector("img").src = `/resources/logos-marcas/${marca}-negro.png`)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.querySelector("img").src = `/resources/logos-marcas/${marca}-blanco.png`)
            }
          >
            <img
              src={`/resources/logos-marcas/${marca}-blanco.png`}
              alt={marca}
              className={styles.marcaLogo}
            />
          </div>
        ))}
        <div className={styles.verTodas}><a href="#">Ver Todo Zapatillas</a></div>
      </div>
    </div>
  );

  return (
    <div className={styles.topBar}>
      <div className={styles.logo} onClick={() => onNavClick("home")}>
        <img src="/resources/logo.png" alt="LacedUp Logo" className={styles.logoImage} />
      </div>

      <nav className={styles.nav}>
        {["hombre", "mujer", "niños", "marcas"].map((key) => (
          <div
            key={key}
            onClick={() => toggleSubmenu(key)}
            className={`${styles.navLink} ${currentPage === key ? styles.active : ""}`}
          >
            {key.toUpperCase()}
          </div>
        ))}

        <input type="search" placeholder="Buscar" className={styles.searchInput} />

        <div className={styles.iconContainer}>
          <img src="/resources/carrito.png" alt="Carrito" className={styles.iconImage} />
          <div className={styles.userIconContainer} ref={menuRef}>
            <img
              src="/resources/user.png"
              alt="Usuario"
              className={styles.iconImage}
              onClick={() => setMenuOpen(!menuOpen)}
            />
            {menuOpen && (
              <div className={styles.dropdownMenu}>
                {usuarioActivo ? (
                  <>
                    <button className={styles.accountBtn}>Mi Cuenta</button>
                    <button className={styles.signoutBtn} onClick={handleLogout}>SIGN OUT</button>
                  </>
                ) : (
                  <>
                    <button className={styles.loginBtn} onClick={() => { setMenuOpen(false); navigate("/login"); }}>LOGIN</button>
                    <button className={styles.signupBtn} onClick={() => { setMenuOpen(false); navigate("/register"); }}>SIGN UP</button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {submenuVisible.hombre && renderSubmenu("hombre", ["6.0","6.5","7.0","7.5","8.0","8.5","9.0","9.5","10.0","10.5","11.0","11.5","12.0","12.5","13.0"], "Ver Todo Hombre")}
      {submenuVisible.mujer && renderSubmenu("mujer", ["5.0","5.5","6.0","6.5","7.0","7.5","8.0","8.5","9.0","9.5","10.0","10.5","11.0","11.5","12.0"], "Ver Todo Mujer")}
      {submenuVisible.niños && renderSubmenu("niños", ["1.0","1.5","2.0","2.5","3.0","3.5","4.0","4.5","5.0"], "Ver Todo Niños")}
      {submenuVisible.marcas && renderSubmenuMarcas()}
    </div>
  );
}
