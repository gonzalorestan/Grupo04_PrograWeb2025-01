import React from "react";
import styles from "./Filtros.module.css";

const categorias = ["Running", "Urbanas", "Premium", "Chunky", "Sandalias", "Jordan", "Fútbol", "Tenis"];
const generos = ["Hombre", "Mujer", "Niños"];
const colores = [
  { nombre: "rojo", hex: "#FF0000" },
  { nombre: "azul", hex: "#0000FF" },
  { nombre: "negro", hex: "#000000" },
  { nombre: "amarillo", hex: "#FFFF00" },
  { nombre: "verde", hex: "#008000" },
  { nombre: "naranja", hex: "#FFA500" },
  { nombre: "rosado", hex: "#FFC0CB" },
  { nombre: "morado", hex: "#800080" },
  { nombre: "blanco", hex: "#FFFFFF" },
  { nombre: "marron", hex: "#8B0000" }
];
const tallas = [
  "6.0", "6.5", "7.0", "7.5", "8.0", "8.5", "9.0", "9.5",
  "10.0", "10.5", "11.0", "11.5", "12.0", "12.5", "13.0"
];
const marcas = ["Nike", "Adidas", "NB", "Vans", "On", "Asics", "Gucci", "LV"];

const Filtros = ({ filtros, setFiltros }) => {
  const toggleFiltro = (tipo, valor) => {
    const nuevosFiltros = { ...filtros };
    if (tipo === "talla") {
      nuevosFiltros[tipo] = nuevosFiltros[tipo].includes(valor)
        ? nuevosFiltros[tipo].filter((v) => v !== valor)
        : [...nuevosFiltros[tipo], valor];
    } else {
      nuevosFiltros[tipo] = valor === filtros[tipo] ? "" : valor;
    }
    setFiltros(nuevosFiltros);
  };

  return (
    <div className={styles.sidebar}>
      <h3>Categorías</h3>
      {categorias.map((cat) => (
        <div key={cat} onClick={() => toggleFiltro("categoria", cat.toLowerCase())}
          className={`${styles.item} ${filtros.categoria === cat.toLowerCase() ? styles.active : ""}`}>
          {cat}
        </div>
      ))}
      <h3>Género</h3>
      {generos.map((gen) => (
        <div key={gen} onClick={() => toggleFiltro("genero", gen.toLowerCase())}
          className={`${styles.item} ${filtros.genero === gen.toLowerCase() ? styles.active : ""}`}>
          {gen}
        </div>
      ))}
      <h3>Color</h3>
      <div className={styles.colorGrid}>
        {colores.map(({ nombre, hex }) => (
          <div
            key={nombre}
            onClick={() => toggleFiltro("color", nombre)}
            className={`${styles.color} ${filtros.color === nombre ? styles.selected : ""}`}
            style={{ backgroundColor: hex }}
          />
        ))}
      </div>
      <h3>Talla</h3>
      <div className={styles.grid}>
        {tallas.map((talla) => (
          <button
            key={talla}
            onClick={() => toggleFiltro("talla", talla)}
            className={filtros.talla.includes(talla) ? styles.selectedBtn : ""}
          >
            {talla}
          </button>
        ))}
      </div>
      <h3>Marcas</h3>
      {marcas.map((marca) => (
        <div key={marca} onClick={() => toggleFiltro("marca", marca)}
          className={`${styles.item} ${filtros.marca === marca ? styles.active : ""}`}>
          {marca}
        </div>
      ))}
    </div>
  );
};

export default Filtros;
