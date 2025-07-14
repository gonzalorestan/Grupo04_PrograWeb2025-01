import React, { useEffect, useState } from 'react';
import { getOrder, getUser } from '../../services/api';
import { useParams } from 'react-router-dom';
import styles from './Admin.module.css';

const DetalleOrden = () => {
  const { id } = useParams();
  const [orden, setOrden] = useState(null);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    getOrder(id).then(data => {
      setOrden(data);
      getUser(data.userId).then(user => setUsuario(user));
    });
  }, [id]);

  return orden ? (
    <div className={styles.adminTableContainer}>
      <h2>Detalle de la Orden #{orden.id}</h2>
      <p><strong>ID del Usuario:</strong> {orden.userId}</p>
      <p><strong>Nombre del Usuario:</strong> {usuario ? `${usuario.firstName} ${usuario.lastName}` : 'Cargando...'}</p>
      <p><strong>Total:</strong> S/ {orden.total.toFixed(2)}</p>

      <h3>Productos Incluidos</h3>
      <table className={styles.adminTable}>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {orden.products.map((producto, indice) => (
            <tr key={indice}>
              <td>{producto.title}</td>
              <td>{producto.quantity}</td>
              <td>S/ {producto.price.toFixed(2)}</td>
              <td>S/ {(producto.price * producto.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : <p className={styles.adminTableContainer}>Cargando...</p>;
};

export default DetalleOrden;
