import React, { useEffect, useState } from 'react';
import { getUsers } from '../../services/api';
import UserTable from '../../components/UserTable';

const ListaUsuario = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(data => setUsers(data.users));
  }, []);

  return (
    <div>
      <h2>Usuarios Registrados</h2>
      <UserTable users={users} />
    </div>
  );
};

export default ListaUsuario;
