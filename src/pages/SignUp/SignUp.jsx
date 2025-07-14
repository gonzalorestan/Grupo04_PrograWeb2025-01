import React, { useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../Context/AuthContext';
import { registerUser, loginUser } from "../../services/api";

export default function SignUp({ onRegister ,actualizarUsuarioActivo }) {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    usuario: "",
    correo: "",
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

      const newUser = {
        firstName: form.nombre,
        lastName: form.apellido,
        username: form.usuario,
        email: form.correo,
        password: form.password,
        rol: "cliente"
      };
      
      await registerUser(newUser);
      const response = await loginUser(form.correo, form.password);

      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      usuarios.push(newUser);
      localStorage.setItem("token", response.token);
      localStorage.setItem("usuarioActivo", JSON.stringify(response.user));

      actualizarUsuarioActivo(response.user);

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
              <label>Usario</label>
              <input
                name="usuario"
                type="text"
                value={form.usuario}
                onChange={handleChange}
                placeholder="usuario"
                required
              />
            </div>
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
