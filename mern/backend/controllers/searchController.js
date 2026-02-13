const Bus = require('../models/Bus');
const Route = require('../models/Route');
const Schedule = require('../models/Schedule');
const Booking = require('../models/Booking');

exports.searchBuses = async (req, res) => {
  try {
    const { from, to, date } = req.body;

    if (!from || !to || !date) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Find routes matching source and destination
    const routes = await Route.find({
      source: from,
      destination: to
    });

    if (routes.length === 0) {
      return res.json({
        success: true,
        buses: []
      });
    }

    const routeIds = routes.map(r => r._id);

    // Find schedules for those routes on the given date
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 1);

    const schedules = await Schedule.find({
      routeId: { $in: routeIds },
      dateOfJourney: { $gte: startDate, $lt: endDate }
    }).populate('busId').populate('routeId');

    // Get booked seats for each schedule
    const buses = [];

    for (const schedule of schedules) {
      const bookings = await Booking.findOne({
        scheduleId: schedule._id,
        status: 'confirmed'
      });

      const bookedSeatsCount = bookings ? bookings.passengers.length : 0;
      const availableSeats = schedule.busId.totalSeats - bookedSeatsCount;

      const priceMap = {
        'Deluxe': 50,
        'Sleeper': 40,
        'Standard': 30
      };

      buses.push({
        scheduleId: schedule._id,
        busNumber: schedule.busId.busNumber,
        busType: schedule.busId.busType,
        totalSeats: schedule.busId.totalSeats,
        availableSeats: availableSeats,
        departureTime: schedule.departureTime,
        arrivalTime: schedule.arrivalTime,
        travelTime: schedule.routeId.travelTime,
        price: priceMap[schedule.busId.busType] || 30
      });
    }

    res.json({
      success: true,
      buses: buses.sort((a, b) => a.departureTime.localeCompare(b.departureTime))
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error: ' + error.message
    });
  }
};
