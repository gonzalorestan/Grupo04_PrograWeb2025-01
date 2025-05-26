import React, { useState } from "react";
import styles from "./Home.module.css";

const slides = [
  {
    id: 1,
    title: "JORDAN 1 VARSITY PURPLE",
    description:
      "Inspiradas en el legado clásico de las Air Jordan 1, las Varsity Purple reinventan un ícono con una energía fresca y contemporánea. Con una silueta atemporal y detalles en púrpura vibrant, este modelo rinde homenaje al pasado mientras pisa con fuerza en el presente. Diseñadas para destacar, llevan la esencia del estilo original a nuevas alturas.",
    price: 799,
    img: "/resources/AJN.png",
    bgColor: "#f5e6ff",
  },
  {
    id: 2,
    title: "NIKE AIR MAX PRE-DAY LX",
    description:
      "El Nike Air Max Pro-Day LX renueva los detalles clásicos de la herencia de Nike Running para adaptarlo al ritmo vertiginoso del mundo actual. Confeccionado con al menos un 20% de materiales reciclados en peso, este básico del armario combina la estética retro del atletismo que mejor conoces con una nueva ventana Air que ayuda a energizar el look y la sensación.",
    price: 600,
    img: "/resources/NAMPD-LX.png",
    bgColor: "#f2e1ca",
  },
  {
    id: 3,
    title: "NIKE AIR ZOOM PEGASUS",
    description:
      "Creada para los que viven la velocidad al máximo, la Nike Air Zoom Pegasus combina una sensación ultraligera con la potencia del retorno de energía del Zoom. Su diseño aerodinámico y el ajuste ceñido te dan la seguridad que necesitas para dominar cada zancada. Pensada para rendir en las careras más rápidas, esta silueta redefine lo que significa ir ligero y rápido.",
    price: 850,
    img: "/resources/pegasus.png",
    bgColor: "#d5f2e3",
  },
];

const categoriesData = [
  { title: "Running", img: "/resources/running.png", color: "#ef1e25" },
  { title: "Urbanas", img: "/resources/urbanas.png", color: "#182a5f" },
  { title: "Premium", img: "/resources/premium.png", color: "#0e3a1e" },
  { title: "Chunky", img: "/resources/chunky.png", color: "#000000" },
  { title: "Fútbol", img: "/resources/futbol.png", color: "#024471" },
  { title: "Tenis", img: "/resources/tenis.png", color: "#006b6c" },
  { title: "Jordan", img: "/resources/jordan.png", color: "#8c3f99" },
  { title: "Sandalias", img: "/resources/sandalias.png", color: "#b7a685" },
];

