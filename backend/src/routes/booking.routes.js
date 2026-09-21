const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');
const { protect } = require('../middleware/auth.middleware');
const { validateObjectId } = require('../middleware/validation.middleware');

router.use(protect); // All booking routes require authentication

router.post('/', bookingController.createBooking);
router.get('/', bookingController.getBookings);
router.get('/:id', validateObjectId('id'), bookingController.getBookingById);
router.patch('/:id/status', validateObjectId('id'), bookingController.updateBookingStatus);
router.post('/:id/cancel', validateObjectId('id'), bookingController.cancelBooking);

module.exports = router;

