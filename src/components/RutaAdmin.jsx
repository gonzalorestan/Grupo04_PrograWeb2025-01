import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import RutaPrivada from './RutaPrivada';

const RutaAdmin = ({ children }) => {
  const { usuario } = useContext(AuthContext);

  if (!usuario?.es_admin) {
    return <Navigate to="/" />;
  }

  return <RutaPrivada>{children}</RutaPrivada>;
};

export default RutaAdmin;