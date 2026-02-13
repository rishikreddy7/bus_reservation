import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { bookingService } from '../services/api';
import '../styles/mybookings.css';

const MyBookings = () => {
  const { token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMyBookings();
  }, [token]);

  const fetchMyBookings = async () => {
    try {
      const response = await bookingService.getMyBookings(token);
      setBookings(response.data.bookings || []);
    } catch (err) {
      setError('Error fetching bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (ticketId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await bookingService.cancelBooking(ticketId, token);
        fetchMyBookings();
      } catch (err) {
        setError('Error cancelling booking');
      }
    }
  };

  if (loading) return <div className="container"><p>Loading...</p></div>;

  return (
    <div className="container bookings-container">
      <h2>My Bookings</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {bookings.length === 0 ? (
        <div className="alert alert-info">You have no bookings yet.</div>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking) => (
            <div key={booking._id} className="booking-card">
              <div className="booking-header">
                <div>
                  <h3>Ticket: {booking.ticketId}</h3>
                  <p className="booking-date">
                    Booked on {new Date(booking.bookingTime).toLocaleDateString()}
                  </p>
                </div>
                <span className={`status ${booking.status}`}>{booking.status.toUpperCase()}</span>
              </div>

              <div className="booking-details">
                <div className="detail">
                  <span className="label">Bus</span>
                  <span className="value">{booking.scheduleId?.busId?.busNumber}</span>
                </div>
                <div className="detail">
                  <span className="label">Route</span>
                  <span className="value">
                    {booking.scheduleId?.routeId?.source} → {booking.scheduleId?.routeId?.destination}
                  </span>
                </div>
                <div className="detail">
                  <span className="label">Date</span>
                  <span className="value">
                    {new Date(booking.scheduleId?.dateOfJourney).toLocaleDateString()}
                  </span>
                </div>
                <div className="detail">
                  <span className="label">Passengers</span>
                  <span className="value">{booking.passengers?.length}</span>
                </div>
              </div>

              <div className="booking-passengers">
                <strong>Passengers:</strong>
                <ul>
                  {booking.passengers?.map((passenger, index) => (
                    <li key={index}>
                      Seat {passenger.seatNumber}: {passenger.passengerName} ({passenger.age} yrs)
                    </li>
                  ))}
                </ul>
              </div>

              <div className="booking-actions">
                <a href={`/ticket/${booking.ticketId}`} className="btn btn-info">
                  View Details
                </a>
                {booking.status === 'confirmed' && (
                  <button 
                    onClick={() => handleCancel(booking.ticketId)}
                    className="btn btn-danger"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
