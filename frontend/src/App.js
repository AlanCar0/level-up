import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Componentes y Páginas
import Navbar from "./components/Navbar";
import Home from "./page/Home";
import Products from "./page/Products";
import Contact from "./page/Contact";
import Register from "./page/Register 2";
import Login from "./page/Login";
import AdminProductos from "./page/AdminProductos";

// Rutas protegidas y Estilos
import ProtectedRoute from "./routes/ProtectedRoute";
import "./css/style.css";

function App() {
    return (
        <Router>
            {/* Navbar GLOBAL (Aparece en todas las páginas) */}
            <Navbar />

            <Routes>
                {/* 🏠 Rutas Públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/contacto" element={<Contact />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                {/* 🛒 Ruta Protegida: Clientes (Requiere Login, NO requiere Admin) */}
                <Route 
                    path="/productos" 
                    element={
                        <ProtectedRoute requireAdmin={false}>
                            <Products />
                        </ProtectedRoute>
                    } 
                />

                {/* ⚙️ Ruta Protegida: Administrador (Requiere Login Y ser Admin) */}
                <Route 
                    path="/admin/productos" 
                    element={
                        <ProtectedRoute requireAdmin={true}>
                            <AdminProductos />
                        </ProtectedRoute>
                    } 
                />
            </Routes>
        </Router>
    );
}

export default App;