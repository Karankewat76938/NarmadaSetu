const jwt = require('jsonwebtoken');
const env = require('../config/env');
const User = require('../models/User');
const { errorResponse } = require('../utils/apiResponse');

const protect = async (req, res, next) => {
  try {
    let token = null;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return errorResponse(res, 401, 'Authentication token missing. Please log in.', 'AUTH_TOKEN_MISSING');
    }

    const decoded = jwt.verify(token, env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return errorResponse(res, 401, 'User associated with this token no longer exists.', 'USER_NOT_FOUND');
    }

    if (user.accountStatus === 'suspended') {
      return errorResponse(res, 403, 'Your account has been suspended. Please contact support.', 'ACCOUNT_SUSPENDED');
    }

    if (user.accountStatus === 'inactive') {
      return errorResponse(res, 403, 'Your account is inactive. Please contact support.', 'ACCOUNT_INACTIVE');
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { protect };

