const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  source: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  travelTime: {
    type: Number,
    required: true,
    comment: 'Travel time in minutes'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create index for source and destination
routeSchema.index({ source: 1, destination: 1 });

module.exports = mongoose.model('Route', routeSchema);
