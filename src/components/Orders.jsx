import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../App";
import "./Orders.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState("");
  const { user } = useContext(AppContext);
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchOrders = async () => {
    try {
      const url = `${API_URL}/api/orders/?page=${page}&limit=${limit}&status=${status}`;
      const result = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setOrders(result.data.orders);
      setTotalPages(result.data.total);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line
  }, [status, page]);

  const updateOrder = async (status, id) => {
    try {
      const url = `${API_URL}/api/orders/${id}`;
      await axios.patch(url, { status });
      fetchOrders();
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="main-content orders-page">
      <div className="orders-header">
        <h1 className="orders-title gradient-text">My Orders</h1>
        <p className="orders-subtitle">Track and manage your CoffeeZoo orders</p>
      </div>

      <div className="orders-filter glass">
        <label htmlFor="order-status" className="orders-filter-label">Filter by status:</label>
        <select
          id="order-status"
          className="orders-filter-select"
          onChange={(e) => setStatus(e.target.value)}
          value={status}
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="orders-list">
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className={`order-card glass animate-fade-in order-status-${order.status.toLowerCase()}`}> 
              <div className="order-info">
                <div className="order-id">Order <span className="order-id-value">#{order._id.slice(-6).toUpperCase()}</span></div>
                <div className="order-value">Total: <span className="order-value-amount">${order.orderValue}</span></div>
                <div className={`order-status order-status-${order.status.toLowerCase()}`}>{order.status}</div>
              </div>
              <div className="order-actions">
                {order.status === "Pending" && (
                  <>
                    <button className="order-btn order-cancel-btn" onClick={() => updateOrder("cancelled", order._id)}>
                      Cancel
                    </button>
                    <button className="order-btn order-complete-btn" onClick={() => updateOrder("completed", order._id)}>
                      Complete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="orders-empty">
            <div className="orders-empty-icon">☕</div>
            <h3>No orders found</h3>
            <p>Looks like you haven't placed any orders yet on CoffeeZoo.</p>
          </div>
        )}
      </div>

      <div className="orders-pagination">
        <button
          className="pagination-btn"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <span className="pagination-info">
          Page {page} of {totalPages}
        </span>
        <button
          className="pagination-btn"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
