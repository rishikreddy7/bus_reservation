const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  busNumber: {
    type: String,
    required: true,
    unique: true
  },
  totalSeats: {
    type: Number,
    required: true
  },
  busType: {
    type: String,
    enum: ['Deluxe', 'Sleeper', 'Standard'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Bus', busSchema);
