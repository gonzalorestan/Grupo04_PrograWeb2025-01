import React, { useState } from "react";
import { requestPasswordReset } from "../../services/api";
import "./CambiarPassword.css";

export const CambiarPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await requestPasswordReset(email);
    alert("Se ha enviado un correo para cambiar la contraseña");
  };

  return (
    <div className="password-container">
      <h2>Cambiar Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <label>Correo electrónico:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Enviar enlace de cambio</button>
      </form>
    </div>
  );
};

export default CambiarPassword;