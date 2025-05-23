import React, { useEffect, useState } from 'react';
import { getOrder } from '../../services/api';
import { useParams } from 'react-router-dom';

const DetalleOrden = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    getOrder(id).then(data => setOrder(data));
  }, [id]);

  return order ? (
    <div>
      <h2>Detalle de Orden #{order.id}</h2>
      <p><strong>ID Usuario:</strong> {order.userId}</p>
      <p><strong>Total:</strong> ${order.total}</p>
      <h3>Productos</h3>
      <ul>
        {order.products.map((prod, idx) => (
          <li key={idx}>{prod.title} - {prod.quantity} x ${prod.price}</li>
        ))}
      </ul>
    </div>
  ) : <p>Cargando...</p>;
};

export default DetalleOrden;
