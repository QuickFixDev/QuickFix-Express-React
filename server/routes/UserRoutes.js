// controllers/UserController.js

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const ComplaintController = require('../controllers/ComplaintController');

router.post('/', UserController.deleteUser);
router.get('/:id', UserController.getUserId);
router.get('/', UserController.getAllUsers);
router.post('/new', UserController.createUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;