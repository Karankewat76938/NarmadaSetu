const User = require('../models/User');
const { generateToken } = require('../services/auth.service');
const { successResponse, errorResponse } = require('../utils/apiResponse');

/**
 * Register user
 * Security rule: Public registration must never allow creating an admin account (PRD Section 8.1)
 */
const register = async (req, res, next) => {
  try {
    const { name, email, password, phone, role } = req.body;

    if (!name || !email || !password) {
      return errorResponse(res, 400, 'Please provide name, email, and password.', 'MISSING_FIELDS');
    }

    // Disallow admin creation via public registration
    let userRole = role === 'partner' ? 'partner' : 'tourist';

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return errorResponse(res, 409, 'An account with this email address already exists.', 'EMAIL_IN_USE');
    }

    const passwordHash = await User.hashPassword(password);

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone ? phone.trim() : '',
      passwordHash,
      role: userRole
    });

    const token = generateToken(user._id, user.role);

    return successResponse(res, 201, 'Registration successful', {
      token,
      user
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Login user
 */
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(res, 400, 'Please provide email and password.', 'MISSING_CREDENTIALS');
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+passwordHash');
    if (!user) {
      return errorResponse(res, 401, 'Invalid email or password.', 'INVALID_CREDENTIALS');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return errorResponse(res, 401, 'Invalid email or password.', 'INVALID_CREDENTIALS');
    }

    if (user.accountStatus === 'suspended') {
      return errorResponse(res, 403, 'Your account has been suspended. Please contact support.', 'ACCOUNT_SUSPENDED');
    }

    const token = generateToken(user._id, user.role);

    return successResponse(res, 200, 'Login successful', {
      token,
      user: user.toJSON()
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Get current user profile
 */
const getMe = async (req, res, next) => {
  try {
    return successResponse(res, 200, 'Profile retrieved successfully', {
      user: req.user
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Update user profile
 */
const updateProfile = async (req, res, next) => {
  try {
    const { name, phone, profileImage } = req.body;
    const updates = {};

    if (name) updates.name = name.trim();
    if (phone !== undefined) updates.phone = phone.trim();
    if (profileImage !== undefined) updates.profileImage = profileImage;

    const updatedUser = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true
    });

    return successResponse(res, 200, 'Profile updated successfully', {
      user: updatedUser
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  login,
  getMe,
  updateProfile
};

