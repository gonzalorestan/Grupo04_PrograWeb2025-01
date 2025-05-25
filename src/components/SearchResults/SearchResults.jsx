import React from "react";
import styles from "./SearchResults.module.css";

// This should be your full product list (best sellers + more)
const allProducts = [
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
  { name: "Lv Trainer Denim", category: "Chunky", price: 799, img: "/resources/LVTrainerDenim.png" },
];

export default function SearchResults({ query, onShowProduct }) {
  const filtered = allProducts.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Resultados para: "{query}"</h2>
      <div className={styles.results}>
        {filtered.length === 0 ? (
          <p>No se encontraron resultados.</p>
        ) : (
          filtered.map((item) => (
            <div
              key={item.name}
              className={styles.resultCard}
              onClick={() => onShowProduct(item)}
            >
              <img src={item.img} alt={item.name} className={styles.image} />
              <div className={styles.name}>{item.name}</div>
              <div className={styles.price}>S/. {item.price}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
