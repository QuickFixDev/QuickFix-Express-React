// controllers/RoleController.js

const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/RoleController');

router.get('/', RoleController.getAllRoles);
router.get('/:id', RoleController.getRoleById);
router.post('/new', RoleController.createRole);
router.post('/edit/:id', RoleController.editRole);

module.exports = router;