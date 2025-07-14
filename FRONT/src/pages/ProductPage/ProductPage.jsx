import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import products from "../../data/products"; // from data folder
import styles from "./ProductPage.module.css";

const ProductPage = () => {
  const { genero, categoria, marca } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Leer talla desde query string
  function getQueryParam(param) {
    const params = new URLSearchParams(location.search);
    return params.get(param);
  }

  const tallaQuery = getQueryParam("talla");

  const generosValidos = ["hombre", "mujer", "niños"];

  const isGenero = genero && generosValidos.includes(genero.toLowerCase());
  const isCategoria = genero && !isGenero;

  const [filters, setFilters] = useState({
    categoria: (categoria ? [categoria.toLowerCase()] : (isCategoria ? [genero.toLowerCase()] : [])),
    genero: isGenero ? [genero] : [],
    color: [],
    talla: tallaQuery ? [tallaQuery] : [],
    marca: marca ? [capitalize(marca)] : [],
  });

  // Capitaliza la marca para que coincida con el formato de products
  function capitalize(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Sincroniza los filtros con los parámetros de la URL
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      categoria: categoria ? [categoria.toLowerCase()] : (isCategoria ? [genero.toLowerCase()] : []),
      genero: isGenero ? [genero] : [],
      marca: marca ? [capitalize(marca)] : [],
      talla: tallaQuery ? [tallaQuery] : [],
    }));
  }, [genero, categoria, marca, tallaQuery]);

  // Si no hay género, categoría ni marca, mostrar todo
  const mostrarTodo = !genero && !categoria && !marca;

  const toggleFilter = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value],
    }));
  };

  // Filter products based on filters (keys as in products.js)
  const filtered = products.filter((prod) => {
    return (
      (mostrarTodo || !filters.genero.length || filters.genero.includes(prod.genero)) &&
      (!filters.categoria.length || filters.categoria.includes(prod.categoria.toLowerCase())) &&
      (!filters.color.length || filters.color.includes(prod.color)) &&
      (!filters.marca.length || filters.marca.some(fm => fm.toLowerCase() === prod.marca.toLowerCase())) &&
      (!filters.talla.length || filters.talla.some((t) => prod.stock[t] > 0))
    );
  });

  // Categories for filter UI
  const categoriasUI = ["Running", "Urbanas", "Premium", "Chunky", "Sandalias", "Jordan", "Fútbol", "Tenis"];
  const generosUI = ["Hombre", "Mujer", "Niños"];
  const coloresUI = ["rojo", "azul", "negro", "amarillo", "verde", "naranja", "rosado", "morado", "blanco", "marrón"];
  const tallasUI = ["6.0", "6.5", "7.0", "7.5", "8.0", "8.5", "9.0", "9.5", "10.0", "10.5", "11.0", "11.5", "12.0", "12.5", "13.0"];
  const marcasUI = ["Nike", "Adidas", "NB", "Vans", "On", "Asics", "Gucci", "LV", "Reebok", "Puma"];

  return (
    <div className={styles.container}>
      <aside className={styles.filtros}>
        <div>
          <h3>Categorías</h3>
          {categoriasUI.map((cat) => (
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
          {generosUI.map((gen) => (
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
          {coloresUI.map((col) => (
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
            {tallasUI.map((size) => (
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
          {marcasUI.map((brand) => (
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
          {(() => {
            if (filters.marca.length > 0) {
              return `Productos de ${filters.marca.join(", ")}`;
            } else if (filters.genero.length > 0 && filters.categoria.length > 0) {
              return `${capitalize(filters.categoria[0])} para ${capitalize(filters.genero[0])}`;
            } else if (filters.genero.length > 0) {
              return `Productos para ${capitalize(filters.genero[0])}`;
            } else if (filters.categoria.length > 0) {
              return `${capitalize(filters.categoria[0])}`;
            } else {
              return "Todos los productos";
            }
          })()}
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
