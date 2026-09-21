/**
 * Standard API Response Format as defined in PRD Section 28
 */

const successResponse = (res, statusCode = 200, message = 'Success', data = {}) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

const errorResponse = (res, statusCode = 500, message = 'An error occurred', errorCode = 'SERVER_ERROR', details = null) => {
  const payload = {
    success: false,
    message,
    error: {
      code: errorCode
    }
  };

  if (details && process.env.NODE_ENV === 'development') {
    payload.error.details = details;
  }

  return res.status(statusCode).json(payload);
};

module.exports = {
  successResponse,
  errorResponse
};

