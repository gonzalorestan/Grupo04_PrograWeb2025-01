import React, { useEffect, useState } from 'react';
import { getUser } from '../../services/api';
import { useParams } from 'react-router-dom';

const DetalleUsuario = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser(id).then(data => setUser(data));
  }, [id]);

  return user ? (
    <div>
      <h2>Detalle del usuario</h2>
      <p><strong>Nombre:</strong> {user.firstName} {user.lastName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Teléfono:</strong> {user.phone}</p>
    </div>
  ) : <p>Cargando...</p>;
};

export default DetalleUsuario;
