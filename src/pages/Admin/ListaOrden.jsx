import React, { useEffect, useState } from 'react';
import { getOrders } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const ListaOrden = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getOrders().then(data => setOrders(data.carts));
  }, []);

  return (
    <div>
      <h2>Listado de Órdenes</h2>
      <table>
        <thead>
          <tr><th>ID</th><th>Usuario</th><th>Total</th><th>Acciones</th></tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.userId}</td>
              <td>${order.total}</td>
              <td>
                <button onClick={() => navigate(`/admin/orders/${order.id}`)}>Ver detalle</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaOrden;
