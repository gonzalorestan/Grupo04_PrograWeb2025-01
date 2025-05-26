import React from "react";
import styles from "./SearchResults.module.css";

const dummyData = [
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
];

export default function SearchResults({ query, onShowProduct }) {
  const filtered = dummyData.filter((p) =>
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
