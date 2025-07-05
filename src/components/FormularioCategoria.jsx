import React, { useState } from 'react';

const FormularioCategoria = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Categoría guardada:', { nombre, descripcion });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md max-w-md">
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Nombre de la categoría</label>
        <input
          type="text"
          className="w-full border border-gray-300 px-3 py-2 rounded"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Descripción</label>
        <textarea
          className="w-full border border-gray-300 px-3 py-2 rounded"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        ></textarea>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Guardar categoría
      </button>
    </form>
  );
};

export default FormularioCategoria;

