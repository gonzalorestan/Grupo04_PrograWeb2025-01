import React, { useState } from "react";
import EditarPerfil from "../../pages/User/EditarPerfil";
import ListaOrdenUsuario from "../../pages/User/ListaOrdenUsuario";
import Guardados from "../../pages/User/Guardados";

export default function MiCuenta() {
  const [seccion, setSeccion] = useState("info");

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24, marginLeft: '3cm' }}>
      <h1 style={{ fontFamily: 'Montserrat, Bellota Text, sans-serif', fontWeight: 700, fontSize: '2.2rem', marginBottom: 18 }}>Mi Cuenta</h1>
      <div className="micuenta-tabs">
        <button
          className={`micuenta-tab-btn${seccion === "info" ? " selected" : ""}`}
          onClick={() => setSeccion("info")}
        >
          Información de la cuenta
        </button>
        <button
          className={`micuenta-tab-btn${seccion === "compras" ? " selected" : ""}`}
          onClick={() => setSeccion("compras")}
        >
          Lista de compras
        </button>
      </div>
      <div>
        {seccion === "info" && <EditarPerfil modoCompleto={true} />}
        {seccion === "compras" && (
          <>
            <ListaOrdenUsuario />
            <Guardados />
          </>
        )}
      </div>
    </div>
  );
}
