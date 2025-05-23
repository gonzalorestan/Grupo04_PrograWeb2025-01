import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserTable = ({ users }) => {
  const navigate = useNavigate();

  return (
    <table>
      <thead>
        <tr><th>ID</th><th>Nombre</th><th>Email</th><th>Acciones</th></tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.firstName} {user.lastName}</td>
            <td>{user.email}</td>
            <td>
              <button onClick={() => navigate(`/admin/users/${user.id}`)}>Ver detalle</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
