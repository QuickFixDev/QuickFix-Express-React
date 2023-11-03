// controllers/RoleController.js

const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/RoleController');

router.post('/', RoleController.createRole);

module.exports = router;