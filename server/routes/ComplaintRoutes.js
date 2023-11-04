// controllers/ComplaintRoutes.js

const express = require('express');
const router = express.Router();
const ComplaintController = require('../controllers/ComplaintController');
const CategoryController = require('../controllers/CategoryController');

router.get('/new', CategoryController.getAllCategories);
router.post('/new', ComplaintController.createComplaint);
router.get('/stats', ComplaintController.getComplaintsInGraphic);



module.exports = router;