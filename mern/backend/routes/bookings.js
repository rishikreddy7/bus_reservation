const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const {
  bookTicket,
  getBookingDetails,
  getMyBookings,
  cancelBooking
} = require('../controllers/bookingController');

router.post('/', auth, bookTicket);
router.get('/:ticketId', getBookingDetails);
router.get('/', auth, getMyBookings);
router.put('/:ticketId/cancel', auth, cancelBooking);

module.exports = router;
