import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./page/Home";
import Products from "./page/Products";
import Contact from "./page/Contact";
import Register from "./page/Register 2";
import Login from "./page/Login";

import AdminProductos from "./page/AdminProductos";
import ProtectedRoute from "./routes/ProtectedRoute";

import "./css/style.css";

function App() {
    return (
        <Router>
            <Navbar />

            <Routes>
                {/* Rutas públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/productos" element={<Products />} />
                <Route path="/contacto" element={<Contact />} />
                <Route path="/register" element={<Register/>} />
                <Route path="/login" element={<Login />} />

                {/* Rutas ADMIN */}
                <Route element={<ProtectedRoute role="ADMIN" />}>
                    <Route path="/admin/productos" element={<AdminProductos />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
