import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CambiarPassword() {
  const [nuevaPassword, setNuevaPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = localStorage.getItem("recoveryEmail");
    if (email) {
      console.log(`Actualizar password de ${email} a ${nuevaPassword}`);
      localStorage.removeItem("recoveryEmail");
      navigate("/login"); 
    }
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <h2>Cambiar Contraseña</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Nueva contraseña"
            value={nuevaPassword}
            onChange={(e) => setNuevaPassword(e.target.value)}
            required
          />
          <button className="login-submit" type="submit">Confirmar</button>
        </form>
      </div>
    </div>
  );
}
