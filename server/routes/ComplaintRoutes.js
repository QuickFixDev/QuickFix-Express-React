// controllers/ComplaintRoutes.js

const express = require('express');
const router = express.Router();
const ComplaintController = require('../controllers/ComplaintController');

router.get('/', ComplaintController.getAllComplaints);

module.exports = router;