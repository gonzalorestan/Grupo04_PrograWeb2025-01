import React, { useState } from "react";
import styles from "./Checkout.module.css"; // ✅ CSS local del módulo

// ✅ Rutas corregidas hacia components
import TarjetaModal from "../../components/TarjetaModal";
import QRModal from "../../components/QRModal";

const Checkout = ({ carrito, setCarrito }) => {
  const [envio, setEnvio] = useState({
    departamento: "",
    provincia: "",
    distrito: "",
    direccion: "",
    postal: "",
    celular: "",
    dni: "",
  });

  const [errores, setErrores] = useState({});
  const [mostrarMetodoPago, setMostrarMetodoPago] = useState(false);
  const [metodoSeleccionado, setMetodoSeleccionado] = useState(null);

  const handleChange = (e) => {
    setEnvio({ ...envio, [e.target.name]: e.target.value });
  };

  const validar = () => {
    const camposVacios = {};
    Object.entries(envio).forEach(([key, value]) => {
      if (!value) camposVacios[key] = "Este campo es obligatorio";
    });
    setErrores(camposVacios);
    return Object.keys(camposVacios).length === 0;
  };

  const subtotal = carrito.reduce((acc, item) => acc + item.precio, 0);

  const handleGuardar = () => {
    if (validar()) {
      setMostrarMetodoPago(true);
    }
  };

  return (
    <div className={styles.checkoutContainer}>
      <section className={styles.formSection}>
        <h2>Envío</h2>
        {["departamento", "provincia", "distrito", "direccion", "postal", "celular", "dni"].map((campo) => (
          <input
            key={campo}
            type="text"
            name={campo}
            placeholder={campo.charAt(0).toUpperCase() + campo.slice(1)}
            value={envio[campo]}
            onChange={handleChange}
            className={errores[campo] ? styles.errorInput : ""}
          />
        ))}
        <button onClick={handleGuardar}>GUARDAR</button>
      </section>

      <section className={styles.resumenSection}>
        <h2>Resumen</h2>
        <div className={styles.productos}>
          {carrito.map((item) => (
            <div key={item.id} className={styles.item}>
              <img src={item.imagen} alt={item.nombre} />
              <div>
                <h4>{item.nombre}</h4>
                <p>{item.categoria}</p>
                <p>Talla: {item.talla}</p>
                <p style={{ color: "red" }}>S/. {item.precio}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.resumenFinal}>
          <p>Subtotal: <strong>S/. {subtotal.toFixed(2)}</strong></p>
          <p>Envío: <span style={{ color: "red" }}>GRATIS</span></p>
          <h3>Total: <span style={{ color: "red" }}>S/. {subtotal.toFixed(2)}</span></h3>
        </div>

        {mostrarMetodoPago && (
          <div className={styles.metodoPago}>
            <h3>Método de Pago</h3>
            <button onClick={() => setMetodoSeleccionado("tarjeta")}>Crédito o Débito</button>
            <button onClick={() => setMetodoSeleccionado("qr")}>Pagar con QR</button>
          </div>
        )}
      </section>

      {metodoSeleccionado === "tarjeta" && (
        <TarjetaModal
          total={subtotal}
          onClose={() => setMetodoSeleccionado(null)}
          onSuccess={() => {
            setCarrito([]);
            window.location.href = "/orden-completada";
          }}
        />
      )}
      {metodoSeleccionado === "qr" && (
        <QRModal
          total={subtotal}
          onClose={() => setMetodoSeleccionado(null)}
          onSuccess={() => {
            setCarrito([]);
            window.location.href = "/orden-completada";
          }}
        />
      )}
    </div>
  );
};

export default Checkout;