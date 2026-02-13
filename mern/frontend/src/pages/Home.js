import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/home.css';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Bus Reservation System</h1>
          <p>Book your bus tickets easily and securely</p>
          <div className="hero-decorative">
            <i className="fas fa-bus"></i>
            <i className="fas fa-road"></i>
            <i className="fas fa-map-marker-alt"></i>
          </div>
          <Link to="/buses" className="btn btn-hero">Browse All Buses</Link>
        </div>
      </div>

      <div className="container">
        <div className="features-section">
          <h2>Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <i className="fas fa-bus"></i>
              <h3>Wide Network</h3>
              <p>Extensive coverage across multiple Indian cities</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-lock"></i>
              <h3>Secure Booking</h3>
              <p>Safe and secure ticket booking system</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-rupee-sign"></i>
              <h3>Best Prices</h3>
              <p>Competitive prices with best deals in rupees</p>
            </div>
            <div className="feature-card">
              <i className="fas fa-headset"></i>
              <h3>24/7 Support</h3>
              <p>Customer support available round the clock</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
