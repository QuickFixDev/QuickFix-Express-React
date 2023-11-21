// controllers/ComplaintRoutes.js

const express = require('express');
const router = express.Router();
const ComplaintController = require('../controllers/ComplaintController');

router.get('/', ComplaintController.getAllComplaints);
router.get('/stats', ComplaintController.getComplaintsInGraphic);
router.get('/:id', ComplaintController.getComplaintById)
router.post('/new', ComplaintController.createComplaint);

module.exports = router;