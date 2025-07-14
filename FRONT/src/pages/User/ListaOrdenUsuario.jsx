import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./ListaOrdenUsuario.css";
import products from '../../data/products';
import ListaDeseos from "./Guardados";
import { getOrdersPage } from '../../services/api';

const estadosEnvio = ["Pendiente", "En camino", "Completado"];

const ListaOrdenUsuario = () => {
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [estados, setEstados] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("Token no encontrado");
          return;
        }

        const data = await getOrdersPage(1, 10, token);
        setCompras(data.orders || []);
        setEstados(data.orders.map(() => estadosEnvio[Math.floor(Math.random() * estadosEnvio.length)]));
      } catch (error) {
        console.error("Error al obtener órdenes:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
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

  const th = {
    textAlign: "left",
    padding: "12px 16px",
    borderBottom: "2px solid #ccc"
  };

  const td = {
    padding: "12px 16px",
    verticalAlign: "top"
  };

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
      {Array.isArray(compras) && compras.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 32 }}>
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th style={th}>Fecha</th>
              <th style={th}>Total</th>
              <th style={th}>Método de Pago</th>
              <th style={th}>Productos</th>
              <th style={th}>Estado de Envío</th>
            </tr>
          </thead>
          <tbody>
            {compras.map((orden, idx) => {
              const estadoEnvio = estados[idx] || "En camino";
              return (
                <tr key={orden.id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={td}>{new Date(orden.createdAt).toLocaleString()}</td>
                  <td style={td}>S/. {orden.total.toFixed(2)}</td>
                  <td style={td}>{orden.paymentMethod || "No especificado"}</td>
                  <td style={td}>
                    <ul style={{ margin: 0, paddingLeft: 16 }}>
                      {orden.OrderItems?.map((item, i) => (
                        <li key={i}>
                          Producto #{item.ProductId} x{item.quantity} - S/. {(item.price * item.quantity).toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td style={td}>
                    <span style={{
                      backgroundColor: estadoEnvio === "Completado" ? "#4caf50" : "#2196f3",
                      color: "white",
                      padding: "6px 12px",
                      borderRadius: "6px",
                      fontWeight: "bold",
                      display: "inline-block"
                    }}>
                      {estadoEnvio}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No tienes compras registradas aún.</p>
      )}
      {/* Sección de lista de deseos debajo de la lista de compras */}
      <ListaDeseos />
    </div>
  );
};

export default ListaOrdenUsuario;