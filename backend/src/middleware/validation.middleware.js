const mongoose = require('mongoose');
const { errorResponse } = require('../utils/apiResponse');

const validateObjectId = (paramName = 'id') => {
  return (req, res, next) => {
    const id = req.params[paramName];
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return errorResponse(res, 400, `Invalid ID format for parameter: ${paramName}`, 'INVALID_ID');
    }
    next();
  };
};

module.exports = { validateObjectId };

