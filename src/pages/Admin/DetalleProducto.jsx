import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DetalleProducto = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulación de llamada a API para obtener detalles del producto
    const fetchProducto = async () => {
      const response = await fetch(`/api/productos/${id}`);
      const data = await response.json();
      setProducto(data);
    };

    fetchProducto();
  }, [id]);

  const handleVolver = () => {
    navigate('/admin/productos');
  };

  if (!producto) return <p>Cargando...</p>;

  return (
    <div>
      <h1>Detalle de Producto</h1>
      <p>ID: {producto.id}</p>
      <p>Nombre: {producto.nombre}</p>
      <p>Serie: {producto.serie}</p>
      <p>Descripción: {producto.descripcion}</p>
      <p>Precio: S/{producto.precio}</p>
      <p>Estado: {producto.activo ? 'Activo' : 'Inactivo'}</p>
      <button onClick={handleVolver}>Volver</button>
    </div>
  );
};

export default DetalleProducto;