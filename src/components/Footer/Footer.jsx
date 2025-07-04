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
    links: [
      { alt: "Facebook", src: "/resources/fb.png" },
      { alt: "X", src: "/resources/x.png" },
      { alt: "Instagram", src: "/resources/ig.png" },
      { alt: "YouTube", src: "/resources/yt.png" },
    ],
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
    <>
      <div className={styles.redBanner}>
        <div className={styles.redBannerText}>
          ¡ÚNETE AL CLUB PARA NO PERDERTE DE NADA!
        </div>
        <button className={styles.registerButton}>REGÍSTRATE →</button>
      </div>

      <footer className={styles.footer}>
        {sections.map(({ title, links, isIcons }, i) => (
          <div key={i} className={styles.footerSection}>
            <div className={styles.sectionTitle}>{title}</div>
            {isIcons ? (
              <div className={styles.iconsContainer}>
                {links.map(({ alt, src }, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={alt}
                    className={styles.iconImage}
                    loading="lazy"
                  />
                ))}
              </div>
            ) : (
              links.map((link) => (
                <a key={link} href="#" className={styles.footerLink}>
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
    </>
  );
}
