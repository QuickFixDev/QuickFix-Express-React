// controllers/ComplaintFormController.js

const express = require('express');
const router = express.Router();
const ComplaintFormController = require('../controllers/ComplaintFormController');
const CategoryController = require('../controllers/CategoryController');

router.get('/', CategoryController.getAllCategories);
router.post('/', ComplaintFormController.createComplaint);

module.exports = router;