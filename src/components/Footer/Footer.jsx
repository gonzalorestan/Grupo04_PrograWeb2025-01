import React from "react";
import styles from "./Footer.module.css";

const secciones = [
  {
    titulo: "HOMBRE",
    enlaces: ["Running", "Urbanas", "Premium", "Chunky", "Sandalias", "Jordan", "Fútbol", "Tenis"],
  },
  {
    titulo: "MUJER",
    enlaces: ["Running", "Urbanas", "Premium", "Chunky", "Sandalias", "Jordan", "Fútbol", "Tenis"],
  },
  {
    titulo: "NIÑOS",
    enlaces: ["Running", "Urbanas", "Premium", "Chunky", "Sandalias", "Jordan", "Fútbol", "Tenis"],
  },
  {
    titulo: "SÍGUENOS",
    enlaces: [
      { alt: "Facebook", src: "/resources/fb.png" },
      { alt: "X", src: "/resources/x.png" },
      { alt: "Instagram", src: "/resources/ig.png" },
      { alt: "YouTube", src: "/resources/yt.png" },
    ],
    esIconos: true,
  },
  {
    titulo: "NOSOTROS",
    enlaces: ["Conócenos", "Responsabilidad Social", "Nuestras Tiendas"],
  },
  {
    titulo: "POLÍTICAS Y CONDICIONES",
    enlaces: ["Políticas de Datos Personales", "Condición de Promociones", "Términos y Condiciones"],
  },
  {
    titulo: "ATENCIÓN AL CLIENTE",
    enlaces: ["Atención al Cliente", "Horarios de Atención", "Preguntas Frecuentes"],
  },
];

export default function PieDePagina() {
  return (
    <>
      <div className={styles.redBanner}>
        <div className={styles.redBannerText}>
          ¡ÚNETE AL CLUB PARA NO PERDERTE DE NADA!
        </div>
        <button className={styles.registerButton}>REGÍSTRATE →</button>
      </div>

      <footer className={styles.footer}>
        {secciones.map(({ titulo, enlaces, esIconos }, i) => (
          <div key={i} className={styles.footerSection}>
            <div className={styles.sectionTitle}>{titulo}</div>
            {esIconos ? (
              <div className={styles.iconsContainer}>
                {enlaces.map(({ alt, src }, idx) => (
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
              enlaces.map((enlace) => (
                <a key={enlace} href="#" className={styles.footerLink}>
                  {enlace}
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
