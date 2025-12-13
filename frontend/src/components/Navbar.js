import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/style.css";

const Navbar = () => {
    const location = useLocation();
    const [cartCount, setCartCount] = useState(0);

    let user = null;
    try {
        user = JSON.parse(localStorage.getItem("user"));
    } catch {
        user = null;
    }

    const isProductsPage = location.pathname === "/productos";

    // Lógica del carrito
    useEffect(() => {
        const readCartCount = () => {
            const raw = localStorage.getItem("levelUpCart");
            if (!raw) {
                setCartCount(0);
                return;
            }
            try {
                const arr = JSON.parse(raw);
                if (!Array.isArray(arr)) {
                    setCartCount(0);
                    return;
                }
                const total = arr.reduce((s, it) => s + (it.quantity || 0), 0);
                setCartCount(total);
            } catch {
                setCartCount(0);
            }
        };

        readCartCount();
        const onStorage = (e) => {
            if (e.key === "levelUpCart") readCartCount();
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, [location]);

    return (
        <header className="navbar-container">
            {/* 1. IZQUIERDA: BOTONES DE NAVEGACIÓN */}
            <nav className="nav-section nav-left">
                <Link to="/" className="btn-nav-style">🏠 Inicio</Link>
                <Link to="/productos" className="btn-nav-style">🕹️ Productos</Link>
                <Link to="/contacto" className="btn-nav-style">📩 Contacto</Link>
                {user?.rol === "ADMIN" && (
                    <Link to="/admin/productos" className="btn-nav-style admin-btn">🛠 Admin</Link>
                )}
            </nav>

            {/* 2. CENTRO: TÍTULO CON FUENTE ANTIGUA E ICONOS */}
            <div className="nav-section nav-center">
                <h1 className="titulo">🎮 Level-Up Gamer 👾</h1>
            </div>

            {/* 3. DERECHA: LOGIN / REGISTRO / CARRITO */}
            <div className="nav-section nav-right">
                {isProductsPage && (
                    <Link to="/productos" className="btn-carrito" title="Ver carrito">
                        🛒
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </Link>
                )}

                {!user ? (
                    <div className="auth-buttons-group">
                        <Link to="/login">
                            <button className="btn-login">🔐 Iniciar Sesión</button>
                        </Link>
                        <Link to="/register">
                            <button className="btn-register">🎯 Registrarse</button>
                        </Link>
                    </div>
                ) : (
                    <button
                        className="btn-login"
                        style={{ backgroundColor: "#e74c3c" }}
                        onClick={() => {
                            localStorage.clear();
                            window.location.href = "/login";
                        }}
                    >
                        🚪 Cerrar sesión
                    </button>
                )}
            </div>
        </header>
    );
};

export default Navbar;