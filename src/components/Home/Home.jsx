import React, { useState, useRef } from "react";
import styles from "./Home.module.css";

const slides = [
  {
    id: 1,
    title: "JORDAN 1 VARSITY PURPLE",
    description:
      "Inspiradas en el legado clásico de las Air Jordan 1, las Varsity Purple reinventan un ícono con una energía fresca y contemporánea. Con una silueta atemporal y detalles en púrpura vibrante, este modelo rinde homenaje al pasado mientras pisa con fuerza en el presente. Diseñadas para destacar, llevan la esencia del estilo original a nuevas alturas.",
    price: 799,
    img: "/resources/AJN.png",
    bgColor: "#f5e6ff",
  },
  {
    id: 2,
    title: "NIKE AIR MAX PRE-DAY LX",
    description:
      "El Nike Air Max Pro-Day LX renueva los detalles clásicos de la herencia de Nike Running para adaptarlo al ritmo vertiginoso del mundo actual. Confeccionado con al menos un 20% de materiales reciclados en peso, este básico del armario combina la estética retro del atletismo que mejor conoces con una nueva ventana Air que ayuda a energizar el look y la sensación",
    price: 600,
    img: "/resources/NAMPD-LX.png",
    bgColor: "#f2e1ca",
  },
  {
    id: 3,
    title: "NIKE AIR ZOOM PEGASUS",
    description:
      "Creada para los que viven la velocidad al máximo, la Nike Air Zoom Pegasus combina una sensación ultraligera con la potencia del retorno de energía del Zoom. Su diseño aerodinámico y el ajuste ceñido te dan la seguridad que necesitas para dominar cada zancada. Pensada para rendir en las carreras más rápidas, esta silueta redefine lo que significa ir ligero y rápido.",
    price: 850,
    img: "/resources/pegasus.png",
    bgColor: "#d5f2e3",
  },
];

const categoriesData = [
  {
    title: "Running",
    img: "/resources/running.png",
  },
  {
    title: "Urbanas",
    img: "/resources/urbanas.png",
  },
  {
    title: "Premium",
    img: "/resources/premium.png",
  },
  {
    title: "Chunky",
    img: "/resources/chunky.png",
  },
];

const moreCategories = [
  {
    title: "Fútbol",
    img: "/resources/futbol.png",
  },
  {
    title: "Tenis",
    img: "/resources/tenis.png",
  },
  {
    title: "Jordan",
    img: "/resources/jordan.png",
  },
  {
    title: "Sandalias",
    img: "/resources/sandalias.png",
  },
];

const bestSellersData = [
  {
    name: "Nike Air Max 90",
    category: "Running",
    price: 459,
    img: "/resources/NikeAirMax90.png",
  },
  {
    name: "Nike React Presto",
    category: "Urbanas",
    price: 499,
    img: "/resources/NikeReactPresto.png",
  },
  {
    name: "Nike Campus",
    category: "Running",
    price: 299,
    img: "/resources/NikeCampus.png",
  },
  {
    name: "Nike Zoom Winflo",
    category: "Running",
    price: 679,
    img: "/resources/NikeZoomWinflo.png",
  },
  {
    name: "Nike Air Zoom Structure 20",
    category: "Running",
    price: 529,
    img: "/resources/NikeAirMaxStructure20.png",
  },
  {
    name: "Nike Zoom 2K",
    category: "Chunky",
    price: 439,
    img: "/resources/NikeZoom2k.png",
  },
];

export default function Home({ onShowProduct }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [categoryTab, setCategoryTab] = useState("default");
  const categoriesRef = useRef(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const scrollCategories = (direction) => {
    if (categoriesRef.current) {
      const scrollAmount = 160; // ancho + gap aproximado de cada card
      if (direction === "left") {
        categoriesRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        categoriesRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  return (
    <main className={styles.container}>
      {/* Carousel principal */}
      <section
        className={styles.carousel}
        style={{ backgroundColor: slides[currentSlide].bgColor || "#ccc" }}
      >
        <button
          className={`${styles.navButton} ${styles.prev}`}
          onClick={prevSlide}
          aria-label="Previous Slide"
        >
          ‹
        </button>

        <img
          src={slides[currentSlide].img}
          alt={slides[currentSlide].title}
          className={styles.carouselImage}
        />

        <div className={styles.carouselText}>
          <h1 className={styles.title}>{slides[currentSlide].title}</h1>
          <p className={styles.description}>{slides[currentSlide].description}</p>
          <div className={styles.priceBuy}>
            <div className={styles.price}>S/. {slides[currentSlide].price}</div>
            <button
              className={styles.buyButton}
              onClick={() => onShowProduct(slides[currentSlide])}
            >
              COMPRAR
            </button>
          </div>
        </div>

        <button
          className={`${styles.navButton} ${styles.next}`}
          onClick={nextSlide}
          aria-label="Next Slide"
        >
          ›
        </button>

        <div className={styles.indicators}>
          {slides.map((_, idx) => (
            <span
              key={idx}
              className={`${styles.indicator} ${
                idx === currentSlide ? styles.activeIndicator : ""
              }`}
              onClick={() => setCurrentSlide(idx)}
            />
          ))}
        </div>
      </section>

      {/* Explora las categorías como carousel con tabs */}
      <div className={styles.categoriesSection}>
        <div className={styles.exploreTitle}>EXPLORA LAS CATEGORIAS</div>

        <div className={styles.tabButtons}>
          <button
            className={categoryTab === "default" ? styles.activeTab : ""}
            onClick={() => setCategoryTab("default")}
          >
            Principales
          </button>
          <button
            className={categoryTab === "more" ? styles.activeTab : ""}
            onClick={() => setCategoryTab("more")}
          >
            Más categorías
          </button>
        </div>

        <button
          className={`${styles.carouselNavButton} ${styles.carouselNavPrev}`}
          onClick={() => scrollCategories("left")}
          aria-label="Scroll left"
        >
          ‹
        </button>

        <div
          className={styles.categoriesCarousel}
          ref={categoriesRef}
        >
          {(categoryTab === "default" ? categoriesData : moreCategories).map((cat) => (
            <div key={cat.title} className={styles.categoryCard} title={cat.title}>
              <img src={cat.img} alt={cat.title} className={styles.categoryImage} />
              <span className={styles.categoryTitle}>{cat.title}</span>
            </div>
          ))}
        </div>

        <button
          className={`${styles.carouselNavButton} ${styles.carouselNavNext}`}
          onClick={() => scrollCategories("right")}
          aria-label="Scroll right"
        >
          ›
        </button>
      </div>

      {/* Lo más vendido */}
      <section>
        <h2 className={styles.sectionTitle}>LO MÁS VENDIDO</h2>
        <div className={styles.bestSellers}>
          {bestSellersData.map((item) => (
            <div
              key={item.name}
              className={styles.bestSellerCard}
              onClick={() => onShowProduct(item)}
              title={item.name}
            >
              <img src={item.img} alt={item.name} className={styles.bestSellerImage} />
              <div className={styles.bestSellerName}>{item.name}</div>
              <div className={styles.bestSellerCategory}>{item.category}</div>
              <div className={styles.bestSellerPrice}>S/. {item.price}</div>
              <button className={styles.bestSellerButton}>AGREGAR</button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
