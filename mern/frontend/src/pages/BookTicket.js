import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { bookingService } from '../services/api';
import '../styles/booking.css';

const BookTicket = () => {
  const { scheduleId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [scheduleData, setScheduleData] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [passengers, setPassengers] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Mock schedule data - in real app, fetch from API
  useEffect(() => {
    // Fetch schedule details from API
    setScheduleData({
      busNumber: 'BUS-101',
      busType: 'Deluxe',
      totalSeats: 40,
      departureTime: '10:00 AM',
      arrivalTime: '4:00 PM',
      travelTime: 360,
      price: 50
    });
  }, [scheduleId]);

  const handleSeatClick = (seatNum) => {
    if (selectedSeats.includes(seatNum)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatNum));
      setPassengers(passengers.filter((_, i) => i !== selectedSeats.indexOf(seatNum)));
    } else {
      setSelectedSeats([...selectedSeats, seatNum]);
      setPassengers([...passengers, { seatNumber: seatNum, passengerName: '', age: '', gender: 'male' }]);
    }
  };

  const handlePassengerChange = (index, field, value) => {
    const newPassengers = [...passengers];
    newPassengers[index][field] = value;
    setPassengers(newPassengers);
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const passengerData = passengers.map((p, i) => ({
        seatNumber: selectedSeats[i],
        passengerName: p.passengerName,
        age: parseInt(p.age),
        gender: p.gender
      }));

      const response = await bookingService.bookTicket(scheduleId, passengerData, token);
      setSuccess('Booking successful!');
      setTimeout(() => navigate(`/ticket/${response.data.ticketId}`), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!scheduleData) {
    return <div className="container"><p>Loading...</p></div>;
  }

  return (
    <div className="container booking-container">
      <h2>Book Your Ticket</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <div className="booking-content">
        <div className="schedule-info">
          <h3>Bus Details</h3>
          <div className="info-grid">
            <div><span>Bus Number:</span> {scheduleData.busNumber}</div>
            <div><span>Bus Type:</span> {scheduleData.busType}</div>
            <div><span>Departure:</span> {scheduleData.departureTime}</div>
            <div><span>Arrival:</span> {scheduleData.arrivalTime}</div>
            <div><span>Duration:</span> {scheduleData.travelTime} mins</div>
            <div><span>Price:</span> Rs. {scheduleData.price}</div>
          </div>
        </div>

        <div className="seat-selection">
          <h3>Select Seats</h3>
          <div className="seats-grid">
            {Array.from({ length: scheduleData.totalSeats }).map((_, i) => (
              <button
                key={i + 1}
                className={`seat ${selectedSeats.includes(i + 1) ? 'selected' : ''}`}
                onClick={() => handleSeatClick(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <p className="seats-count">Selected: {selectedSeats.length} seat(s)</p>
        </div>
      </div>

      {selectedSeats.length > 0 && (
        <form onSubmit={handleBooking} className="passenger-form">
          <h3>Passenger Details</h3>
          {passengers.map((passenger, index) => (
            <div key={index} className="passenger-card">
              <h4>Passenger {index + 1} (Seat {selectedSeats[index]})</h4>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  value={passenger.passengerName}
                  onChange={(e) => handlePassengerChange(index, 'passengerName', e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  value={passenger.age}
                  onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label>Gender</label>
                <select
                  value={passenger.gender}
                  onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
                  className="form-control"
                  required
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          ))}

          <div className="booking-summary">
            <h3>Booking Summary</h3>
            <div className="summary-item">
              <span>Number of Seats:</span>
              <span>{selectedSeats.length}</span>
            </div>
            <div className="summary-item">
              <span>Price per Seat:</span>
              <span>Rs. {scheduleData.price}</span>
            </div>
            <div className="summary-item total">
              <span>Total Amount:</span>
              <span>Rs. {selectedSeats.length * scheduleData.price}</span>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
            {loading ? 'Processing...' : 'Confirm Booking'}
          </button>
        </form>
      )}
    </div>
  );
};

export default BookTicket;
