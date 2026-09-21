const express = require('express');
const router = express.Router();
const partnerController = require('../controllers/partner.controller');
const { protect } = require('../middleware/auth.middleware');

router.use(protect); // All partner routes require authentication

router.post('/apply', partnerController.applyPartner);
router.get('/me', partnerController.getPartnerMe);
router.patch('/me', partnerController.updatePartnerProfile);

module.exports = router;

