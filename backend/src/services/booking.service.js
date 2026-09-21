const Service = require('../models/Service');
const Booking = require('../models/Booking');

/**
 * Validates and calculates booking details strictly on server-side
 * Client-provided prices are ignored per PRD Section 12
 */
const calculateAndValidateBooking = async (serviceId, bookingDateStr, quantity) => {
  const service = await Service.findById(serviceId);
  if (!service) {
    const error = new Error('Selected service does not exist.');
    error.statusCode = 404;
    error.code = 'SERVICE_NOT_FOUND';
    throw error;
  }

  if (service.status !== 'active' || service.verificationStatus !== 'approved') {
    const error = new Error('This service is currently unavailable for booking.');
    error.statusCode = 400;
    error.code = 'SERVICE_UNAVAILABLE';
    throw error;
  }

  const bookingDate = new Date(bookingDateStr);
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  if (isNaN(bookingDate.getTime()) || bookingDate < now) {
    const error = new Error('Booking date must be today or a future date.');
    error.statusCode = 400;
    error.code = 'INVALID_DATE';
    throw error;
  }

  const parsedQuantity = Math.max(1, parseInt(quantity, 10) || 1);

  // Check capacity if boat ride or homestay
  if (service.category === 'boat_ride' && service.categoryDetails?.capacity) {
    if (parsedQuantity > service.categoryDetails.capacity) {
      const error = new Error(`Quantity exceeds max boat capacity (${service.categoryDetails.capacity} persons).`);
      error.statusCode = 400;
      error.code = 'CAPACITY_EXCEEDED';
      throw error;
    }
  }

  const unitPrice = service.price;
  const totalAmount = unitPrice * parsedQuantity;

  return {
    service,
    bookingDate,
    quantity: parsedQuantity,
    unitPrice,
    totalAmount,
    provider: service.provider
  };
};

module.exports = {
  calculateAndValidateBooking
};

