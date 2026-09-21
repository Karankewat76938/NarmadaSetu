const Booking = require('../models/Booking');
const { calculateAndValidateBooking } = require('../services/booking.service');
const { notifyUser } = require('../services/notification.service');
const { successResponse, errorResponse } = require('../utils/apiResponse');

/**
 * Create a new booking
 * Business rules: Price is calculated strictly on backend (PRD Section 12)
 */
const createBooking = async (req, res, next) => {
  try {
    const { serviceId, bookingDate, bookingTimeSlot, quantity, notes } = req.body;

    if (!serviceId || !bookingDate || !bookingTimeSlot) {
      return errorResponse(res, 400, 'Please provide serviceId, bookingDate, and bookingTimeSlot.', 'MISSING_FIELDS');
    }

    const {
      service,
      bookingDate: parsedDate,
      quantity: validQuantity,
      unitPrice,
      totalAmount,
      provider
    } = await calculateAndValidateBooking(serviceId, bookingDate, quantity);

    const booking = await Booking.create({
      tourist: req.user._id,
      service: service._id,
      provider: provider,
      bookingDate: parsedDate,
      bookingTimeSlot,
      quantity: validQuantity,
      unitPrice,
      totalAmount,
      bookingStatus: 'pending',
      paymentStatus: 'pending',
      notes: notes ? notes.trim() : ''
    });

    await booking.populate([
      { path: 'service', select: 'title category location price images' },
      { path: 'provider', select: 'name email phone' }
    ]);

    // Dispatch asynchronous notification
    notifyUser({
      recipientId: provider,
      event: 'BOOKING_CREATED',
      title: 'New Booking Request',
      message: `You received a new booking for ${service.title} on ${parsedDate.toDateString()}`,
      data: { bookingId: booking._id }
    });

    return successResponse(res, 201, 'Booking request submitted successfully', {
      booking
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Get bookings for current user (Tourist or Partner) or all for Admin
 */
const getBookings = async (req, res, next) => {
  try {
    const { status, limit = 50, page = 1 } = req.query;
    const filter = {};

    if (req.user.role === 'tourist') {
      filter.tourist = req.user._id;
    } else if (req.user.role === 'partner') {
      filter.provider = req.user._id;
    }
    // Admin has no user filter

    if (status) {
      filter.bookingStatus = status;
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 50;
    const skip = (pageNum - 1) * limitNum;

    const [bookings, total] = await Promise.all([
      Booking.find(filter)
        .populate('service', 'title category location price images')
        .populate('tourist', 'name email phone')
        .populate('provider', 'name email phone')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      Booking.countDocuments(filter)
    ]);

    return successResponse(res, 200, 'Bookings fetched successfully', {
      bookings,
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
 * Get booking by ID
 */
const getBookingById = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('service', 'title category location price images categoryDetails')
      .populate('tourist', 'name email phone')
      .populate('provider', 'name email phone');

    if (!booking) {
      return errorResponse(res, 404, 'Booking not found', 'BOOKING_NOT_FOUND');
    }

    // Access control check
    const isOwnerTourist = booking.tourist._id.toString() === req.user._id.toString();
    const isOwnerProvider = booking.provider._id.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isOwnerTourist && !isOwnerProvider && !isAdmin) {
      return errorResponse(res, 403, 'Unauthorized to view this booking.', 'UNAUTHORIZED_ACCESS');
    }

    return successResponse(res, 200, 'Booking details fetched successfully', {
      booking
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Update booking status (Partner or Admin: accept/reject/complete)
 */
const updateBookingStatus = async (req, res, next) => {
  try {
    const { status, paymentStatus } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return errorResponse(res, 404, 'Booking not found', 'BOOKING_NOT_FOUND');
    }

    const isProvider = booking.provider.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isProvider && !isAdmin) {
      return errorResponse(res, 403, 'Only the service partner or administrator can update booking status.', 'UNAUTHORIZED_ACCESS');
    }

    const validTransitions = ['confirmed', 'rejected', 'completed', 'cancelled'];
    if (status && !validTransitions.includes(status)) {
      return errorResponse(res, 400, `Invalid status value: ${status}`, 'INVALID_STATUS');
    }

    if (status) booking.bookingStatus = status;
    if (paymentStatus) booking.paymentStatus = paymentStatus;

    await booking.save();

    notifyUser({
      recipientId: booking.tourist,
      event: `BOOKING_${status ? status.toUpperCase() : 'UPDATED'}`,
      title: `Booking Update`,
      message: `Your booking status is now ${booking.bookingStatus}`,
      data: { bookingId: booking._id }
    });

    return successResponse(res, 200, 'Booking status updated successfully', {
      booking
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Cancel booking (Tourist or Admin)
 */
const cancelBooking = async (req, res, next) => {
  try {
    const { reason } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return errorResponse(res, 404, 'Booking not found', 'BOOKING_NOT_FOUND');
    }

    const isTourist = booking.tourist.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isTourist && !isAdmin) {
      return errorResponse(res, 403, 'You do not have permission to cancel this booking.', 'UNAUTHORIZED_ACCESS');
    }

    if (booking.bookingStatus === 'completed' || booking.bookingStatus === 'cancelled') {
      return errorResponse(res, 400, `Cannot cancel a booking that is already ${booking.bookingStatus}.`, 'CANNOT_CANCEL');
    }

    booking.bookingStatus = 'cancelled';
    booking.cancelledBy = req.user._id;
    booking.cancellationReason = reason ? reason.trim() : 'Cancelled by user';

    await booking.save();

    return successResponse(res, 200, 'Booking cancelled successfully', {
      booking
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createBooking,
  getBookings,
  getBookingById,
  updateBookingStatus,
  cancelBooking
};