const bestSellersData = [
  { name: "Nike Air Max 90", category: "Running", price: 459, img: "/resources/NikeAirMax90.png" },
  { name: "Nike React Presto", category: "Urbanas", price: 499, img: "/resources/NikeReactPresto.png" },
  { name: "Nike Campus", category: "Running", price: 299, img: "/resources/NikeCampus.png" },
  { name: "Nike Zoom Winflo", category: "Running", price: 679, img: "/resources/NikeZoomWinflo.png" },
  { name: "Nike Air Zoom Structure 20", category: "Running", price: 529, img: "/resources/NikeAirMaxStructure20.png" },
  { name: "Nike Zoom 2K", category: "Chunky", price: 439, img: "/resources/NikeZoom2k.png" },
  { name: "Nike Air Max 2015", category: "Running", price: 519, img: "/resources/NikeAirMax2015.png" },
  { name: "Nike Airmax 2021", category: "Running", price: 489, img: "/resources/NikeAirMax2021.png" },
  { name: "Nike React Flyknit", category: "Running", price: 469, img: "/resources/NikeReactFlyknit.png" },
  { name: "Adidas Supernova", category: "Tenis", price: 599, img: "/resources/AdidasSupernova.png" },
  { name: "Nike Air Max 270", category: "Running", price: 709, img: "/resources/NikeAirmax270.png" },
  { name: "Lv Trainer Denim", category: "Chunky", price: 799, img: "/resources/LVTrainerDenim.png" },
];
export default function Home({ onShowProduct }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentBestSellerSlide, setCurrentBestSellerSlide] = useState(0);

  const bestSellersPerPage = 6;
  const bestSellerSlides = [];
  for (let i = 0; i < bestSellersData.length; i += bestSellersPerPage) {
    bestSellerSlides.push(bestSellersData.slice(i, i + bestSellersPerPage));
  }

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const nextBestSellerSlide = () => setCurrentBestSellerSlide((prev) => (prev + 1) % bestSellerSlides.length);
  const prevBestSellerSlide = () => setCurrentBestSellerSlide((prev) => (prev - 1 + bestSellerSlides.length) % bestSellerSlides.length);

  return (
    <main className={styles.container}>
      {/* Carousel principal */}
      <section className={styles.carousel} style={{ backgroundColor: slides[currentSlide].bgColor }}>
        <button className={`${styles.navButton} ${styles.prev}`} onClick={prevSlide}>‹</button>

        <img src={slides[currentSlide].img} alt={slides[currentSlide].title} className={styles.carouselImage} />

        <div className={styles.carouselText}>
          <h1 className={styles.title}>{slides[currentSlide].title}</h1>
          <p className={styles.description}>{slides[currentSlide].description}</p>
          <div className={styles.priceBuy}>
            <div className={styles.price}>S/. {slides[currentSlide].price}</div>
            <button className={styles.buyButton} onClick={() => onShowProduct(slides[currentSlide])}>
              COMPRAR
            </button>
          </div>
        </div>

        <button className={`${styles.navButton} ${styles.next}`} onClick={nextSlide}>›</button>

        <div className={styles.indicators}>
          {slides.map((_, idx) => (
            <span key={idx} className={`${styles.indicator} ${idx === currentSlide ? styles.activeIndicator : ""}`} onClick={() => setCurrentSlide(idx)} />
          ))}
        </div>
      </section>

      {/* Categorías en grid */}
      <section className={styles.categoriesGridSection}>
        <h2 className={styles.exploreTitle}>EXPLORA LAS CATEGORIAS</h2>
        <div className={styles.categoriesGrid}>
          {categoriesData.map((cat) => (
            <div key={cat.title} className={styles.categoryCard} title={cat.title}>
              <div className={styles.categoryBackground} style={{ backgroundColor: hexToRGBA(cat.color, 0.3) }} />
              <img src={cat.img} alt={cat.title} className={styles.categoryImage} />
              <span className={styles.categoryTitle}>{cat.title}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Lo más vendido con paginación */}
      <section className={styles.bestSellersSection}>
        <h2 className={styles.sectionTitle}>LO MÁS VENDIDO</h2>
        <div className={styles.bestSellersCarousel}>
          <button className={styles.bestSellerNav} onClick={prevBestSellerSlide}>‹</button>
          <div className={styles.bestSellers}>
            {bestSellerSlides[currentBestSellerSlide].map((item) => (
              <div key={item.name} className={styles.bestSellerCard} onClick={() => onShowProduct(item)}>
                <img src={item.img} alt={item.name} className={styles.bestSellerImage} />
                <div className={styles.bestSellerName}>{item.name}</div>
                <div className={styles.bestSellerCategory}>{item.category}</div>
                <div className={styles.bestSellerPrice}>S/. {item.price}</div>
                <button className={styles.bestSellerButton}>AGREGAR</button>
              </div>
            ))}
          </div>
          <button className={styles.bestSellerNav} onClick={nextBestSellerSlide}>›</button>
        </div>
      </section>
    </main>
  );
}

function hexToRGBA(hex, alpha) {
  let r = 0, g = 0, b = 0;
  if (hex.charAt(0) === "#") hex = hex.slice(1);
  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 6) {
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  }
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
