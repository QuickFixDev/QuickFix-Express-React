// controllers/ResidenceController.js

const express = require('express');
const router = express.Router();
const ResidenceController = require('../controllers/ResidenceController');

router.get('/', ResidenceController.getAllResidences);
// router.get('/:id', ResidenceController.getResidenceById);
// router.get('/tenant/:id', ResidenceController.getResidenceByTenantId);
// router.get('/owner/:id', ResidenceController.getResidenceByOwnerId);
// router.delete('/:id', ResidenceController.deleteResidence);
router.post('/new', ResidenceController.createResidence);

module.exports = router;