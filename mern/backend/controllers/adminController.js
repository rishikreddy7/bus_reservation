const Bus = require('../models/Bus');
const Route = require('../models/Route');
const Schedule = require('../models/Schedule');

exports.addBus = async (req, res) => {
  try {
    const { busNumber, totalSeats, busType } = req.body;

    if (!busNumber || !totalSeats || !busType) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    let bus = await Bus.findOne({ busNumber });
    if (bus) {
      return res.status(400).json({
        success: false,
        message: 'Bus number already exists'
      });
    }

    bus = new Bus({ busNumber, totalSeats, busType });
    await bus.save();

    res.status(201).json({
      success: true,
      bus
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error: ' + error.message
    });
  }
};

exports.addRoute = async (req, res) => {
  try {
    const { source, destination, travelTime } = req.body;

    if (!source || !destination || !travelTime) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    const route = new Route({ source, destination, travelTime });
    await route.save();

    res.status(201).json({
      success: true,
      route
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error: ' + error.message
    });
  }
};

exports.addSchedule = async (req, res) => {
  try {
    const { busId, routeId, dateOfJourney, departureTime, arrivalTime } = req.body;

    if (!busId || !routeId || !dateOfJourney || !departureTime || !arrivalTime) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    const schedule = new Schedule({
      busId,
      routeId,
      dateOfJourney: new Date(dateOfJourney),
      departureTime,
      arrivalTime
    });

    await schedule.save();

    res.status(201).json({
      success: true,
      schedule
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error: ' + error.message
    });
  }
};

exports.getBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json({
      success: true,
      buses
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error: ' + error.message
    });
  }
};

exports.getRoutes = async (req, res) => {
  try {
    const routes = await Route.find();
    res.json({
      success: true,
      routes
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error: ' + error.message
    });
  }
};

exports.getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find()
      .populate('busId')
      .populate('routeId');
    res.json({
      success: true,
      schedules
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error: ' + error.message
    });
  }
};
