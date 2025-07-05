import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styles from './Admin.module.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const totalVentasHoy = 1500;
  const totalOrdenesHoy = 23;
  const totalUsuarios = 452;
  const totalProductos = 120;

  return (
    <div className={styles.adminMenu}>
      <h1>Panel de Administración</h1>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li><Link to="/admin/categorias" className={styles.navLink}>Categorías</Link></li>
          <li><Link to="/admin/orden" className={styles.navLink}>Órdenes</Link></li>
          <li><Link to="/admin/usuario" className={styles.navLink}>Usuarios</Link></li>
          <li><Link to="/admin/productos" className={styles.navLink}>Productos</Link></li>
        </ul>
      </nav>

      <div className={styles.adminContent}>
        <h2>Métricas Clave</h2>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '10px' }}>
          <div style={{ background: '#3498db', color: 'white', flex: '1', padding: '20px', borderRadius: '5px' }}>
            <h3>Ventas Hoy</h3>
            <p>S/. {totalVentasHoy}</p>
          </div>
          <div style={{ background: '#2ecc71', color: 'white', flex: '1', padding: '20px', borderRadius: '5px' }}>
            <h3>Órdenes Hoy</h3>
            <p>{totalOrdenesHoy}</p>
          </div>
          <div style={{ background: '#9b59b6', color: 'white', flex: '1', padding: '20px', borderRadius: '5px' }}>
            <h3>Usuarios</h3>
            <p>{totalUsuarios}</p>
          </div>
          <div style={{ background: '#f39c12', color: 'white', flex: '1', padding: '20px', borderRadius: '5px' }}>
            <h3>Productos</h3>
            <p>{totalProductos}</p>
          </div>
        </div>
      </div>

      <div className={styles.adminTableContainer}>
        <h2>Últimas Órdenes</h2>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Monto</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Juan Pérez</td>
              <td>S/. 250</td>
              <td>Completado</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;

