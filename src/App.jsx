import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import RutaPrivada from "./components/RutaPrivada";
import RutaAdmin from "./components/RutaAdmin"; 


import TopBar from "./components/TopBar/TopBar";
import Footer from "./components/Footer/Footer";


import Home from "./components/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import ProductPage from "./pages/ProductPage/ProductPage";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import SearchPage from "./pages/SearchPage";
import ForgotPassword from "./pages/Login/ForgotPassword";
import VerificarCodigo from "./pages/Login/VerificarCodigo";
import CambiarPasswordLogin from "./pages/Login/CambiarPassword";


import Carrito from "./pages/Carrito";
import Checkout from "./pages/Checkout/Checkout";
import OrdenCompletada from "./pages/OrdenCompletada";
import OrderUserList from "./pages/User/ListaOrdenUsuario";
import OrderUserDetail from "./pages/User/DetalleOrdenUsuario";
import CambiarPassword from "./pages/User/CambiarPassword";
import EditarPerfil from "./pages/User/EditarPerfil";


import UserList from "./pages/Admin/ListaUsuario";
import OrderList from "./pages/Admin/ListaOrden";
import DetalleUsuario from './pages/Admin/DetalleUsuario';
import DetalleOrden from './pages/Admin/DetalleOrden';
import ListaCategoria from "./pages/Admin/ListaCategoria";
import AgregarCategoria from "./pages/Admin/AgregarCategoria";
import Dashboard from "./pages/Admin/Dashboard";
import ListaProducto from "./pages/Admin/ListaProducto";
import RegistrarProducto from "./pages/Admin/RegistrarProducto";
import DetalleProducto from "./pages/Admin/DetalleProducto";
import EditarProducto from './pages/Admin/EditarProducto';
import AgregarProducto from './pages/Admin/AgregarProducto';

export default function App() {
  const [carrito, setCarrito] = useState([]);
  const [guardados, setGuardados] = useState([]);
  const navigate = useNavigate();

  const handleShowProduct = (product) => {
    navigate(`/producto/${product.id}`);
  };

  return (
    <AuthProvider>
      <TopBar />
      <main style={{ marginTop: "80px" }}>
        <Routes>
        <Route path="/" element={<Home onShowProduct={handleShowProduct} />} />
        <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verificarcodigo" element={<VerificarCodigo />} />
          <Route path="/cambiarcontraseña" element={<CambiarPasswordLogin />} />
          
         
          <Route path="/productos/:genero/:categoria" element={<ProductPage />} />
          <Route path="/productos/:genero" element={<ProductPage />} />
          <Route path="/productos/marca/:marca" element={<ProductPage />} />
          <Route path="/productos" element={<ProductPage />} />
          <Route path="/producto/:id" element={<ProductDetail setCarrito={setCarrito} setGuardados={setGuardados} />} />
          <Route path="/search" element={<SearchPage onShowProduct={handleShowProduct} />} />

         
          <Route element={<RutaPrivada />}>
            <Route path="/carrito" element={<Carrito carrito={carrito} setCarrito={setCarrito} guardados={guardados} setGuardados={setGuardados} />} />
            <Route path="/checkout" element={<Checkout carrito={carrito} setCarrito={setCarrito} />} />
            <Route path="/orden-completada" element={<OrdenCompletada />} />
            <Route path="/user/orders" element={<OrderUserList />} />
            <Route path="/user/orders/:id" element={<OrderUserDetail />} />
            <Route path="/user/editar-perfil" element={<EditarPerfil />} />
            <Route path="/user/cambiar-password" element={<CambiarPassword />} />
          </Route>

  
          <Route element={<RutaAdmin />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/usuario" element={<UserList />} />
            <Route path="/admin/orden" element={<OrderList />} />
            <Route path="/admin/usuarios/:id" element={<DetalleUsuario />} />
            <Route path="/admin/ordenes/:id" element={<DetalleOrden />} />
            <Route path="/admin/categorias" element={<ListaCategoria />} />
            <Route path="/admin/categorias/agregar" element={<AgregarCategoria />} />
            <Route path="/admin/productos" element={<ListaProducto />} />
            <Route path="/admin/productos/registrar" element={<RegistrarProducto />} />
            <Route path="/admin/productos/agregar" element={<AgregarProducto />} />
            <Route path="/admin/productos/:id" element={<DetalleProducto />} />
            <Route path="/admin/productos/editar/:id" element={<EditarProducto />} />
          </Route>

  
          <Route path="*" element={<h2 style={{ margin: "50px", textAlign: "center" }}>Página no encontrada.</h2>} />
        </Routes>
      </main>
      <Footer />
    </AuthProvider>
  );
}