import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // ✅ BrowserRouter correcto

// Componentes y Páginas
import Navbar from "./components/Navbar";
import Home from "./page/Home";
import Products from "./page/Products";
import Contact from "./page/Contact";
import Register from "./page/Register 2";
import Login from "./page/Login";
import AdminProductos from "./page/AdminProductos";

// Rutas protegidas y Estilos
import { ProtectedRoute, AdminRoute } from "./routes/ProtectedRoute"; // ✅ Importar ambos
import "./css/style.css";

function App() {
  return (
    <BrowserRouter> {/* ✅ Solo BrowserRouter, no Router */}
      <Navbar />
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/productos" element={<Products />} />
        <Route path="/contacto" element={<Contact />} />
        
        {/* Ruta protegida para usuarios */}
        {/* NOTA: Si no tienes Carrito, comenta o crea el componente */}
        {/* <Route path="/carrito" element={
          <ProtectedRoute>
            <Carrito />
          </ProtectedRoute>
        } /> */}
        
        {/* Ruta solo para admin */}
        <Route path="/admin/productos" element={
          <AdminRoute>
            <AdminProductos />
          </AdminRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;