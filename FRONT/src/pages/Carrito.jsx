import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Carrito.module.css";
import GuestOrLoginModal from "../components/GuestOrLoginModal";
import { useAuth } from "../pages/Context/AuthContext";
import { agregarADeseos } from "../utils/deseos";

const Carrito = ({ carrito, setCarrito, guardados, setGuardados }) => {
  const navigate = useNavigate();
  const [showGuestModal, setShowGuestModal] = useState(false);
  const { user } = useAuth();

  // Sincronizar guardados con localStorage al cargar
  React.useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (usuario && usuario.correo) {
      const key = `guardadosCarrito_${usuario.correo}`;
      const guardadosStorage = JSON.parse(localStorage.getItem(key)) || [];
      setGuardados(guardadosStorage);
    }
    // eslint-disable-next-line
  }, []);

  // Guardar en localStorage cada vez que cambia guardados
  React.useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (usuario && usuario.correo) {
      const key = `guardadosCarrito_${usuario.correo}`;
      localStorage.setItem(key, JSON.stringify(guardados));
    }
  }, [guardados]);

  const moverAGuardados = (id) => {
    const producto = carrito.find((item) => item.id === id);
    if (producto) {
      // Evitar duplicados en guardados por id y talla
      const yaGuardado = guardados.some(item => item.id === producto.id && item.talla === producto.talla);
      if (!yaGuardado) {
        setGuardados([...guardados, producto]);
        setCarrito(carrito.filter((item) => !(item.id === id && item.talla === producto.talla)));
      } else {
        alert("Este producto ya está en guardados.");
      }
    }
  };

  const subirAlCarrito = (id) => {
    const producto = guardados.find((item) => item.id === id);
    if (producto) {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
      setGuardados(guardados.filter((item) => item.id !== id));
    }
  };

  const eliminar = (id, origen) => {
    if (origen === "carrito") {
      setCarrito(carrito.filter((item) => item.id !== id));
    } else if (origen === "guardado") {
      setGuardados(guardados.filter((item) => item.id !== id));
      // Ya no es necesario modificar localStorage aquí, se sincroniza por useEffect
    }
  };

  const subtotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <div className={styles.carritoContainer}>
      <div className={styles.columnaProductos}>
        <h2 className={styles.tituloSeccion}>Carrito ({carrito.length} productos)</h2>
        {carrito.map((item) => (
          <div key={item.id} className={styles.itemProducto}>
            <img src={item.imagen} alt={item.nombre} className={styles.imagenProducto} />
            <div className={styles.detalles}>
              <div className={styles.nombreProducto}>{item.nombre}</div>
              <div className={styles.categoriaTalla}>
                {item.categoria} - Talla: {item.talla}
              </div>
              <div className={styles.precio}>S/. {item.precio}</div>
            </div>
            <div className={styles.botonesAccion}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button className={styles.boton} onClick={() => setCarrito(carrito.map(item2 => item2.id === item.id && item2.talla === item.talla ? { ...item2, cantidad: item2.cantidad - 1 } : item2))} disabled={item.cantidad <= 1}>−</button>
                <span style={{ minWidth: 24, textAlign: 'center' }}>{item.cantidad}</span>
                <button className={styles.boton} onClick={() => setCarrito(carrito.map(item2 => item2.id === item.id && item2.talla === item.talla ? { ...item2, cantidad: item2.cantidad + 1 } : item2))}>+</button>
              </div>
              <button className={styles.boton} onClick={() => moverAGuardados(item.id)}>Guardar</button>
              <button className={styles.boton} onClick={() => eliminar(item.id, "carrito")}>🗑</button>
            </div>
          </div>
        ))}

        <h2 className={styles.tituloSeccion}>Guardados ({guardados.length} productos)</h2>
        {guardados.map((item) => (
          <div key={item.id} className={styles.itemProducto}>
            <img src={item.imagen} alt={item.nombre} className={styles.imagenProducto} />
            <div className={styles.detalles}>
              <div className={styles.nombreProducto}>{item.nombre}</div>
              <div className={styles.categoriaTalla}>
                {item.categoria} - Talla: {item.talla}
              </div>
              <div className={styles.precio}>S/. {item.precio}</div>
            </div>
            <div className={styles.botonesAccion}>
              <button className={styles.boton} onClick={() => subirAlCarrito(item.id)}>Subir al carrito</button>
              <button className={styles.boton} onClick={() => eliminar(item.id, "guardado")}>🗑</button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.columnaResumen}>
        <div className={styles.resumen}>
          <h3>Resumen</h3>
          <p>Subtotal: <span style={{ color: "#c00" }}>S/. {subtotal.toFixed(2)}</span></p>
          <p>Envío: <span style={{ color: "#c00" }}>GRATIS</span></p>
          <h3>Total: <span style={{ color: "#c00" }}>S/. {subtotal.toFixed(2)}</span></h3>
          <button className={styles.checkoutButton} onClick={() => {
            if (user) {
              navigate("/checkout");
            } else {
              setShowGuestModal(true);
            }
          }}>
            Checkout
          </button>
        </div>
      </div>
      {showGuestModal && (
        <GuestOrLoginModal
          onClose={() => setShowGuestModal(false)}
          onGuest={email => {
            setShowGuestModal(false);
            // Guardar email de invitado si se requiere
            navigate("/checkout?guest=" + encodeURIComponent(email));
          }}
          onLogin={() => {
            setShowGuestModal(false);
            navigate("/login");
          }}
        />
      )}
    </div>
  );
};

export default Carrito;
