// controllers/ComplaintStatusRoutes.js

const express = require('express');
const router = express.Router();
const ComplaintsStatusController = require('../controllers/ComplaintsStatusController');

router.get('/statusId/:statusId', ComplaintsStatusController.getStatusById);
router.get('/', ComplaintsStatusController.getAllStatuses);

module.exports = router;