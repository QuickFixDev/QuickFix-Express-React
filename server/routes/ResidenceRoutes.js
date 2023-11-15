// controllers/ResidenceController.js

const express = require('express');
const router = express.Router();
const ResidenceController = require('../controllers/ResidenceController');

router.get('/', ResidenceController.getAllResidences);
router.delete('/:id', ResidenceController.deleteResidence);
router.post('/new', ResidenceController.createResidence);

module.exports = router;