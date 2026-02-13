const Booking = require('../models/Booking');
const Schedule = require('../models/Schedule');

exports.bookTicket = async (req, res) => {
  try {
    const { scheduleId, passengers } = req.body;

    if (!scheduleId || !passengers || passengers.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Schedule ID and passengers are required'
      });
    }

    // Check if schedule exists
    const schedule = await Schedule.findById(scheduleId).populate('busId');
    if (!schedule) {
      return res.status(404).json({
        success: false,
        message: 'Schedule not found'
      });
    }

    // Check seat availability
    const existingBooking = await Booking.findOne({
      scheduleId,
      status: 'confirmed'
    });

    const bookedSeats = existingBooking ? existingBooking.passengers.map(p => p.seatNumber) : [];
    const requestedSeats = passengers.map(p => p.seatNumber);

    for (const seat of requestedSeats) {
      if (bookedSeats.includes(seat)) {
        return res.status(400).json({
          success: false,
          message: `Seat ${seat} is already booked`
        });
      }
    }

    // Create booking
    const ticketId = 'TKT' + Date.now();
    const booking = new Booking({
      userId: req.user.id,
      scheduleId,
      ticketId,
      passengers
    });

    await booking.save();

    res.status(201).json({
      success: true,
      booking,
      ticketId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error: ' + error.message
    });
  }
};

exports.getBookingDetails = async (req, res) => {
  try {
    const { ticketId } = req.params;

    const booking = await Booking.findOne({ ticketId })
      .populate('userId')
      .populate('scheduleId')
      .populate({
        path: 'scheduleId',
        populate: [
          { path: 'busId' },
          { path: 'routeId' }
        ]
      });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.json({
      success: true,
      booking
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error: ' + error.message
    });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .populate('scheduleId')
      .populate({
        path: 'scheduleId',
        populate: [
          { path: 'busId' },
          { path: 'routeId' }
        ]
      })
      .sort({ bookingTime: -1 });

    res.json({
      success: true,
      bookings
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error: ' + error.message
    });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const { ticketId } = req.params;

    const booking = await Booking.findOne({ ticketId });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    if (booking.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized'
      });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.json({
      success: true,
      message: 'Booking cancelled successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error: ' + error.message
    });
  }
};
