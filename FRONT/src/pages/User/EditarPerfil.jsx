import React, { useState, useEffect } from "react";
import "./EditarPerfil.css";

const EditarPerfil = ({ modoCompleto }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    dni: "",
    password: ""
  });
  const [userPlaceholders, setUserPlaceholders] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    dni: "",
    password: ""
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });
  const [userActual, setUserActual] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (user) {
      setUserPlaceholders({
        nombre: user.nombre || "",
        apellido: user.apellido || "",
        correo: user.correo || "",
        dni: user.dni || "",
        password: user.password || ""
      });
      setUserActual(user);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("usuarioActivo"));
    const updateFields = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key]) updateFields[key] = formData[key];
    });
    if (Object.keys(updateFields).length === 0) {
      alert("No hay cambios para guardar");
      return;
    }
    const updatedUser = { ...user, ...updateFields };
    localStorage.setItem("usuarioActivo", JSON.stringify(updatedUser));
    // Actualizar en lista de usuarios
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios = usuarios.map(u => u.correo === user.correo ? updatedUser : u);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    alert("Datos actualizados correctamente");
    setUserPlaceholders((prev) => ({ ...prev, ...updateFields }));
    setFormData({ nombre: "", apellido: "", correo: "", dni: "", password: "" });
    setUserActual(updatedUser);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!user || user.password !== passwordData.currentPassword) {
      alert("La contraseña actual es incorrecta");
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      alert("Las contraseñas nuevas no coinciden");
      return;
    }
    const updatedUser = { ...user, password: passwordData.newPassword };
    localStorage.setItem("usuarioActivo", JSON.stringify(updatedUser));
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios = usuarios.map(u => u.correo === user.correo ? updatedUser : u);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    alert("Contraseña actualizada correctamente");
    setPasswordData({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
    setUserActual(updatedUser);
  };

  return (
    <div className="profile-container">
      <h2>Editar Perfil</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-row">
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              placeholder={userPlaceholders.nombre}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Apellido:</label>
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              placeholder={userPlaceholders.apellido}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group" style={{ width: '100%' }}>
            <label>Correo:</label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              placeholder={userPlaceholders.correo}
              onChange={handleChange}
            />
          </div>
          <div className="form-group" style={{ width: '100%' }}>
            <label>DNI:</label>
            <input
              type="text"
              name="dni"
              value={formData.dni}
              placeholder={userPlaceholders.dni}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit">Guardar Cambios</button>
      </form>
      <div className="password-section">
        <h3>Cambiar Contraseña</h3>
        <form onSubmit={handlePasswordSubmit} className="password-form">
          <label>Contraseña Actual:</label>
          <input
            type="password"
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
            placeholder="Ingresa tu contraseña actual"
          />
          <label>Nueva Contraseña:</label>
          <input
            type="password"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            placeholder="Nueva contraseña"
          />
          <label>Confirmar Nueva Contraseña:</label>
          <input
            type="password"
            name="confirmNewPassword"
            value={passwordData.confirmNewPassword}
            onChange={handlePasswordChange}
            placeholder="Repite la nueva contraseña"
          />
          <button type="submit">Actualizar Contraseña</button>
        </form>
      </div>
      {modoCompleto && userActual && (
        <div className="datos-guardados">
          <h3>Datos guardados en tu cuenta</h3>
          <ul>
            <li><strong>Nombre:</strong> {userActual.nombre}</li>
            <li><strong>Apellido:</strong> {userActual.apellido}</li>
            <li><strong>Correo:</strong> {userActual.correo}</li>
            <li><strong>DNI:</strong> {userActual.dni}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default EditarPerfil;