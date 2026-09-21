const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');
const { protect } = require('../middleware/auth.middleware');
const { validateObjectId } = require('../middleware/validation.middleware');

// Public route to fetch reviews for a service
router.get('/service/:id', validateObjectId('id'), reviewController.getServiceReviews);

// Protected routes
router.post('/', protect, reviewController.createReview);
router.delete('/:id', protect, validateObjectId('id'), reviewController.deleteReview);

module.exports = router;

