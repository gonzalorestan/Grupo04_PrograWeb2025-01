import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import products, { updateProduct } from '../../data/products';

const ListaProducto = () => {
  const [paginaActual, setPaginaActual] = useState(1);
  const [filtro, setFiltro] = useState({ nombre: '', serie: '', id: '' });
  const [productos, setProductos] = useState(products);
  const navigate = useNavigate();

  const productosFiltrados = productos.filter((producto) => {
    return (
      (filtro.nombre ? producto.nombre.toLowerCase().includes(filtro.nombre.toLowerCase()) : true) &&
      (filtro.serie ? producto.categoria.toLowerCase().includes(filtro.serie.toLowerCase()) : true) &&
      (filtro.id ? producto.id.toString().includes(filtro.id) : true)
    );
  });

  const productosPaginados = productosFiltrados.slice((paginaActual - 1) * 10, paginaActual * 10);

  const handleFiltroChange = (e) => {
    setFiltro({ ...filtro, [e.target.name]: e.target.value });
  };

  const handleEliminarProducto = (id) => {
    const updatedProductos = productos.filter((producto) => producto.id !== id);
    setProductos(updatedProductos);
    updateProduct(updatedProductos);
  };

  const handleAgregarProducto = () => {
    navigate('/admin/productos/agregar');
  };

  return (
    <div>
      <h1>Lista de Productos</h1>
      <div>
        <input name="nombre" placeholder="Filtrar por nombre" onChange={handleFiltroChange} />
        <input name="serie" placeholder="Filtrar por serie" onChange={handleFiltroChange} />
        <input name="id" placeholder="Filtrar por ID" onChange={handleFiltroChange} />
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Color</th>
            <th>Género</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productosPaginados.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>{producto.nombre}</td>
              <td>{producto.categoria}</td>
              <td>${producto.precio}</td>
              <td>{producto.color}</td>
              <td>{producto.genero}</td>
              <td>
                <button onClick={() => navigate(`/admin/productos/editar/${producto.id}`)}>Editar Producto</button>
                <button onClick={() => handleEliminarProducto(producto.id)}>Eliminar Producto</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}>Anterior</button>
        <button onClick={() => setPaginaActual((prev) => prev + 1)}>Siguiente</button>
      </div>
      <button onClick={handleAgregarProducto}>Agregar Producto</button>
    </div>
  );
};

export default ListaProducto;