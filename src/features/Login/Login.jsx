import React, { useState, useEffect } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../Context/AuthContext';

export default function Login({ onLogin , actualizarUsuarioActivo }) {
  const navigate = useNavigate();
  const { login, user, loading } = useAuth();
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (loading) return;
    if (user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try{
      const usuarioLogeado = await login(correo, password);
      if (usuarioLogeado) {
        localStorage.setItem("usuarioActivo", JSON.stringify(usuarioLogeado));
        if (typeof actualizarUsuarioActivo === "function") {
          actualizarUsuarioActivo(usuarioLogeado);
        }
        navigate("/");
      }
    } catch (err) {
      setError(err.mensaje);
    }

    if (loading) return <div>Cargando...</div>
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

          {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

          <a onClick={() => navigate("/forgot-password")} className="login-forgot">Olvidé mi Contraseña</a>

          <button type="submit" className="login-submit">LOGIN</button>
        </form>

        <a className="login-signup" onClick={() => navigate("/SignUp")}>SIGN UP</a>
      </div>
    </div>
  );
}
