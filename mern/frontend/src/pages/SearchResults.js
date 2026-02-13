import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/search.css';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [buses, setBuses] = useState([]);
  const [searchData, setSearchData] = useState({});

  useEffect(() => {
    if (location.state) {
      setBuses(location.state.buses || []);
      setSearchData(location.state.searchData || {});
    }
  }, [location.state]);

  const handleBooking = (scheduleId) => {
    navigate(`/book/${scheduleId}`);
  };

  return (
    <div className="container search-container">
      <h2>Search Results</h2>
      {searchData.source && searchData.destination && (
        <p className="search-info">
          Buses from <strong>{searchData.source}</strong> to <strong>{searchData.destination}</strong> on <strong>{searchData.date}</strong>
        </p>
      )}

      {buses.length === 0 ? (
        <div className="alert alert-warning">No buses found for your search criteria.</div>
      ) : (
        <div className="buses-list">
          {buses.map((bus) => (
            <div key={bus.scheduleId} className="bus-card">
              <div className="bus-header">
                <h3>{bus.busNumber}</h3>
                <span className={`bus-type ${bus.busType.toLowerCase()}`}>{bus.busType}</span>
              </div>
              <div className="bus-details">
                <div className="detail">
                  <span className="label">Departure</span>
                  <span className="value">{bus.departureTime}</span>
                </div>
                <div className="detail">
                  <span className="label">Arrival</span>
                  <span className="value">{bus.arrivalTime}</span>
                </div>
                <div className="detail">
                  <span className="label">Duration</span>
                  <span className="value">{bus.travelTime} mins</span>
                </div>
                <div className="detail">
                  <span className="label">Seats Available</span>
                  <span className="value">{bus.availableSeats}/{bus.totalSeats}</span>
                </div>
                <div className="detail">
                  <span className="label">Price</span>
                  <span className="price">Rs. {bus.price}</span>
                </div>
              </div>
              <button 
                onClick={() => handleBooking(bus.scheduleId)}
                className="btn btn-primary"
                disabled={bus.availableSeats === 0}
              >
                {bus.availableSeats === 0 ? 'Sold Out' : 'Book Now'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
