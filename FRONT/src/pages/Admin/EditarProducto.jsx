import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import products, { updateProduct } from '../../data/products';
import './EditarProducto.css';

const EditarProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const productoEncontrado = products.find((p) => p.id === parseInt(id));
    if (productoEncontrado) {
      setProducto(productoEncontrado);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({ ...producto, [name]: value });
  };

  const handleGuardar = () => {
    updateProduct(producto);
    navigate('/admin/productos');
  };

  if (!producto) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div className="editar-producto-container">
      <h1>Modificar Producto</h1>
      <div className="editar-producto-form">
        <div className="form-left">
          <label>Nombre del Producto</label>
          <input
            name="nombre"
            value={producto.nombre}
            onChange={handleChange}
          />
          <label>Categoría</label>
          <input
            name="categoria"
            value={producto.categoria}
            onChange={handleChange}
          />
          <label>Color</label>
          <input
            name="color"
            value={producto.color}
            onChange={handleChange}
          />
          <label>Precio</label>
          <input
            name="precio"
            type="number"
            value={producto.precio}
            onChange={handleChange}
          />
          <label>Género</label>
          <input
            name="genero"
            value={producto.genero}
            onChange={handleChange}
          />
        </div>
        <div className="form-right">
          <label>Imagen</label>
          <div className="image-preview">
            <img src={producto.imagen} alt="Producto" />
          </div>
          <input
            name="imagen"
            type="file"
            onChange={(e) =>
              setProducto({ ...producto, imagen: e.target.files[0]?.name || producto.imagen })
            }
          />
          <button type="button" onClick={handleGuardar}>Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default EditarProducto;