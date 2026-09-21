const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { protect } = require('../middleware/auth.middleware');
const { restrictTo } = require('../middleware/role.middleware');
const { validateObjectId } = require('../middleware/validation.middleware');

// All admin routes require admin role
router.use(protect, restrictTo('admin'));

router.get('/dashboard', adminController.getDashboardStats);

router.get('/users', adminController.getUsers);
router.patch('/users/:id/status', validateObjectId('id'), adminController.updateUserStatus);

router.get('/partners', adminController.getPartnerApplications);
router.patch('/partners/:id/status', validateObjectId('id'), adminController.updatePartnerApplicationStatus);

router.get('/services', adminController.getAdminServices);
router.patch('/services/:id/status', validateObjectId('id'), adminController.updateServiceStatus);

module.exports = router;

