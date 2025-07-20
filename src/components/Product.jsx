import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../App";
import "./Product.css";

export default function Product() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(true);
  const { user, cart, setCart } = useContext(AppContext);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const url = `${API_URL}/api/products/all`;
      const result = await axios.get(url);
      setProducts(result.data.products);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const found = cart.find((item) => item._id === product._id);
    if (!found) {
      product.qty = 1;
      setCart([...cart, product]);
    }
  };

  if (loading) {
    return (
      <div className="main-content">
        <div className="loading">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="main-content">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="main-content">
      <div className="products-header">
        <h1 className="products-title">
          <span className="gradient-text">Discover</span> Our Products
        </h1>
        <p className="products-subtitle">
          Explore our futuristic collection of amazing products
        </p>
      </div>
      
      <div className="products-grid">
        {products &&
          products.map((product, index) => (
            <div 
              key={product._id} 
              className="product-card animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="product-image-container">
                <img 
                  src={product.imgUrl} 
                  alt={product.productName}
                  className="product-image"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200/667eea/ffffff?text=Product+Image';
                  }}
                />
                <div className="product-overlay">
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => addToCart(product)}
                  >
                    <span className="btn-icon">🛒</span>
                    <span className="btn-text">Add to Cart</span>
                  </button>
                </div>
              </div>
              
              <div className="product-info">
                <h3 className="product-name">{product.productName}</h3>
                <p className="product-description">{product.description}</p>
                <div className="product-price-container">
                  <span className="product-price">${product.price}</span>
                  <div className="price-glow"></div>
                </div>
              </div>
            </div>
          ))}
      </div>
      
      {products.length === 0 && (
        <div className="no-products">
          <div className="no-products-icon">📦</div>
          <h3>No products available</h3>
          <p>Check back later for new arrivals!</p>
        </div>
      )}
    </div>
  );
}
