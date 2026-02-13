import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchService } from '../services/api';
import '../styles/buses.css';

const AvailableBuses = () => {
  const navigate = useNavigate();
  const [buses, setBuses] = useState([]);
  const [filteredBuses, setFilteredBuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchForm, setSearchForm] = useState({
    source: '',
    destination: '',
    date: ''
  });
  const [allBuses, setAllBuses] = useState([]);

  useEffect(() => {
    fetchAllBuses();
  }, []);

  const fetchAllBuses = async () => {
    try {
      setLoading(true);
      // Get sample data - you can modify based on your backend
      const dates = ['2024-03-15', '2024-03-16', '2024-03-17'];
      const routes = [
        { source: 'New York', destination: 'Boston' },
        { source: 'Boston', destination: 'New York' },
        { source: 'New York', destination: 'Philadelphia' },
        { source: 'Los Angeles', destination: 'San Francisco' }
      ];

      let allBusesData = [];
      for (const route of routes) {
        for (const date of dates) {
          try {
            const response = await searchService.searchBuses(
              route.source,
              route.destination,
              date
            );
            if (response.data.buses) {
              allBusesData = [...allBusesData, ...response.data.buses];
            }
          } catch (error) {
            console.log('Error fetching buses:', error);
          }
        }
      }
      setBuses(allBusesData);
      setFilteredBuses(allBusesData);
      setAllBuses(allBusesData);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchForm.source || !searchForm.destination || !searchForm.date) {
      alert('Please fill all search fields');
      return;
    }

    try {
      setLoading(true);
      const response = await searchService.searchBuses(
        searchForm.source,
        searchForm.destination,
        searchForm.date
      );
      if (response.data.buses) {
        setFilteredBuses(response.data.buses);
      }
    } catch (error) {
      console.error('Search error:', error);
      alert('Error searching buses');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearchForm({ source: '', destination: '', date: '' });
    setFilteredBuses(buses);
  };

  const handleBooking = (scheduleId) => {
    navigate(`/book/${scheduleId}`);
  };

  return (
    <div className="container buses-container">
      <div className="buses-header">
        <h2>Available Buses</h2>
        <button 
          onClick={() => navigate(-1)} 
          className="btn btn-secondary go-back-btn"
        >
          ← Go Back
        </button>
      </div>

      {/* Search Section */}
      <div className="search-section">
        <h3>Search Buses</h3>
        <form onSubmit={handleSearch} className="search-form">
          <div className="form-group">
            <label>From</label>
            <input
              type="text"
              name="source"
              value={searchForm.source}
              onChange={handleSearchChange}
              placeholder="Enter source city"
            />
          </div>

          <div className="form-group">
            <label>To</label>
            <input
              type="text"
              name="destination"
              value={searchForm.destination}
              onChange={handleSearchChange}
              placeholder="Enter destination city"
            />
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={searchForm.date}
              onChange={handleSearchChange}
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
          <button 
            type="button" 
            onClick={handleReset}
            className="btn btn-secondary"
          >
            Reset
          </button>
        </form>
      </div>

      {/* Buses List */}
      {loading ? (
        <div className="alert alert-info">Loading buses...</div>
      ) : filteredBuses.length === 0 ? (
        <div className="alert alert-warning">
          No buses found. Try a different search or check back soon!
        </div>
      ) : (
        <div className="buses-grid">
          <div className="buses-info">
            <p>Showing <strong>{filteredBuses.length}</strong> buses</p>
          </div>
          
          {filteredBuses.map((bus, index) => (
            <div key={index} className="bus-card">
              <div className="bus-card-header">
                <div className="bus-info">
                  <h3>{bus.busNumber}</h3>
                  <span className={`bus-type-badge ${bus.busType.toLowerCase()}`}>
                    {bus.busType}
                  </span>
                </div>
                <div className="bus-price">
                  <span className="price-label">Price</span>
                  <span className="price-value">₹{bus.price}</span>
                </div>
              </div>

              <div className="bus-card-details">
                <div className="detail-row">
                  <div className="detail-item">
                    <span className="detail-label">🕐 Departure</span>
                    <span className="detail-value">{bus.departureTime}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">🏁 Arrival</span>
                    <span className="detail-value">{bus.arrivalTime}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">⏱️ Duration</span>
                    <span className="detail-value">{bus.travelTime} min</span>
                  </div>
                </div>

                <div className="detail-row">
                  <div className="detail-item">
                    <span className="detail-label">🚌 Total Seats</span>
                    <span className="detail-value">{bus.totalSeats}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">✅ Available</span>
                    <span className={`detail-value seats-${bus.availableSeats > 5 ? 'plenty' : bus.availableSeats > 0 ? 'few' : 'none'}`}>
                      {bus.availableSeats}
                    </span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">📊 Occupancy</span>
                    <span className="detail-value">
                      {Math.round((bus.totalSeats - bus.availableSeats) / bus.totalSeats * 100)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="seat-indicator">
                <div className="indicator-bar">
                  <div 
                    className="indicator-filled"
                    style={{ width: `${(bus.totalSeats - bus.availableSeats) / bus.totalSeats * 100}%` }}
                  ></div>
                </div>
                <span className="indicator-text">
                  {bus.availableSeats > 0 ? `${bus.availableSeats} seats left` : 'Sold Out'}
                </span>
              </div>

              <button
                onClick={() => handleBooking(bus.scheduleId)}
                className={`btn ${bus.availableSeats === 0 ? 'btn-disabled' : 'btn-primary'}`}
                disabled={bus.availableSeats === 0}
              >
                {bus.availableSeats === 0 ? '❌ Sold Out' : '🎫 Book Now'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableBuses;
