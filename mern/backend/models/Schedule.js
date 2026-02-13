const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  busId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bus',
    required: true
  },
  routeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Route',
    required: true
  },
  dateOfJourney: {
    type: Date,
    required: true
  },
  departureTime: {
    type: String,
    required: true
  },
  arrivalTime: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create index for date of journey
scheduleSchema.index({ dateOfJourney: 1 });

module.exports = mongoose.model('Schedule', scheduleSchema);
