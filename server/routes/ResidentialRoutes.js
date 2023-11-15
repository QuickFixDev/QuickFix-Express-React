// controllers/ResidentialController.js

const express = require('express');
const router = express.Router();
const ResidentialController = require('../controllers/ResidentialController');

router.get('/', ResidentialController.getAllResidentials);
router.delete('/:id', ResidentialController.deleteResidential);
router.post('/new', ResidentialController.createResidential);

module.exports = router;