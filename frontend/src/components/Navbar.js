import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../css/style.css";
import { getCurrentUser, isAdmin, logout } from "../service/auth";

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(0);
    const [user, setUser] = useState(null);

    // ✅ Obtener usuario desde auth service
    useEffect(() => {
        const currentUser = getCurrentUser();
        setUser(currentUser);
    }, [location]);

    const isProductsPage = location.pathname === "/productos";

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

    const handleLogout = () => {
        logout();
        setUser(null); // ✅ Actualizar estado local
        navigate("/login");
    };

    return (
        <header className="navbar-container">
            {/* IZQUIERDA */}
            <nav className="nav-section nav-left">
                <Link to="/" className="btn-nav-style">🏠 Inicio</Link>
                <Link to="/productos" className="btn-nav-style">🕹️ Productos</Link>
                <Link to="/contacto" className="btn-nav-style">📩 Contacto</Link>

                {isAdmin() && (
                    <Link to="/admin/productos" className="btn-nav-style admin-btn">
                        🛠 Admin
                    </Link>
                )}
            </nav>

            {/* CENTRO */}
            <div className="nav-section nav-center">
                <h1 className="titulo">🎮 Level-Up Gamer 👾</h1>
            </div>

            {/* DERECHA */}
            <div className="nav-section nav-right">
                {/* Icono carrito */}
                {isProductsPage && (
                    <Link to="/carrito" className="cart-link">
                        🛒
                        {cartCount > 0 && (
                            <span className="cart-badge">{cartCount}</span>
                        )}
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
                    <div className="auth-buttons-group">
                        <span className="user-greeting">
                            👋 Hola, <strong>{user.email}</strong>
                        </span>

                        <button
                            className="btn-login"
                            style={{ backgroundColor: "#e74c3c" }}
                            onClick={handleLogout}
                        >
                            🚪 Cerrar sesión
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;