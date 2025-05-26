import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import TopBar from "./components/TopBar/TopBar";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import ProductPage from "./pages/ProductPage/ProductPage";
import ProductDetail from "./pages/ProductDetail";
import Carrito from "./pages/Carrito";
import Checkout from "./pages/Checkout/Checkout";
import OrdenCompletada from "./pages/OrdenCompletada";
import UserList from "./pages/Admin/ListaUsuario";
import OrderList from "./pages/Admin/ListaOrden";
import DetalleUsuario from './pages/Admin/DetalleUsuario';
import DetalleOrden from './pages/Admin/DetalleOrden';
import OrderUserList from "./pages/User/ListaOrdenUsuario";
import OrderUserDetail from "./pages/User/DetalleOrdenUsuario";
import ForgotPassword from "./pages/Login/ForgotPassword";
import PrivateRoute from "./pages/Components/PrivateRoute"
import CambiarPassword from "./pages/User/CambiarPassword"
import EditarPerfil from "./pages/User/EditarPerfil"

export default function App() {
  const [usuarioActivo, setUsuarioActivo] = useState(() => {
    const guardado = localStorage.getItem("usuarioActivo");
    return guardado ? JSON.parse(guardado) : null;
  });

  const [carrito, setCarrito] = useState([]);
  const [guardados, setGuardados] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      const user = JSON.parse(localStorage.getItem("usuarioActivo"));
      setUsuarioActivo(user);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const actualizarUsuarioActivo = (usuario) => {
    if (usuario) {
      localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
      setUsuarioActivo(usuario);
    } else {
      localStorage.removeItem("usuarioActivo");
      setUsuarioActivo(null);
    }
  };

  // Función que redirige al detalle de producto
  const handleShowProduct = (product) => {
    navigate(`/producto/${product.id}`);
  };

  return (
    <>
      <TopBar
        usuarioActivo={usuarioActivo}
        actualizarUsuarioActivo={actualizarUsuarioActivo}
      />
      <main style={{ marginTop: "80px" }}>
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                onShowProduct={handleShowProduct} 
              />
            } 
          />
          <Route path="/login" element={<Login actualizarUsuarioActivo={actualizarUsuarioActivo} />} />
          <Route path="/signup" element={<SignUp actualizarUsuarioActivo={actualizarUsuarioActivo} />} />
          <Route path="/productos/:genero/:categoria" element={<ProductPage />} />
          <Route path="/admin/usuario" element={<UserList />} />
          <Route path="/admin/orden" element={<OrderList />} />
          <Route path="/admin/usuarios/:id" element={<DetalleUsuario />} />
          <Route path="/admin/ordenes/:id" element={<DetalleOrden />} />
          <Route path="/producto/:id" element={<ProductDetail setCarrito={setCarrito} setGuardados={setGuardados} />} />
          <Route path="/carrito" element={<Carrito carrito={carrito} setCarrito={setCarrito} guardados={guardados} setGuardados={setGuardados} />} />
          <Route path="/checkout" element={<Checkout carrito={carrito} setCarrito={setCarrito} />} />
          <Route path="/orden-completada" element={<OrdenCompletada />} />
          <Route path="/user/orders" element={ <OrderUserList /> } />
          <Route path="/user/orders/:id" element={<OrderUserDetail /> } />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/user/editar-perfil" element={ <EditarPerfil /> } />
          <Route path="/user/cambiar-password" element={ <CambiarPassword />} />
          <Route path="*" element={<h2 style={{ margin: "50px", textAlign: "center" }}>Página no encontrada.</h2>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
