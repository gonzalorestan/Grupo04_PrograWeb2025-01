import React, { useEffect, useState } from 'react';
import { getUser, getOrders } from '../../services/api';
import { useParams } from 'react-router-dom';
import styles from './Admin.module.css';

const DetalleUsuario = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    getUser(id).then(data => setUsuario(data));
    getOrders().then(data => {
      const ordenesDelUsuario = data.carts.filter(orden => orden.userId === parseInt(id));
      setOrdenes(ordenesDelUsuario);
    });
  }, [id]);

  return usuario ? (
    <div className={styles.adminTableContainer}>
      <h2>Detalle del Usuario</h2>
      <table className={styles.adminTable}>
        <tbody>
          <tr><th>ID</th><td>{usuario.id}</td></tr>
          <tr><th>Nombre</th><td>{usuario.firstName} {usuario.lastName}</td></tr>
          <tr><th>Correo electrónico</th><td>{usuario.email}</td></tr>
          <tr><th>Teléfono</th><td>{usuario.phone}</td></tr>
          <tr><th>Edad</th><td>{usuario.age}</td></tr>
          <tr><th>Género</th><td>{usuario.gender}</td></tr>
        </tbody>
      </table>

      <h3 style={{ marginTop: '30px' }}>Órdenes del Usuario</h3>
      {ordenes.length > 0 ? (
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Total</th>
              <th>Productos</th>
            </tr>
          </thead>
          <tbody>
            {ordenes.map(orden => (
              <tr key={orden.id}>
                <td>{orden.id}</td>
                <td>S/ {orden.total.toFixed(2)}</td>
                <td>
                  <ul>
                    {orden.products.map((producto, indice) => (
                      <li key={indice}>
                        {producto.title} — {producto.quantity} x S/ {producto.price}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No se encontraron órdenes para este usuario.</p>
      )}
    </div>
  ) : <p className={styles.adminTableContainer}>Cargando...</p>;
};

export default DetalleUsuario;
