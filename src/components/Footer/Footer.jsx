import React from "react";
import styles from "./Footer.module.css";

const sections = [
  {
    title: "HOMBRE",
    links: ["Running", "Urbanas", "Premium", "Chunky", "Sandalias", "Jordan", "Fútbol", "Tenis"],
  },
  {
    title: "MUJER",
    links: ["Running", "Urbanas", "Premium", "Chunky", "Sandalias", "Jordan", "Fútbol", "Tenis"],
  },
  {
    title: "NIÑOS",
    links: ["Running", "Urbanas", "Premium", "Chunky", "Sandalias", "Jordan", "Fútbol", "Tenis"],
  },
  {
    title: "SÍGUENOS",
    links: ["📘", "🐦", "📸", "▶️"],
    isIcons: true,
  },
  {
    title: "NOSOTROS",
    links: ["Conócenos", "Responsabilidad Social", "Nuestras Tiendas"],
  },
  {
    title: "POLÍTICAS Y CONDICIONES",
    links: ["Políticas de Datos Personales", "Condición de Promociones", "Términos y Condiciones"],
  },
  {
    title: "ATENCIÓN AL CLIENTE",
    links: ["Atención al Cliente", "Horarios de Atención", "Preguntas Frecuentes"],
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {sections.map(({ title, links, isIcons }, i) => (
        <div key={i} className={styles.footerSection}>
          <div className={styles.sectionTitle}>{title}</div>
          {isIcons ? (
            <div className={styles.iconsContainer}>{links.map((icon, idx) => (
              <span key={idx} className={styles.icon} role="img" aria-label={icon}>
                {icon}
              </span>
            ))}</div>
          ) : (
            links.map((link) => (
              <a key=      {link} href="#" className={styles.footerLink}>
                {link}
              </a>
            ))
          )}
        </div>
      ))}
      <div className={styles.footerCopyright}>
        ©2025 LacedUp Perú SAC, RUC 34935235 Av. 28 de Julio 1011, Miraflores, Lima, Perú
      </div>
    </footer>
  );
}
