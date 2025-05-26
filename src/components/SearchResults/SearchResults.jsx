import React from "react";
import styles from "./SearchResults.module.css";
import products from "../../data/products"; // Ajusta la ruta según tu estructura

export default function SearchResults({ query, onShowProduct }) {
  const filtered = products.filter((p) =>
    p.nombre.toLowerCase().includes(query.toLowerCase())
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
              key={item.id}
              className={styles.resultCard}
              onClick={() => onShowProduct(item)}
            >
              <img src={item.imagen} alt={item.nombre} className={styles.image} />
              <div className={styles.name}>{item.nombre}</div>
              <div className={styles.price}>S/. {item.precio}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
