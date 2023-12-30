// controllers/ComplaintRoutes.js

const express = require('express');
const router = express.Router();
const ComplaintController = require('../controllers/ComplaintController');

router.get('/', ComplaintController.getAllComplaints);
router.get('/stats', ComplaintController.getComplaintsInGraphic);
router.get('/userId/:userId', ComplaintController.getComplaintByUserId)
router.get('/complaint/:complaintId', ComplaintController.getComplaintByComplaintId)
router.post('/new', ComplaintController.createComplaint);

module.exports = router;