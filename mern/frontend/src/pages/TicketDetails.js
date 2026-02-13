import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { bookingService } from '../services/api';
import '../styles/ticket.css';

const TicketDetails = () => {
  const { ticketId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTicketDetails();
  }, [ticketId]);

  const fetchTicketDetails = async () => {
    try {
      const response = await bookingService.getBookingDetails(ticketId);
      setBooking(response.data.booking);
    } catch (err) {
      setError('Error fetching ticket details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container"><p>Loading...</p></div>;

  if (error) return <div className="container"><div className="alert alert-danger">{error}</div></div>;

  if (!booking) return <div className="container"><div className="alert alert-warning">Ticket not found</div></div>;

  return (
    <div className="container ticket-container">
      <div className="ticket-card">
        <h2>Ticket Details</h2>
        
        <div className="ticket-header">
          <h3>Ticket ID: {booking.ticketId}</h3>
          <span className={`status ${booking.status}`}>{booking.status.toUpperCase()}</span>
        </div>

        <div className="ticket-section">
          <h4>Booking Information</h4>
          <div className="info-grid">
            <div><span>Booking Date:</span> {new Date(booking.bookingTime).toLocaleDateString()}</div>
            <div><span>Booking Time:</span> {new Date(booking.bookingTime).toLocaleTimeString()}</div>
            <div><span>Passenger Name:</span> {booking.userId?.name}</div>
            <div><span>Email:</span> {booking.userId?.email}</div>
          </div>
        </div>

        <div className="ticket-section">
          <h4>Journey Details</h4>
          <div className="info-grid">
            <div><span>Bus Number:</span> {booking.scheduleId?.busId?.busNumber}</div>
            <div><span>Bus Type:</span> {booking.scheduleId?.busId?.busType}</div>
            <div><span>From:</span> {booking.scheduleId?.routeId?.source}</div>
            <div><span>To:</span> {booking.scheduleId?.routeId?.destination}</div>
            <div><span>Date:</span> {new Date(booking.scheduleId?.dateOfJourney).toLocaleDateString()}</div>
            <div><span>Departure:</span> {booking.scheduleId?.departureTime}</div>
            <div><span>Arrival:</span> {booking.scheduleId?.arrivalTime}</div>
          </div>
        </div>

        <div className="ticket-section">
          <h4>Passengers</h4>
          <table className="passengers-table">
            <thead>
              <tr>
                <th>Seat No</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              {booking.passengers?.map((passenger, index) => (
                <tr key={index}>
                  <td>{passenger.seatNumber}</td>
                  <td>{passenger.passengerName}</td>
                  <td>{passenger.age}</td>
                  <td>{passenger.gender}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="ticket-footer">
          <p>Please keep this ticket for reference. Show this ticket at the bus counter during boarding.</p>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
