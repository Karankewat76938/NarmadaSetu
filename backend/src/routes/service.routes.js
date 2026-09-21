const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service.controller');
const { protect } = require('../middleware/auth.middleware');
const { restrictTo } = require('../middleware/role.middleware');
const { validateObjectId } = require('../middleware/validation.middleware');

// Public routes
router.get('/', serviceController.getServices);
router.get('/:id', validateObjectId('id'), serviceController.getServiceById);

// Protected routes (Partner & Admin)
router.post('/', protect, restrictTo('partner', 'admin'), serviceController.createService);
router.patch('/:id', protect, validateObjectId('id'), restrictTo('partner', 'admin'), serviceController.updateService);
router.delete('/:id', protect, validateObjectId('id'), restrictTo('partner', 'admin'), serviceController.deleteService);

module.exports = router;

