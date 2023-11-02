// controllers/ComplaintRoutes.js

const express = require('express');
const router = express.Router();
const StatsController = require('../controllers/StatsController');

router.get('/', StatsController.getAllComplaints);

module.exports = router;