import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import "./Login.css";

export default function Login() {
  const { user, setUser } = useContext(AppContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      const url = `${API_URL}/api/users/login`;
      const result = await axios.post(url, user);
      setUser(result.data);
      Navigate("/");
    } catch (err) {
      console.log(err);
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-icon">🔐</div>
            <h1 className="auth-title">
              <span className="gradient-text">Welcome</span> Back
            </h1>
            <p className="auth-subtitle">
              Sign in to your account to continue shopping
            </p>
          </div>

          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <form className="auth-form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-container">
                <span className="input-icon">📧</span>
                <input
                  type="email"
                  className="form-input"
                  placeholder="Enter your email"
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-container">
                <span className="input-icon">🔒</span>
                <input
                  type="password"
                  className="form-input"
                  placeholder="Enter your password"
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="auth-button"
              disabled={loading}
            >
              {loading ? (
                <span className="loading-spinner"></span>
              ) : (
                <>
                  <span className="button-icon">🚀</span>
                  <span className="button-text">Sign In</span>
                </>
              )}
            </button>
          </form>

          <div className="auth-divider">
            <span className="divider-text">or</span>
          </div>

          <div className="auth-footer">
            <p className="auth-footer-text">
              Don't have an account? 
              <Link to="/register" className="auth-link">
                Create one here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
