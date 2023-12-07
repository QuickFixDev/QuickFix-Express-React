// controllers/ComplaintStatusRoutes.js

const express = require('express');
const router = express.Router();
const ComplaintsStatusController = require('../controllers/ComplaintsStatusController');

router.get('/', ComplaintsStatusController.getAllStatuses);

module.exports = router;