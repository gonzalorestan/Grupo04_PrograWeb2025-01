import React, { useState } from "react";
import styles from "./Modal.module.css";

const TarjetaModal = ({ total, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    nombre: "",
    numero: "",
    fecha: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.nombre || !form.numero || !form.fecha || !form.cvv) {
      alert("Todos los campos son obligatorios.");
      return;
    }
    onSuccess();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox}>
        <button className={styles.close} onClick={onClose}>X</button>
        <h3>Datos de la Tarjeta</h3>
        <input name="nombre" placeholder="Nombre del Titular" onChange={handleChange} />
        <input name="numero" placeholder="Número de la Tarjeta" onChange={handleChange} />
        <div className={styles.row}>
          <input name="fecha" placeholder="Fecha Vencimiento" onChange={handleChange} />
          <input name="cvv" placeholder="CVV" onChange={handleChange} />
        </div>
        <button onClick={handleSubmit}>COMPLETAR ORDEN</button>
      </div>
    </div>
  );
};

export default TarjetaModal;
