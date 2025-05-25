import React, { useEffect, useState } from 'react';
import { getUsers, toggleUserStatus } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import styles from './Admin.module.css';

const ListaUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const navegar = useNavigate();

  useEffect(() => {
    getUsers().then(data => {
      const usuariosFormateados = data.users.map(usuario => ({
        id: usuario.id,
        nombre: `${usuario.firstName} ${usuario.lastName}`,
        correo: usuario.email,
        activo: true
      }));
      setUsuarios(usuariosFormateados);
      setUsuariosFiltrados(usuariosFormateados);
    });
  }, []);

  const alternarEstado = (idUsuario) => {
    const actualizados = usuarios.map(usuario =>
      usuario.id === idUsuario ? { ...usuario, activo: !usuario.activo } : usuario
    );
    setUsuarios(actualizados);
    setUsuariosFiltrados(actualizados);
    toggleUserStatus(idUsuario, !usuarios.find(u => u.id === idUsuario).activo);
  };

  const manejarBusqueda = (e) => {
    const termino = e.target.value;
    setBusqueda(termino);
    const filtrados = usuarios.filter(usuario =>
      usuario.nombre.toLowerCase().includes(termino.toLowerCase()) ||
      usuario.id.toString().includes(termino)
    );
    setUsuariosFiltrados(filtrados);
  };

  return (
    <div className={styles.adminTableContainer}>
      <h3>Lista de Usuarios Registrados</h3>

      <input
        type="text"
        placeholder="Buscar por nombre o ID"
        value={busqueda}
        onChange={manejarBusqueda}
        style={{ marginBottom: '15px', padding: '8px', width: '100%', maxWidth: '400px' }}
      />

      <table className={styles.adminTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuariosFiltrados.map(usuario => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.correo}</td>
              <td>{usuario.activo ? 'Activo' : 'Inactivo'}</td>
              <td>
                <button 
                  className={styles.btnDetail}
                  onClick={() => navegar(`/admin/usuarios/${usuario.id}`)}
                >
                  Ver Detalle
                </button>
                <button
                  className={usuario.activo ? styles.btnDeactivate : styles.btnActivate}
                  onClick={() => alternarEstado(usuario.id)}
                >
                  {usuario.activo ? 'Desactivar' : 'Activar'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaUsuario;
