import React, { useEffect, useState } from 'react';
import { getOrders, getUsers } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import styles from './Admin.module.css';

const ListaOrden = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [ordenesFiltradas, setOrdenesFiltradas] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [usuariosPorId, setUsuariosPorId] = useState({});
  const navegar = useNavigate();

  useEffect(() => {
    Promise.all([getOrders(), getUsers()]).then(([datosOrdenes, datosUsuarios]) => {
      const mapaUsuarios = {};
      datosUsuarios.users.forEach(usuario => {
        mapaUsuarios[usuario.id] = `${usuario.firstName} ${usuario.lastName}`;
      });
      setUsuariosPorId(mapaUsuarios);

      const formateadas = datosOrdenes.carts.map(orden => ({
        ...orden,
        nombreUsuario: mapaUsuarios[orden.userId] || `Usuario ${orden.userId}`,
        fecha: new Date().toISOString().split('T')[0],
        estado: "Completada"
      }));

      setOrdenes(formateadas);
      setOrdenesFiltradas(formateadas);
    });
  }, []);

  const cancelarOrden = (idOrden) => {
    const actualizadas = ordenes.map(orden =>
      orden.id === idOrden ? { ...orden, estado: "Cancelada" } : orden
    );
    setOrdenes(actualizadas);
    aplicarFiltro(busqueda, actualizadas);
  };

  const aplicarFiltro = (termino, lista = ordenes) => {
    const filtradas = lista.filter(orden =>
      orden.nombreUsuario.toLowerCase().includes(termino.toLowerCase()) ||
      orden.id.toString().includes(termino)
    );
    setOrdenesFiltradas(filtradas);
  };

  const manejarBusqueda = (e) => {
    const valor = e.target.value;
    setBusqueda(valor);
    aplicarFiltro(valor);
  };

  return (
    <div className={styles.adminTableContainer}>
      <h3>Lista de Órdenes Recientes</h3>

      <input
        type="text"
        placeholder="Buscar por nombre o ID de orden"
        value={busqueda}
        onChange={manejarBusqueda}
        style={{ marginBottom: '15px', padding: '8px', width: '100%', maxWidth: '400px' }}
      />

      <table className={styles.adminTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Total</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ordenesFiltradas.map(orden => (
            <tr key={orden.id}>
              <td>{orden.id}</td>
              <td>{orden.nombreUsuario}</td>
              <td>{new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' }).format(orden.total)}</td>
              <td>{orden.fecha}</td>
              <td>{orden.estado}</td>
              <td>
                <button
                  className={styles.btnDetail}
                  onClick={() => navegar(`/admin/ordenes/${orden.id}`)}
                >
                  Ver Detalle
                </button>
                {orden.estado !== "Cancelada" && (
                  <button
                    className={styles.btnCancel}
                    onClick={() => cancelarOrden(orden.id)}
                  >
                    Cancelar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaOrden;

