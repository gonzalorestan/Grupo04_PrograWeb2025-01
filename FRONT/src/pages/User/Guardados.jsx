import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Guardados.css";

const ListaDeseos = () => {
  const [deseos, setDeseos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (user && user.correo) {
      let deseosUsuario = JSON.parse(localStorage.getItem(`guardados_${user.correo}`)) || [];
      // Filtrar para que solo haya un producto por modelo (id)
      const unicos = [];
      const ids = new Set();
      for (const item of deseosUsuario) {
        if (!ids.has(item.id)) {
          unicos.push(item);
          ids.add(item.id);
        }
      }
      setDeseos(unicos);
      // Opcional: actualizar localStorage para mantenerlo limpio
      localStorage.setItem(`guardados_${user.correo}` , JSON.stringify(unicos));
    }
  }, []);

  const eliminarDeseo = (id) => {
    const user = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (user && user.correo) {
      const nuevosDeseos = deseos.filter(item => item.id !== id);
      setDeseos(nuevosDeseos);
      localStorage.setItem(`guardados_${user.correo}`, JSON.stringify(nuevosDeseos));
    }
  };

  return (
    <div className="compras-lista">
      <h2 style={{ marginTop: 32, marginBottom: 16 }}>Lista de deseos ({deseos.length} productos)</h2>
      {deseos.length === 0 ? (
        <p>No tienes productos en tu lista de deseos.</p>
      ) : (
        <div style={{ marginBottom: 32 }}>
          {deseos.map((item) => (
            <div key={item.id + '-' + item.talla} style={{ display: 'flex', alignItems: 'center', background: '#fff', border: '1px solid #ddd', borderRadius: 10, padding: 18, marginBottom: 16, justifyContent: 'space-between' }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 18 }}>{item.nombre}</div>
                <div style={{ color: '#444', fontSize: 15 }}>{item.categoria} - Talla: {item.talla}</div>
                <div style={{ color: '#c00', fontWeight: 700, fontSize: 17, marginTop: 4 }}>S/. {item.precio}</div>
              </div>
              <img
                src={item.imagen}
                alt={item.nombre}
                style={{ width: 80, height: 60, objectFit: 'contain', marginLeft: 18, cursor: 'pointer' }}
                onClick={() => navigate(`/producto/${item.id}`)}
              />
              <button onClick={() => eliminarDeseo(item.id)} style={{ marginLeft: 18, background: '#db2d2d', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 14px', fontWeight: 600, cursor: 'pointer' }}>Eliminar</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListaDeseos;
