const { errorResponse } = require('../utils/apiResponse');

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return errorResponse(
        res,
        403,
        `Access denied. Your role (${req.user ? req.user.role : 'unauthenticated'}) cannot perform this action.`,
        'FORBIDDEN'
      );
    }
    next();
  };
};

module.exports = { restrictTo };

