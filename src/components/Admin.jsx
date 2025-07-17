import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Admin() {
  return (
    <div>
      <Link to="/admin">Uers</Link>
      <Link to="/admin/products">Products</Link>
      <Link to="/admin/orders">Orders</Link>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
