// controllers/ComplaintStatusRoutes.js

const express = require('express');
const router = express.Router();
const ComplaintsHistoryController = require('../controllers/ComplaintsHistoryController');

router.get('/', ComplaintsHistoryController.getAllComplaintsHistory);
router.post('/new', ComplaintsHistoryController.createComplaintHistory);

module.exports = router;