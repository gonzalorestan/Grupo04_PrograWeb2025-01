import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import products, { updateProduct } from '../../data/products';
import './EditarProducto.css';

const AgregarProducto = () => {
  const navigate = useNavigate();
  const categorias = [...new Set(products.map((p) => p.categoria))];
  const colores = [...new Set(products.map((p) => p.color))];

  const [nuevoProducto, setNuevoProducto] = useState({
    id: products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1,
    nombre: '',
    categoria: categorias[0] || '',
    color: colores[0] || '',
    precio: '',
    genero: '',
    imagen: '',
    stock: {},
    bestseller: false,
    descripcion: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto({ ...nuevoProducto, [name]: value });
  };

  const handleGuardar = () => {
    const nuevoId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    const productoConId = { ...nuevoProducto, id: nuevoId };
    products.push(productoConId);
    updateProduct(productoConId);
    navigate('/admin/productos');
  };

  return (
    <div className="editar-producto-container">
      <h1>Agregar Producto</h1>
      <div className="editar-producto-form">
        <div className="form-left">
          <label>Nombre del Producto</label>
          <input
            name="nombre"
            value={nuevoProducto.nombre}
            onChange={handleChange}
          />
          <label>Categoría</label>
          <select
            name="categoria"
            value={nuevoProducto.categoria}
            onChange={handleChange}
            className="input-style"
          >
            {categorias.map((categoria) => (
              <option key={categoria} value={categoria}>{categoria}</option>
            ))}
          </select>
          <label>Color</label>
          <select
            name="color"
            value={nuevoProducto.color}
            onChange={handleChange}
            className="input-style"
          >
            {colores.map((color) => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
          <label>Precio</label>
          <input
            name="precio"
            type="number"
            value={nuevoProducto.precio}
            onChange={handleChange}
          />
          <label>Género</label>
          <input
            name="genero"
            value={nuevoProducto.genero}
            onChange={handleChange}
          />
        </div>
        <div className="form-right">
          <label>Imagen</label>
          <div className="image-preview">
            {nuevoProducto.imagen && <img src={nuevoProducto.imagen} alt="Producto" />}
          </div>
          <input
            name="imagen"
            type="file"
            onChange={(e) =>
              setNuevoProducto({ ...nuevoProducto, imagen: e.target.files[0]?.name || nuevoProducto.imagen })
            }
          />
          <button type="button" onClick={handleGuardar}>Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default AgregarProducto;