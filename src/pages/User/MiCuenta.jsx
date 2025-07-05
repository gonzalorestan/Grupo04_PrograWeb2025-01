import React, { useState } from "react";
import EditarPerfil from "../../pages/User/EditarPerfil";
import ListaOrdenUsuario from "../../pages/User/ListaOrdenUsuario";

export default function MiCuenta() {
  const [seccion, setSeccion] = useState("usuario");

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontFamily: 'Montserrat, Bellota Text, sans-serif', fontWeight: 700, fontSize: '2.2rem', marginBottom: 18 }}>Mi Cuenta</h1>
      <div className="micuenta-tabs">
        <button
          className={`micuenta-tab-btn${seccion === "usuario" ? " selected" : ""}`}
          onClick={() => setSeccion("usuario")}
        >
          Datos del Usuario
        </button>
        <button
          className={`micuenta-tab-btn${seccion === "compras" ? " selected" : ""}`}
          onClick={() => setSeccion("compras")}
        >
          Compras
        </button>
      </div>
      <div>
        {seccion === "usuario" && <EditarPerfil modoCompleto={true} />}
        {seccion === "compras" && <ListaOrdenUsuario />}
      </div>
    </div>
  );
}
