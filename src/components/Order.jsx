import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../App";
import "./Order.css";
export default function Order() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { user } = useContext(AppContext);
  const [error, setError] = useState();
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {
    try {
      const url = `${API_URL}/api/orders/${user.email}`;
      const result = await axios.get(url);
      setOrders(result.data);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="order-page main-content">
      <div className="order-header">
        <h1 className="order-title gradient-text">My CoffeeZoo Orders</h1>
        <p className="order-subtitle">View your recent CoffeeZoo orders and their status</p>
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="order-list">
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className={`order-card glass animate-fade-in order-status-${order.status.toLowerCase()}`}>
              <div className="order-info">
                <div className="order-id">Order <span className="order-id-value">#{order._id.slice(-6).toUpperCase()}</span></div>
                <div className="order-value">Total: <span className="order-value-amount">${order.orderValue}</span></div>
                <div className={`order-status order-status-${order.status.toLowerCase()}`}>{order.status}</div>
              </div>
              <div className="order-items-table-container">
                <table className="order-items-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item) => (
                      <tr key={item._id}>
                        <td>{item.productName}</td>
                        <td>${item.price}</td>
                        <td>{item.qty}</td>
                        <td>${item.qty * item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        ) : (
          <div className="order-empty">
            <div className="order-empty-icon">☕</div>
            <h3>No orders found</h3>
            <p>Looks like you haven't placed any orders yet on CoffeeZoo.</p>
          </div>
        )}
      </div>
    </div>
  );
}
