const express = require('express');
const router = express.Router();
const ComplaintController = require('../controllers/ComplaintController');

router.post('/complaints', ComplaintController.createComplaint);
router.get('/complaints', ComplaintController.getAllComplaints);
router.get('/complaints/:id', ComplaintController.getComplaintById);
router.put('/complaints/:id', ComplaintController.updateComplaint);
router.delete('/complaints/:id', ComplaintController.deleteComplaint);

module.exports = router;
