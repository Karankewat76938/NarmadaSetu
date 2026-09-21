import api from './api';

export const bookingsAPI = {
  createBooking: (bookingData) => api.post('/bookings', bookingData),
  getBookings: (params = {}) => api.get('/bookings', { params }),
  getBookingById: (id) => api.get(`/bookings/${id}`),
  updateBookingStatus: (id, statusData) => api.patch(`/bookings/${id}/status`, statusData),
  cancelBooking: (id, cancelData) => api.post(`/bookings/${id}/cancel`, cancelData),
  createReview: (reviewData) => api.post('/reviews', reviewData)
};

