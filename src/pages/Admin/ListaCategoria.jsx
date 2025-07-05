import React from 'react';
import { Link } from 'react-router-dom';
import { useCategoria } from '../Context/ContextoCategoria';
import TablaCategoria from '../../components/TablaCategoria';
import styles from './Admin.module.css';

const ListaCategoria = () => {
  const { categorias } = useCategoria();

  return (
    <div className={styles.adminMenu}>
      <h1 className="text-2xl font-bold mb-4">Gestión de Categorías</h1>

      <div className="mb-4">
        <Link to="/admin/categorias/agregar" className={styles.btnActivate}>
          + Nueva Categoría
        </Link>
      </div>

      <div className={styles.adminTableContainer}>
        {categorias && categorias.length === 0 ? (
          <p>No hay categorías registradas.</p>
        ) : (
          <TablaCategoria categorias={categorias} />
        )}
      </div>
    </div>
  );
};

export default ListaCategoria;






