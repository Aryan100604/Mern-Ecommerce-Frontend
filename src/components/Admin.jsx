import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Admin.css";

export default function Admin() {
  return (
    <div className="admin-portal">
      <aside className="admin-sidebar glass">
        <h2 className="admin-title gradient-text">CoffeeZoo Admin</h2>
        <nav className="admin-nav">
          <Link to="/admin" className="admin-link">Users</Link>
          <Link to="/admin/products" className="admin-link">Products</Link>
          <Link to="/admin/orders" className="admin-link">Orders</Link>
        </nav>
      </aside>
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
