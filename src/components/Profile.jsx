import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
export default function Profile() {
  const [profile, setProfile] = useState({});
  const { user, setUser } = useContext(AppContext);
  const [form, setForm] = useState({});
  const [error, setError] = useState();
  const API_URL = import.meta.env.VITE_API_URL;
  const Navigate = useNavigate();
  const fetchProfile = async () => {
    try {
      const url = `${API_URL}/api/users/${user.id}/profile`;
      const result = await axios.get(url);
      setProfile(result.data);
      // console.log(profile);
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };
  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  const logout = () => {
    setUser({});
    Navigate("/");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${API_URL}/api/users/${profile._id}/profile`;
      await axios.patch(url, form);
      fetchProfile();
      setError("Profile updated successfully.");
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  };
  return (
    <div className="profile-page main-content">
      <div className="profile-card glass">
        <div className="profile-header">
          <div className="profile-avatar">☕</div>
          <h1 className="profile-title gradient-text">My CoffeeZoo Profile</h1>
          <p className="profile-subtitle">Manage your CoffeeZoo account details</p>
        </div>
        {error && <div className={`profile-message ${error.includes('success') ? 'success-message' : 'error-message'}`}>{error}</div>}
        <form className="profile-form" onSubmit={handleSubmit} autoComplete="off">
          <div className="profile-form-group">
            <label className="profile-label">First Name</label>
            <input
              name="firstName"
              type="text"
              className="profile-input"
              onChange={handleChange}
              defaultValue={profile.firstName}
              required
            />
          </div>
          <div className="profile-form-group">
            <label className="profile-label">Last Name</label>
            <input
              name="lastName"
              type="text"
              className="profile-input"
              onChange={handleChange}
              defaultValue={profile.lastName}
              required
            />
          </div>
          <div className="profile-form-group">
            <label className="profile-label">Email</label>
            <input
              name="email"
              type="email"
              className="profile-input"
              onChange={handleChange}
              defaultValue={profile.email}
              required
            />
          </div>
          <div className="profile-form-group">
            <label className="profile-label">Password</label>
            <input
              name="password"
              type="password"
              className="profile-input"
              onChange={handleChange}
              defaultValue={profile.password}
              required
            />
          </div>
          <div className="profile-actions">
            <button type="submit" className="profile-btn profile-update-btn">Update Profile</button>
            <button type="button" className="profile-btn profile-logout-btn" onClick={logout}>Logout</button>
          </div>
        </form>
      </div>
    </div>
  );
}
