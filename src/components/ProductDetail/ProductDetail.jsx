import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../../data/products";
import styles from "./ProductDetail.module.css";

const ProductDetail = ({ setCarrito, setGuardados }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id));
  const [selectedSize, setSelectedSize] = useState(null);

  if (!product) return <div>Producto no encontrado</div>;

  const handleAgregar = () => {
    if (selectedSize) {
      setCarrito((prev) => {
        const idx = prev.findIndex(
          (item) => item.id === product.id && item.talla === selectedSize
        );
        if (idx !== -1) {
          // Si ya existe, aumenta la cantidad
          return prev.map((item, i) =>
            i === idx ? { ...item, cantidad: item.cantidad + 1 } : item
          );
        } else {
          // Si no existe, lo agrega
          return [...prev, { ...product, talla: selectedSize, cantidad: 1 }];
        }
      });
      navigate("/carrito");
    }
  };

  const handleGuardar = () => {
    if (selectedSize) {
      setGuardados((prev) => [...prev, { ...product, talla: selectedSize }]);
    }
  };

  return (
    <div className={styles.container}>
      <button onClick={() => navigate(-1)} className={styles.volverBtn}>⬅ Volver</button>

      <div className={styles.imageSection}>
        <img src={product.imagen} alt={product.nombre} className={styles.image} />
      </div>

      <div className={styles.detailsWrapper}>
        <div className={styles.infoSection}>
          <h2 className={styles.name}>{product.nombre}</h2>
          <p className={styles.category}>{product.categoria}</p>
          <p className={styles.price}>S/. {product.precio}</p>

          <p>Elige tu Talla:</p>
          <div className={styles.tallas}>
            {Object.keys(product.stock).map((talla) => (
              <button
                key={talla}
                onClick={() => setSelectedSize(talla)}
                className={`${styles.tallaBtn} ${selectedSize === talla ? styles.tallaSeleccionada : ""}`}
              >
                {talla}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button onClick={handleAgregar} className={styles.addButton}>AGREGAR</button>
            <button onClick={handleGuardar} className={styles.saveButton}>GUARDAR</button>
          </div>
        </div>
        {/* Bloque de descripción dentro de detailsWrapper */}
        <div className={styles.descripcionBox}>
          <h3 className={styles.descripcionTitulo}>Descripción del Producto</h3>
          <p className={styles.descripcionTexto}>{product.descripcion || 'Sin descripción disponible'}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
