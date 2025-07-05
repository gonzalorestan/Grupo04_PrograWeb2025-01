import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const RutaPrivada = ({ component: Component, ...rest }) => {
  const { usuario, cargando } = useContext(AuthContext);

  if (cargando) {
    return <div>Cargando...</div>;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        usuario ? <Component {...props} /> : <Navigate to="/login" />
      }
    />
  );
};

export default RutaPrivada;