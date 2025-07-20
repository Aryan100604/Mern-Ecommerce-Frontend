import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import App, { AppContext } from "../App";
import "./Header.css";

export default function Header() {
  const { user } = useContext(AppContext);
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <h1 className="header-title">
            <span className="gradient-text">Coffee</span>
            <span className="header-subtitle">Zoo</span>
          </h1>
        </div>
        
        <nav className="header-nav">
          <Link to="/" className="nav-link">
            <span className="nav-icon">🏠</span>
            <span className="nav-text">Home</span>
          </Link>
          
          <Link to="/cart" className="nav-link">
            <span className="nav-icon">🛒</span>
            <span className="nav-text">MyCart</span>
          </Link>
          
          <Link to="/order" className="nav-link">
            <span className="nav-icon">📦</span>
            <span className="nav-text">MyOrder</span>
          </Link>
          
          {user?.role === "admin" && (
            <Link to="/admin" className="nav-link admin-link">
              <span className="nav-icon">⚙️</span>
              <span className="nav-text">Admin</span>
            </Link>
          )}
          
          {user?.token ? (
            <Link to="/profile" className="nav-link profile-link">
              <span className="nav-icon">👤</span>
              <span className="nav-text">Profile</span>
            </Link>
          ) : (
            <Link to="/login" className="nav-link login-link">
              <span className="nav-icon">🔐</span>
              <span className="nav-text">Login</span>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
