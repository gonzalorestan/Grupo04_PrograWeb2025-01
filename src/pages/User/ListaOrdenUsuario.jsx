import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./ListaOrdenUsuario.css";
import products from '../../data/products';
import ListaDeseos from "./Guardados";

const estadosEnvio = ["En camino", "Completado"];

const ListaOrdenUsuario = () => {
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [estados, setEstados] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (user && user.correo) {
      const comprasUsuario = JSON.parse(localStorage.getItem(`compras_${user.correo}`)) || [];
      setCompras(comprasUsuario);
      // Generar estados de envío aleatorios para cada compra
      setEstados(comprasUsuario.map(() => estadosEnvio[Math.floor(Math.random() * estadosEnvio.length)]));
    }
    setLoading(false);
  }, []);

  const cancelarOrden = (idx) => {
    // Cambia el estado de la orden a 'Cancelada' (opcional: puedes eliminarla o marcarla)
    const nuevasCompras = compras.map((c, i) => i === idx ? { ...c, cancelada: true } : c);
    setCompras(nuevasCompras);
    // Actualizar en localStorage
    const user = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (user && user.correo) {
      localStorage.setItem(`compras_${user.correo}`, JSON.stringify(nuevasCompras));
    }
  };

  // Busca la imagen real del producto por nombre y/o id
  const getImagenProducto = (prod) => {
    // Busca por id si existe, si no por nombre
    let producto = null;
    if (prod.id) {
      producto = products.find(p => p.id === prod.id);
    }
    if (!producto) {
      producto = products.find(p => p.nombre === prod.nombre);
    }
    if (producto && producto.imagen) {
      // Si la ruta no empieza con http, asume que es de public/resources
      if (producto.imagen.startsWith('/')) {
        return process.env.PUBLIC_URL + producto.imagen;
      }
      return producto.imagen;
    }
    // Si no encuentra, usa la que está guardada o un placeholder
    return prod.imagen || '/resources/placeholder.png';
  };

  if (loading) return <div className="loading">Cargando compras... </div>

  return (
    <div className="compras-lista" style={{ marginLeft: 40 }}>
      <h1>Mi Cuenta</h1>
      <div className="account-actions">
        <button onClick={() => navigate("/user/editar-perfil")}>
          Datos de registro
        </button>
        <button onClick={() => navigate("/user/cambiar-password")}>
          Cambiar Password
        </button>
      </div>
      <h2 style={{ marginTop: 32, marginBottom: 16 }}>Lista de Compras</h2>
      {compras.length === 0 ? (
        <p>No tienes compras registradas aún.</p>
      ) : (
        <ul className="compras-ul">
          {compras.map((compra, idx) => {
            const estadoEnvio = estados[idx] || "En camino";
            const cancelada = compra.cancelada;
            return (
              <li key={idx} className="compra-item" style={{ marginBottom: 24, background: '#f8f8f8', borderRadius: 8, padding: 16 }}>
                <div><strong>Fecha:</strong> {compra.fecha || "-"}</div>
                <div><strong>Total:</strong> S/. {compra.total}</div>
                <div>
                  <strong>Productos:</strong>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {compra.productos.map((prod, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                        <img src={getImagenProducto(prod)} alt={prod.nombre} style={{ width: 200, height: 160, objectFit: 'contain', marginRight: 24, background: '#fff', borderRadius: 12 }} />
                        <span>{prod.nombre} (Talla: {prod.talla}) x{prod.cantidad} - S/. {prod.precio}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {compra.metodoPago && <div><strong>Método de pago:</strong> {compra.metodoPago}</div>}
                <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
                  <button
                    onClick={() => cancelarOrden(idx)}
                    disabled={estadoEnvio === "Completado" || cancelada}
                    style={{ background: cancelada ? '#ccc' : '#db2d2d', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600, cursor: cancelada ? 'not-allowed' : 'pointer' }}
                  >
                    {cancelada ? "Orden Cancelada" : "Cancelar Orden"}
                  </button>
                  <button
                    style={{ background: estadoEnvio === "Completado" ? '#388e3c' : '#1976d2', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 18px', fontWeight: 600 }}
                    disabled
                  >
                    Estado de envío: {estadoEnvio}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      {/* Sección de lista de deseos debajo de la lista de compras */}
      <ListaDeseos />
    </div>
  );
};

export default ListaOrdenUsuario;