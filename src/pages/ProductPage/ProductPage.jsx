import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products";
import styles from "./ProductPage.module.css";

const ProductPage = () => {
  const { genero, categoria } = useParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    categoria: [categoria],
    genero: [genero],
    color: [],
    talla: [],
    marca: [],
  });

  const toggleFilter = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value],
    }));
  };

  const filtered = products.filter((prod) => {
    return (
      (!filters.genero.length || filters.genero.includes(prod.genero)) &&
      (!filters.categoria.length || filters.categoria.includes(prod.categoria)) &&
      (!filters.color.length || filters.color.includes(prod.color)) &&
      (!filters.marca.length || filters.marca.includes(prod.marca)) &&
      (!filters.talla.length || filters.talla.some((t) => prod.stock[t] > 0))
    );
  });

  return (
    <div className={styles.container}>
      <aside className={styles.filtros}>
        <div>
          <h3>Categorías</h3>
          {["Running", "Urbanas", "Premium", "Chunky", "Sandalias", "Jordan", "Fútbol", "Tenis"].map((cat) => (
            <div
              key={cat}
              className={`${styles.filterItem} ${
                filters.categoria.includes(cat.toLowerCase()) ? styles.active : ""
              }`}
              onClick={() => toggleFilter("categoria", cat.toLowerCase())}
            >
              {cat}
            </div>
          ))}
        </div>

        <div>
          <h3>Género</h3>
          {["Hombre", "Mujer", "Niños"].map((gen) => (
            <div
              key={gen}
              className={`${styles.filterItem} ${
                filters.genero.includes(gen.toLowerCase()) ? styles.active : ""
              }`}
              onClick={() => toggleFilter("genero", gen.toLowerCase())}
            >
              {gen}
            </div>
          ))}
        </div>

        <div>
          <h3>Color</h3>
          {["rojo", "azul", "negro", "amarillo", "verde", "naranja", "rosado", "morado", "blanco", "marrón"].map((col) => (
            <div
              key={col}
              className={`${styles.colorBox} ${styles[col]} ${
                filters.color.includes(col) ? styles.activeColor : ""
              }`}
              onClick={() => toggleFilter("color", col)}
            />
          ))}
        </div>

        <div>
          <h3>Talla</h3>
          <div className={styles.tallaGrid}>
            {[
              "6.0", "6.5", "7.0", "7.5", "8.0", "8.5", "9.0", "9.5",
              "10.0", "10.5", "11.0", "11.5", "12.0", "12.5", "13.0",
            ].map((size) => (
              <button
                key={size}
                className={`${styles.tallaItem} ${
                  filters.talla.includes(size) ? styles.activeTalla : ""
                }`}
                onClick={() => toggleFilter("talla", size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3>Marcas</h3>
          {["Nike", "Adidas", "NB", "Vans", "On", "Asics", "Gucci", "LV", "Reebok", "Asics"].map((brand) => (
            <div
              key={brand}
              className={`${styles.filterItem} ${
                filters.marca.includes(brand) ? styles.active : ""
              }`}
              onClick={() => toggleFilter("marca", brand)}
            >
              {brand}
            </div>
          ))}
        </div>
      </aside>

      <main className={styles.catalogo}>
        <h2>
          {categoria.toUpperCase()} - {genero.toUpperCase()}
        </h2>
        <div className={styles.productGrid}>
          {filtered.map((prod) => (
            <div key={prod.id} className={styles.productCard}>
              <img src={prod.imagen} alt={prod.nombre} />
              <h4>{prod.nombre}</h4>
              <p>S/. {prod.precio}</p>
              <button onClick={() => navigate(`/producto/${prod.id}`)}>AGREGAR</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
