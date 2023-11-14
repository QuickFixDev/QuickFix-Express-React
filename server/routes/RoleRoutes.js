// controllers/RoleController.js

const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/RoleController');

router.post('/new', RoleController.createRole);
router.get('/', RoleController.getAllRoles);
router.get('/:id', RoleController.getRoleById);

module.exports = router;