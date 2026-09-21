const Review = require('../models/Review');
const Booking = require('../models/Booking');
const { successResponse, errorResponse } = require('../utils/apiResponse');

/**
 * Submit review for completed booking
 * PRD Section 17: Review & Rating System
 * Rules: One review per eligible booking; must be completed
 */
const createReview = async (req, res, next) => {
  try {
    const { bookingId, rating, comment } = req.body;

    if (!bookingId || !rating || !comment) {
      return errorResponse(res, 400, 'Please provide bookingId, rating (1-5), and comment.', 'MISSING_FIELDS');
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return errorResponse(res, 404, 'Booking not found.', 'BOOKING_NOT_FOUND');
    }

    // Verify ownership
    if (booking.tourist.toString() !== req.user._id.toString()) {
      return errorResponse(res, 403, 'You can only review your own bookings.', 'UNAUTHORIZED_ACCESS');
    }

    // Must be completed
    if (booking.bookingStatus !== 'completed') {
      return errorResponse(res, 400, 'Reviews are only permitted for completed experiences.', 'BOOKING_NOT_COMPLETED');
    }

    // Check for duplicate review
    const existingReview = await Review.findOne({ booking: bookingId });
    if (existingReview) {
      return errorResponse(res, 409, 'You have already submitted a review for this booking.', 'DUPLICATE_REVIEW');
    }

    const review = await Review.create({
      tourist: req.user._id,
      service: booking.service,
      booking: booking._id,
      rating: Number(rating),
      comment: comment.trim()
    });

    await review.populate('tourist', 'name profileImage');

    return successResponse(res, 201, 'Review submitted successfully', {
      review
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Get reviews for a service
 */
const getServiceReviews = async (req, res, next) => {
  try {
    const { limit = 20, page = 1 } = req.query;
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 20;
    const skip = (pageNum - 1) * limitNum;

    const query = {
      service: req.params.id,
      status: 'published'
    };

    const [reviews, total] = await Promise.all([
      Review.find(query)
        .populate('tourist', 'name profileImage')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      Review.countDocuments(query)
    ]);

    return successResponse(res, 200, 'Reviews fetched successfully', {
      reviews,
      pagination: {
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum),
        limit: limitNum
      }
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Delete or hide review (Owner or Admin)
 */
const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return errorResponse(res, 404, 'Review not found.', 'NOT_FOUND');
    }

    if (review.tourist.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return errorResponse(res, 403, 'Unauthorized to delete this review.', 'UNAUTHORIZED');
    }

    await review.deleteOne();

    return successResponse(res, 200, 'Review deleted successfully.');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createReview,
  getServiceReviews,
  deleteReview
};

