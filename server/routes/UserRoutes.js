// controllers/UserController.js

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/', UserController.deleteUser);
router.get('/', UserController.getAllUsers);
router.post('/new', UserController.getAllUsers);
router.delete('/:id', UserController.deleteUser);

module.exports = router;