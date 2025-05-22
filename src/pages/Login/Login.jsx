import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioEncontrado = usuarios.find(
      (u) => u.correo === correo && u.password === password
    );

    if (usuarioEncontrado) {
      localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));
      if (typeof onLogin === "function") onLogin();
      navigate("/");
    } else {
      setError("Correo o contraseña incorrectos.");
    }
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <button className="login-close" onClick={() => navigate("/")}>
          X
        </button>
        <h2>LOGIN</h2>
        <form onSubmit={handleSubmit}>
          <label>Correo</label>
          <input
            type="email"
            placeholder="usuario @gmail.com"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}}

          <a href="#" className="login-forgot">Olvidé mi Contraseña</a>

          <button type="submit" className="login-submit">LOGIN</button>
        </form>

        <a className="login-signup" onClick={() => navigate("/register")}>SIGN UP</a>
      </div>
    </div>
  );
}
