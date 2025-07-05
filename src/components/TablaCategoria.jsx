import React, { useState, useContext } from 'react';
import { CategoriaContexto } from '../pages/Context/ContextoCategoria';
import styles from '../pages/Admin/Admin.module.css';

const TablaCategoria = ({ categorias }) => {
  const { eliminarCategoria, actualizarCategoria } = useContext(CategoriaContexto);

  const [idEditando, setIdEditando] = useState(null);
  const [nombreEditado, setNombreEditado] = useState('');
  const [descripcionEditada, setDescripcionEditada] = useState('');

  const manejarEditar = (categoria) => {
    setIdEditando(categoria.id);
    setNombreEditado(categoria.nombre);
    setDescripcionEditada(categoria.descripcion);
  };

  const manejarGuardar = () => {
    if (!nombreEditado || !descripcionEditada) {
      alert("Completa todos los campos");
      return;
    }

    actualizarCategoria({ id: idEditando, nombre: nombreEditado, descripcion: descripcionEditada });
    setIdEditando(null);
  };

  return (
    <table className="min-w-full bg-white shadow rounded">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b">ID</th>
          <th className="py-2 px-4 border-b">Nombre</th>
          <th className="py-2 px-4 border-b">Descripción</th>
          <th className="py-2 px-4 border-b">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {categorias.map((categoria) => (
          <tr key={categoria.id}>
            <td className="py-2 px-4 border-b">{categoria.id}</td>

            {idEditando === categoria.id ? (
              <>
                <td className="py-2 px-4 border-b">
                  <input
                    value={nombreEditado}
                    onChange={(e) => setNombreEditado(e.target.value)}
                    className="border border-gray-300 px-2 py-1 rounded w-full"
                  />
                </td>
                <td className="py-2 px-4 border-b">
                  <input
                    value={descripcionEditada}
                    onChange={(e) => setDescripcionEditada(e.target.value)}
                    className="border border-gray-300 px-2 py-1 rounded w-full"
                  />
                </td>
              </>
            ) : (
              <>
                <td className="py-2 px-4 border-b">{categoria.nombre}</td>
                <td className="py-2 px-4 border-b">{categoria.descripcion}</td>
              </>
            )}

            <td className="py-2 px-4 border-b">
              {idEditando === categoria.id ? (
                <>
                  <button
                    onClick={manejarGuardar}
                    className={`${styles.btnActivate} mr-2`}
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setIdEditando(null)}
                    className={`${styles.btnDeactivate}`}
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => manejarEditar(categoria)}
                    className={`${styles.btnActivate} mr-2`}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarCategoria(categoria.id)}
                    className={`${styles.btnDeactivate}`}
                  >
                    Eliminar
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaCategoria;








