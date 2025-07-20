import "./Register.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [user, setUser] = useState({});
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      const url = `${API_URL}/api/users/register`;
      const result = await axios.post(url, user);
      setError("Registration successful! Redirecting to login...");
      setTimeout(() => {
        Navigate("/login");
      }, 2000);
    } catch (err) {
      console.log(err);
      setError("Registration failed. Please check your details and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-icon">🚀</div>
            <h1 className="auth-title">
              <span className="gradient-text">Join</span> Us
            </h1>
            <p className="auth-subtitle">
              Create your account to start shopping
            </p>
          </div>

          {error && (
            <div className={`message ${error.includes('successful') ? 'success-message' : 'error-message'}`}>
              <span className="message-icon">
                {error.includes('successful') ? '✅' : '⚠️'}
              </span>
              {error}
            </div>
          )}

          <form className="auth-form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <div className="form-group">
              <label className="form-label">First Name</label>
              <div className="input-container">
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter your first name"
                  onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Last Name</label>
              <div className="input-container">
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter your last name"
                  onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                  required
                />
              </div>
            </div>

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
                  <span className="button-text">Create Account</span>
                </>
              )}
            </button>
          </form>

          <div className="auth-divider">
            <span className="divider-text">or</span>
          </div>

          <div className="auth-footer">
            <p className="auth-footer-text">
              Already have an account? 
              <Link to="/login" className="auth-link">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
