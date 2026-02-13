const express = require('express');
const router = express.Router();
const { searchBuses } = require('../controllers/searchController');

router.post('/', searchBuses);

module.exports = router;
