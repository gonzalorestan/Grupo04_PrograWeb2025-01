import React, { useState, useEffect } from "react";
import { updateUserProfile } from "../../services/api"; 
import "./EditarPerfil.css";

export const EditarPerfil = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });
  const [userPlaceholders, setUserPlaceholders] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (user) {
      setUserPlaceholders({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || ""
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Only send fields that have been changed (not empty)
    const updateFields = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key]) updateFields[key] = formData[key];
    });
    if (Object.keys(updateFields).length === 0) {
      alert("No hay cambios para guardar");
      return;
    }
    await updateUserProfile(updateFields);
    alert("Datos actualizados correctamente");
    // Optionally, update placeholders
    setUserPlaceholders((prev) => ({ ...prev, ...updateFields }));
    setFormData({ firstName: "", lastName: "", email: "" });
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
    // Simulate password update
    const updatedUser = { ...user, password: passwordData.newPassword };
    localStorage.setItem("usuarioActivo", JSON.stringify(updatedUser));
    alert("Contraseña actualizada correctamente");
    setPasswordData({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
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
              name="firstName"
              value={formData.firstName}
              placeholder={userPlaceholders.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Apellido:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              placeholder={userPlaceholders.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group" style={{ width: '100%' }}>
            <label>Correo:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder={userPlaceholders.email}
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
    </div>
  );
};

export default EditarPerfil;