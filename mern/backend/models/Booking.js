const mongoose = require('mongoose');

const bookingPassengerSchema = new mongoose.Schema({
  seatNumber: Number,
  passengerName: String,
  age: Number,
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  }
});

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  scheduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Schedule',
    required: true
  },
  ticketId: {
    type: String,
    required: true,
    unique: true
  },
  bookingTime: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['confirmed', 'cancelled'],
    default: 'confirmed'
  },
  passengers: [bookingPassengerSchema]
});

// Create index for ticket id and status
bookingSchema.index({ ticketId: 1 });
bookingSchema.index({ status: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
