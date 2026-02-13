const express = require('express');
const router = express.Router();
const { adminAuth } = require('../middleware/auth');
const {
  addBus,
  addRoute,
  addSchedule,
  getBuses,
  getRoutes,
  getSchedules
} = require('../controllers/adminController');

// Get data
router.get('/buses', adminAuth, getBuses);
router.get('/routes', adminAuth, getRoutes);
router.get('/schedules', adminAuth, getSchedules);

// Add data
router.post('/buses', adminAuth, addBus);
router.post('/routes', adminAuth, addRoute);
router.post('/schedules', adminAuth, addSchedule);

module.exports = router;
