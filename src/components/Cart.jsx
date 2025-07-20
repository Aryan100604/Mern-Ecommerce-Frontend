import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";
import "./Cart.css";

export default function Cart() {
  const { user, cart, setCart } = useContext(AppContext);
  const [orderValue, setOrderValue] = useState(0);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const increment = (id, qty) => {
    const updatedCart = cart.map((product) =>
      product._id === id ? { ...product, qty: qty + 1 } : product
    );
    setCart(updatedCart);
  };

  const decrement = (id, qty) => {
    if (qty > 1) {
      const updatedCart = cart.map((product) =>
        product._id === id ? { ...product, qty: qty - 1 } : product
      );
      setCart(updatedCart);
    } else {
      const updatedCart = cart.filter((product) => product._id !== id);
      setCart(updatedCart);
    }
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((product) => product._id !== id);
    setCart(updatedCart);
  };

  useEffect(() => {
    setOrderValue(
      cart.reduce((sum, value) => {
        return sum + value.qty * value.price;
      }, 0)
    );
  }, [cart]);

  const placeOrder = async () => {
    try {
      setLoading(true);
      setError(null);
      const url = `${API_URL}/api/orders`;
      const newOrder = {
        userId: user._id,
        email: user.email,
        orderValue,
        items: cart,
      };
      const result = await axios.post(url, newOrder);
      setCart([]);
      Navigate("/order");
    } catch (err) {
      console.log(err);
      setError("Something went wrong while placing your order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="main-content">
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2 className="empty-cart-title">Your cart is empty</h2>
          <p className="empty-cart-subtitle">
            Looks like you haven't added any products to your cart yet.
          </p>
          <button 
            className="empty-cart-button"
            onClick={() => Navigate("/")}
          >
            <span className="button-icon">🛍️</span>
            <span className="button-text">Start Shopping</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="cart-container">
        <div className="cart-header">
          <h1 className="cart-title">
            <span className="gradient-text">Shopping</span> Cart
          </h1>
          <p className="cart-subtitle">
            {cart.length} item{cart.length !== 1 ? 's' : ''} in your cart
          </p>
        </div>

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}

        <div className="cart-content">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item._id} className="cart-item animate-fade-in">
                <div className="item-image-container">
                  <img 
                    src={item.imgUrl} 
                    alt={item.productName}
                    className="item-image"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/100x100/667eea/ffffff?text=Product';
                    }}
                  />
                </div>
                
                <div className="item-details">
                  <h3 className="item-name">{item.productName}</h3>
                  <p className="item-description">{item.description}</p>
                  <div className="item-price">${item.price}</div>
                </div>
                
                <div className="item-quantity">
                  <div className="quantity-controls">
                    <button 
                      className="quantity-btn"
                      onClick={() => decrement(item._id, item.qty)}
                    >
                      -
                    </button>
                    <span className="quantity-display">{item.qty}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => increment(item._id, item.qty)}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="item-total">
                  <span className="total-amount">${(item.price * item.qty).toFixed(2)}</span>
                </div>
                
                <button 
                  className="remove-item-btn"
                  onClick={() => removeItem(item._id)}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
          
          <div className="cart-summary">
            <div className="summary-card">
              <h3 className="summary-title">Order Summary</h3>
              
              <div className="summary-row">
                <span className="summary-label">Subtotal:</span>
                <span className="summary-value">${orderValue.toFixed(2)}</span>
              </div>
              
              <div className="summary-row">
                <span className="summary-label">Shipping:</span>
                <span className="summary-value">Free</span>
              </div>
              
              <div className="summary-divider"></div>
              
              <div className="summary-row total-row">
                <span className="summary-label">Total:</span>
                <span className="summary-value total-value">${orderValue.toFixed(2)}</span>
              </div>
              
              <button 
                className="checkout-button"
                onClick={placeOrder}
                disabled={loading || !user?.token}
              >
                {loading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  <>
                    <span className="button-icon">🚀</span>
                    <span className="button-text">
                      {user?.token ? 'Place Order' : 'Login to Order'}
                    </span>
                  </>
                )}
              </button>
              
              {!user?.token && (
                <button 
                  className="login-button"
                  onClick={() => Navigate("/login")}
                >
                  <span className="button-icon">🔐</span>
                  <span className="button-text">Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}