// controllers/CategoryRoutes.js

const express = require('express');
const router = express.Router();
const ActivityStatusesController = require('../controllers/ActivityStatusesController');

router.get('/', ActivityStatusesController.getAllActivityStatuses);

module.exports = router;