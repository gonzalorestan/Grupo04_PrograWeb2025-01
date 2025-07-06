import React, { useState, useEffect } from "react";
import styles from "./Checkout.module.css";
import TarjetaModal from "../../components/TarjetaModal";
import QRModal from "../../components/QRModal";

// Importar los datos JSON locales
import departamentosData from "../../data/ubigeo_peru_2016_departamentos.json";
import provinciasData from "../../data/ubigeo_peru_2016_provincias.json";
import distritosData from "../../data/ubigeo_peru_2016_distritos.json";

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

  const [provinciasFiltradas, setProvinciasFiltradas] = useState([]);
  const [distritosFiltradas, setDistritosFiltradas] = useState([]);

  useEffect(() => {
    if (envio.departamento) {
      setProvinciasFiltradas(
        provinciasData.filter((prov) => prov.department_id === envio.departamento)
      );
      setEnvio((prev) => ({ ...prev, provincia: "", distrito: "" }));
      setDistritosFiltradas([]);
    }
  }, [envio.departamento]);

  useEffect(() => {
    if (envio.provincia) {
      setDistritosFiltradas(
        distritosData.filter((dist) => dist.province_id === envio.provincia)
      );
      setEnvio((prev) => ({ ...prev, distrito: "" }));
    }
  }, [envio.provincia]);

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

  // Corregir subtotal para considerar la cantidad de cada producto
  const subtotal = carrito.reduce((acc, item) => acc + item.precio * (item.cantidad || 1), 0);

  const handleGuardar = () => {
    if (validar()) {
      setMostrarMetodoPago(true);
    }
  };

  return (
    <div className={styles.checkoutContainer}>
      <section className={styles.formSection}>
        <h2>Envío</h2>

        {/* Departamento */}
        <select
          name="departamento"
          value={envio.departamento}
          onChange={handleChange}
          className={errores.departamento ? styles.errorInput : ""}
        >
          <option value="">Departamento</option>
          {departamentosData.map((dep) => (
            <option key={dep.id} value={dep.id}>
              {dep.name}
            </option>
          ))}
        </select>

        {/* Provincia */}
        <select
          name="provincia"
          value={envio.provincia}
          onChange={handleChange}
          className={errores.provincia ? styles.errorInput : ""}
          disabled={!envio.departamento}
        >
          <option value="">Provincia</option>
          {provinciasFiltradas.map((prov) => (
            <option key={prov.id} value={prov.id}>
              {prov.name}
            </option>
          ))}
        </select>

        {/* Distrito */}
        <select
          name="distrito"
          value={envio.distrito}
          onChange={handleChange}
          className={errores.distrito ? styles.errorInput : ""}
          disabled={!envio.provincia}
        >
          <option value="">Distrito</option>
          {distritosFiltradas.map((dist) => (
            <option key={dist.id} value={dist.name}>
              {dist.name}
            </option>
          ))}
        </select>

        {/* Otros campos */}
        {["direccion", "postal", "celular", "dni"].map((campo) => (
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
            <div key={item.id + '-' + item.talla} className={styles.item}>
              <img src={item.imagen} alt={item.nombre} />
              <div>
                <h4>{item.nombre}</h4>
                <p>{item.categoria}</p>
                <p>Talla: {item.talla}</p>
                <p>Cantidad: <strong>{item.cantidad || 1}</strong></p>
                <p style={{ color: "red" }}>S/. {(item.precio * (item.cantidad || 1)).toFixed(2)}</p>
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
            window.location.href = "/orden-completadahttps://tvgo.americatv.com.pe/";
          }}
        />
      )}
    </div>
  );
};

export default Checkout;
