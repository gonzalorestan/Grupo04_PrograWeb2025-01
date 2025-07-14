import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function VerificarCodigo() {
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const CODIGO_CORRECTO = "XPWX25";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (codigo === CODIGO_CORRECTO) {
      navigate("/cambiarcontraseña");
    } else {
      setError("Código incorrecto. Intenta nuevamente.");
    }
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <h2>Verifica tu Código</h2>
        <p style={{ marginBottom: 10, color: "green" }}>
          Código enviado a tu correo: <strong>{CODIGO_CORRECTO}</strong>
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Código recibido"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            required
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button className="login-submit" type="submit">Verificar</button>
        </form>
      </div>
    </div>
  );
}