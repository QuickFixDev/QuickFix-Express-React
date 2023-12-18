// controllers/UserController.js

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const ComplaintController = require('../controllers/ComplaintController');

router.post('/', UserController.deleteUser);
router.get('/', UserController.getAllUsers);
router.get('/get-by-email/:id', UserController.getUserByEmail);
router.post('/new', UserController.createUser);
router.post('/access/:id', UserController.updateUserStatus);
router.delete('/:id', UserController.deleteUser);

module.exports = router;