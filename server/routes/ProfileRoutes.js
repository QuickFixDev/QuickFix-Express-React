// controllers/ProfileController.js

const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers/ProfileController');

router.get('/', ProfileController.getProfileInfo);

module.exports = router;