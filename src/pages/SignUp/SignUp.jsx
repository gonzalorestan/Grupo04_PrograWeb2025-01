import React, { useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../Context/AuthContext';
import { registerUser } from "../../services/api";

export default function SignUp({ onRegister ,actualizarUsuarioActivo }) {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    dni: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      await registerUser(form);

      const newUser = {
        nombre: form.nombre,
        apellido: form.apellido,
        correo: form.correo,
        dni: form.dni,
        password: form.password,
      };

      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      usuarios.push(newUser);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      localStorage.setItem("usuarioActivo", JSON.stringify(newUser));

      actualizarUsuarioActivo(newUser);

      if (typeof onRegister === "function") onRegister();
          navigate("/");
      
    } catch (err) {
      setError(err.message);
    }
    
  };

  return (
    <div className="signup-background">
      <div className="signup-container">
        <button className="signup-close" onClick={() => navigate("/")}>
          X
        </button>
        <h2>SIGN UP</h2>

        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="signup-row">
            <div>
              <label>Nombre</label>
              <input
                name="nombre"
                type="text"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Nombre del Usuario"
                required
              />
            </div>
            <div>
              <label>Apellido</label>
              <input
                name="apellido"
                type="text"
                value={form.apellido}
                onChange={handleChange}
                placeholder="Apellido del Usuario"
                required
              />
            </div>
          </div>

          <div className="signup-row">
            <div>
              <label>Correo</label>
              <input
                name="correo"
                type="email"
                value={form.correo}
                onChange={handleChange}
                placeholder="usuario@gmail.com"
                required
              />
            </div>
            <div>
              <label>DNI</label>
              <input
                name="dni"
                type="text"
                value={form.dni}
                onChange={handleChange}
                placeholder="DNI"
                required
              />
            </div>
          </div>

          <div className="signup-row">
            <div>
              <label>Contraseña</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Contraseña"
                required
              />
            </div>
            <div>
              <label>Confirmar Contraseña</label>
              <input
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Contraseña"
                required
              />
            </div>
          </div>

          {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

          <button type="submit" className="signup-submit">SIGN UP</button>
        </form>

        <a onClick={() => navigate("/login")} className="signup-login">LOGIN</a>
      </div>
    </div>
  );
}
