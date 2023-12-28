// controllers/ComplaintStatusRoutes.js

const express = require('express');
const router = express.Router();
const ComplaintsHistoryController = require('../controllers/ComplaintsHistoryController');

router.get('/history/:complaintId', ComplaintsHistoryController.getComplaintHistory);
router.get('/employee/:employeeId', ComplaintsHistoryController.getEmployeeComplaintsHistory);
router.get('/admin/:adminId', ComplaintsHistoryController.getAdminComplaintsHistory);
router.get('/', ComplaintsHistoryController.getAllComplaintsHistory);
router.post('/new', ComplaintsHistoryController.createComplaintHistory);

module.exports = router;