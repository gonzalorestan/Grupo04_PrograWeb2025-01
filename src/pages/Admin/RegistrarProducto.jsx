import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrarProducto = () => {
  const [producto, setProducto] = useState({ nombre: '', serie: '', descripcion: '', precio: 0 });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulación de registro de producto
    await fetch('/api/productos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(producto),
    });
    navigate('/admin/productos');
  };

  return (
    <div>
      <h1>Registrar Producto</h1>
      <form onSubmit={handleSubmit}>
        <input name="nombre" placeholder="Nombre" onChange={handleChange} required />
        <input name="serie" placeholder="Serie" onChange={handleChange} required />
        <textarea name="descripcion" placeholder="Descripción" onChange={handleChange} required />
        <input name="precio" type="number" placeholder="Precio" onChange={handleChange} required />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegistrarProducto;