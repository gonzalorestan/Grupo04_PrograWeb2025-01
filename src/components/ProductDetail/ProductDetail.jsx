import React from "react";
import styles from "./ProductDetail.module.css";

export default function ProductDetail({ product }) {
  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <img src={product.img} alt={product.name} className={styles.image} />
      </div>
      <div className={styles.infoSection}>
        <h2 className={styles.name}>{product.name}</h2>
        <p className={styles.category}>Categoría: {product.category}</p>
        <p className={styles.price}>Precio: S/. {product.price}</p>
        <button className={styles.addButton}>AGREGAR AL CARRITO</button>
      </div>
    </div>
  );
}
