import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products";

const ProductDetail = ({ setCarrito, setGuardados }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id));
  const [selectedSize, setSelectedSize] = useState(null);

  if (!product) return <div>Producto no encontrado</div>;

  const handleAgregar = () => {
    if (selectedSize) {
      setCarrito((prev) => [...prev, { ...product, talla: selectedSize, cantidad: 1 }]);
      navigate("/carrito");
    }
  };

  const handleGuardar = () => {
    if (selectedSize) {
      setGuardados((prev) => [...prev, { ...product, talla: selectedSize }]);
    }
  };

  return (
    <div style={{ display: "flex", padding: "2rem", gap: "3rem" }}>
      <button onClick={() => navigate(-1)} style={{ position: "absolute", top: 20, left: 20 }}>
        ⬅ Volver
      </button>
      <img src={product.imagen} alt={product.nombre} style={{ width: "400px", objectFit: "contain" }} />
      <div>
        <h2>{product.nombre}</h2>
        <p style={{ fontWeight: "bold", fontSize: "1.2rem" }}>{product.categoria}</p>
        <p style={{ color: "red", fontSize: "1.5rem" }}>S/. {product.precio}</p>

        <p>Elige tu Talla:</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", maxWidth: "20rem" }}>
          {Object.keys(product.stock).map((talla) => (
            <button
              key={talla}
              onClick={() => setSelectedSize(talla)}
              style={{
                padding: "0.5rem",
                border: "1px solid #aaa",
                borderRadius: "5px",
                backgroundColor: selectedSize === talla ? "#ddd" : "white",
                cursor: "pointer",
                minWidth: "40px",
              }}
            >
              {talla}
            </button>
          ))}
        </div>

        <button
          style={{
            marginTop: "1rem",
            padding: "0.7rem 2rem",
            border: "1px solid red",
            background: "white",
            color: "red",
            cursor: "pointer",
          }}
          onClick={handleAgregar}
        >
          AGREGAR
        </button>

        <button
          style={{
            marginTop: "0.5rem",
            padding: "0.5rem 2rem",
            border: "1px solid gray",
            background: "white",
            color: "gray",
            cursor: "pointer",
          }}
          onClick={handleGuardar}
        >
          GUARDAR
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;