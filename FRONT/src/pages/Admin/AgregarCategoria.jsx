import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoriaContexto } from '../Context/ContextoCategoria';
import styles from './Admin.module.css';

const AgregarCategoria = () => {
  const { agregarCategoria } = useContext(CategoriaContexto);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const navigate = useNavigate();

  const manejarSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !descripcion) {
      alert("Por favor completa todos los campos");
      return;
    }

    const nuevaCategoria = { nombre, descripcion };
    agregarCategoria(nuevaCategoria);
    navigate('/admin/categorias');
  };

  return (
    <div className={styles.adminMenu}>
      <h1 className="text-2xl font-bold mb-4">Agregar Nueva Categoría</h1>
      <form onSubmit={manejarSubmit} className="bg-white p-6 rounded shadow-md max-w-md space-y-4">
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Nombre de la categoría</label>
          <input
            type="text"
            className="border border-gray-300 px-3 py-2 rounded"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            placeholder="Ej. Zapatillas deportivas"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Descripción</label>
          <textarea
            className="border border-gray-300 px-3 py-2 rounded"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
            placeholder="Describe la categoría brevemente"
          ></textarea>
        </div>

        <button type="submit" className={`${styles.btnActivate} w-full py-2`}>
          Guardar Categoría
        </button>
      </form>
    </div>
  );
};

export default AgregarCategoria;






