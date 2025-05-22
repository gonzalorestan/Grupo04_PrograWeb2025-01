import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = ({ carrito }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    departamento: "",
    provincia: "",
    distrito: "",
    direccion: "",
    postal: "",
    celular: "",
    dni: "",
  });

  const [error, setError] = useState("");
  const [formularioGuardado, setFormularioGuardado] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGuardar = () => {
    for (const campo in form) {
      if (!form[campo]) {
        setError(`El campo "${campo}" está vacío.`);
        return;
      }
    }
    setError("");
    setFormularioGuardado(true);
  };

  const subtotal = carrito.reduce((acc, item) => acc + item.precio, 0);

  return (
    <div style={{ display: "flex", gap: "3rem", padding: "2rem" }}>
      <div style={{ flex: 1 }}>
        <h2>Envío</h2>
        <select name="departamento" onChange={handleChange} value={form.departamento}>
          <option value="">Departamento</option>
          <option value="Lima">Lima</option>
          <option value="Arequipa">Arequipa</option>
          <option value="Cusco">Cusco</option>
        </select>
        <br />
        <select name="provincia" onChange={handleChange} value={form.provincia}>
          <option value="">Provincia</option>
          <option value="Lima">Lima</option>
          <option value="Cañete">Cañete</option>
        </select>
        <br />
        <select name="distrito" onChange={handleChange} value={form.distrito}>
          <option value="">Distrito</option>
          <option value="Miraflores">Miraflores</option>
          <option value="Surco">Surco</option>
        </select>
        <br />
        <input
          name="direccion"
          placeholder="Dirección"
          value={form.direccion}
          onChange={handleChange}
        /><br />
        <input
          name="postal"
          placeholder="Código Postal"
          value={form.postal}
          onChange={handleChange}
        /><br />
        <input
          name="celular"
          placeholder="Celular"
          value={form.celular}
          onChange={handleChange}
        /><br />
        <input
          name="dni"
          placeholder="Dni"
          value={form.dni}
          onChange={handleChange}
        /><br />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button onClick={handleGuardar}>GUARDAR</button>

        {formularioGuardado && (
          <div style={{ marginTop: "2rem" }}>
            <h2>Método de Pago</h2>
            <button>Crédito o Débito</button>
            <br />
            <button>Pagar con QR</button>
          </div>
        )}
      </div>

      <div style={{ flex: 1 }}>
        <h2>Resumen</h2>
        <div style={{ border: "1px solid gray", padding: "1rem" }}>
          {carrito.map((item) => (
            <div key={item.id} style={{ display: "flex", marginBottom: "1rem", gap: "1rem" }}>
              <img src={item.imagen} alt={item.nombre} width={80} />
              <div>
                <strong>{item.nombre}</strong>
                <p>{item.categoria}</p>
                <p>Talla: {item.talla || "10 US"}</p>
                <p style={{ color: "red" }}>S/. {item.precio}</p>
              </div>
            </div>
          ))}

          <hr />
          <p>Subtotal: <strong>S/. {subtotal.toFixed(2)}</strong></p>
          <p>Envío: <strong style={{ color: "red" }}>GRATIS</strong></p>
          <p style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
            Total: <span style={{ color: "red" }}>S/. {subtotal.toFixed(2)}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
