import React from "react";
import { useNavigate } from "react-router-dom";

const Carrito = ({ carrito, setCarrito, guardados, setGuardados }) => {
  const navigate = useNavigate();

  const moverAGuardados = (id) => {
    const producto = carrito.find((item) => item.id === id);
    if (producto) {
      setGuardados([...guardados, producto]);
      setCarrito(carrito.filter((item) => item.id !== id));
    }
  };

  const subirAlCarrito = (id) => {
    const producto = guardados.find((item) => item.id === id);
    if (producto) {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
      setGuardados(guardados.filter((item) => item.id !== id));
    }
  };

  const eliminar = (id, origen) => {
    if (origen === "carrito") {
      setCarrito(carrito.filter((item) => item.id !== id));
    } else {
      setGuardados(guardados.filter((item) => item.id !== id));
    }
  };

  const subtotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Carrito ({carrito.length} productos)</h2>
      {carrito.map((item) => (
        <div key={item.id} style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
          <img src={item.imagen} alt={item.nombre} style={{ width: "80px", marginRight: "1rem" }} />
          <div style={{ flex: 1 }}>
            <h4>{item.nombre}</h4>
            <p>{item.categoria} - Talla: {item.talla}</p>
            <p>S/. {item.precio}</p>
          </div>
          <button onClick={() => moverAGuardados(item.id)}>Guardar</button>
          <button onClick={() => eliminar(item.id, "carrito")}>🗑</button>
        </div>
      ))}

      <h2>Guardados ({guardados.length} productos)</h2>
      {guardados.map((item) => (
        <div key={item.id} style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}>
          <img src={item.imagen} alt={item.nombre} style={{ width: "80px", marginRight: "1rem" }} />
          <div style={{ flex: 1 }}>
            <h4>{item.nombre}</h4>
            <p>{item.categoria} - Talla: {item.talla}</p>
            <p>S/. {item.precio}</p>
          </div>
          <button onClick={() => subirAlCarrito(item.id)}>Subir al carrito</button>
          <button onClick={() => eliminar(item.id, "guardado")}>🗑</button>
        </div>
      ))}

      <h2>Resumen</h2>
      <p>Subtotal: S/. {subtotal.toFixed(2)}</p>
      <p>Envío: GRATIS</p>
      <h3>Total: S/. {subtotal.toFixed(2)}</h3>

      <button onClick={() => navigate("/checkout")}>Checkout</button>
    </div>
  );
};

export default Carrito;
