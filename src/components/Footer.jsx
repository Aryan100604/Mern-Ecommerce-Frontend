import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">
              <span className="gradient-text">Coffee</span> Zoo
            </h3>
            <p className="footer-description">
              A futuristic ecommerce platform built with modern technologies.
            </p>
            <div className="footer-social">
              <a href="#" className="social-link">
                <span className="social-icon">📱</span>
              </a>
              <a href="#" className="social-link">
                <span className="social-icon">💻</span>
              </a>
              <a href="#" className="social-link">
                <span className="social-icon">📧</span>
              </a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/" className="footer-link">Home</a></li>
              <li><a href="/cart" className="footer-link">Cart</a></li>
              <li><a href="/order" className="footer-link">Orders</a></li>
              <li><a href="/login" className="footer-link">Login</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Support</h4>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">Help Center</a></li>
              <li><a href="#" className="footer-link">Contact Us</a></li>
              <li><a href="#" className="footer-link">Privacy Policy</a></li>
              <li><a href="#" className="footer-link">Terms of Service</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Newsletter</h4>
            <p className="footer-description">
              Stay updated with our latest products and offers.
            </p>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="newsletter-input"
              />
              <button className="newsletter-button">
                <span className="button-icon">🚀</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © 2024 CoffeeZoo. All rights reserved.
            </p>
            <div className="footer-tech">
              <span className="tech-badge">React</span>
              <span className="tech-badge">Node.js</span>
              <span className="tech-badge">MongoDB</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
