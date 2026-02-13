import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="navbar">
          <Link to="/" className="navbar-brand">
            <i className="fas fa-bus"></i> Bus Reservation System
          </Link>
          <nav className="navbar-nav">
            <Link to="/buses" className="nav-link">Browse Buses</Link>
            {user ? (
              <>
                <span className="navbar-text">Welcome, {user.name}</span>
                {user.role === 'admin' && (
                  <Link to="/admin" className="nav-link">Admin Panel</Link>
                )}
                <Link to="/my-bookings" className="nav-link">My Bookings</Link>
                <button onClick={handleLogout} className="nav-link logout-btn">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/register" className="nav-link">Register</Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
