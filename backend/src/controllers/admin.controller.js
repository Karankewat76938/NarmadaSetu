const User = require('../models/User');
const Service = require('../models/Service');
const Booking = require('../models/Booking');
const PartnerApplication = require('../models/PartnerApplication');
const { notifyUser } = require('../services/notification.service');
const { successResponse, errorResponse } = require('../utils/apiResponse');

/**
 * Admin Dashboard Metrics
 * PRD Section 16: Dashboard Metrics
 */
const getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalUsers,
      totalPartners,
      totalServices,
      totalBookings,
      pendingApplications,
      bookings
    ] = await Promise.all([
      User.countDocuments({ role: 'tourist' }),
      User.countDocuments({ role: 'partner' }),
      Service.countDocuments(),
      Booking.countDocuments(),
      PartnerApplication.countDocuments({ applicationStatus: 'pending' }),
      Booking.find()
    ]);

    const completedBookings = bookings.filter(b => b.bookingStatus === 'completed').length;
    const cancelledBookings = bookings.filter(b => b.bookingStatus === 'cancelled').length;
    const pendingBookings = bookings.filter(b => b.bookingStatus === 'pending').length;
    const totalVolume = bookings
      .filter(b => b.bookingStatus === 'completed')
      .reduce((sum, b) => sum + (b.totalAmount || 0), 0);

    return successResponse(res, 200, 'Admin metrics fetched successfully', {
      totalUsers,
      totalPartners,
      totalServices,
      totalBookings,
      pendingApplications,
      completedBookings,
      cancelledBookings,
      pendingBookings,
      totalVolume
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Admin User Management
 */
const getUsers = async (req, res, next) => {
  try {
    const { role, status, search, page = 1, limit = 20 } = req.query;
    const query = {};

    if (role && role !== 'all') query.role = role;
    if (status && status !== 'all') query.accountStatus = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 20;
    const skip = (pageNum - 1) * limitNum;

    const [users, total] = await Promise.all([
      User.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
      User.countDocuments(query)
    ]);

    return successResponse(res, 200, 'Users retrieved successfully', {
      users,
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
 * Update user account status (e.g. suspend/activate)
 */
const updateUserStatus = async (req, res, next) => {
  try {
    const { accountStatus, role } = req.body;
    const updates = {};
    if (accountStatus) updates.accountStatus = accountStatus;
    if (role) updates.role = role;

    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!user) {
      return errorResponse(res, 404, 'User not found', 'USER_NOT_FOUND');
    }

    return successResponse(res, 200, 'User updated successfully', { user });
  } catch (err) {
    next(err);
  }
};

/**
 * Get Partner Applications
 * PRD Section 13 & 16: Partner Verification
 */
const getPartnerApplications = async (req, res, next) => {
  try {
    const { status = 'all', page = 1, limit = 20 } = req.query;
    const query = {};
    if (status !== 'all') query.applicationStatus = status;

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 20;
    const skip = (pageNum - 1) * limitNum;

    const [applications, total] = await Promise.all([
      PartnerApplication.find(query)
        .populate('user', 'name email phone profileImage accountStatus')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      PartnerApplication.countDocuments(query)
    ]);

    return successResponse(res, 200, 'Partner applications retrieved successfully', {
      applications,
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
 * Approve or reject partner application
 */
const updatePartnerApplicationStatus = async (req, res, next) => {
  try {
    const { applicationStatus, rejectionReason } = req.body;

    if (!['approved', 'rejected', 'suspended'].includes(applicationStatus)) {
      return errorResponse(res, 400, 'Invalid application status value.', 'INVALID_STATUS');
    }

    const application = await PartnerApplication.findById(req.params.id);
    if (!application) {
      return errorResponse(res, 404, 'Application not found', 'NOT_FOUND');
    }

    application.applicationStatus = applicationStatus;
    application.reviewedBy = req.user._id;
    application.reviewedAt = new Date();
    if (rejectionReason) application.rejectionReason = rejectionReason;

    await application.save();

    // If approved, ensure user has partner role
    if (applicationStatus === 'approved') {
      await User.findByIdAndUpdate(application.user, { role: 'partner' });
    }

    notifyUser({
      recipientId: application.user,
      event: `PARTNER_${applicationStatus.toUpperCase()}`,
      title: `Partner Application ${applicationStatus.charAt(0).toUpperCase() + applicationStatus.slice(1)}`,
      message: applicationStatus === 'approved'
        ? 'Congratulations! Your partner application has been approved. You can now list services.'
        : `Your application status: ${applicationStatus}. ${rejectionReason ? `Reason: ${rejectionReason}` : ''}`,
      data: { applicationId: application._id }
    });

    return successResponse(res, 200, `Partner application ${applicationStatus} successfully`, {
      application
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Get all services for moderation
 */
const getAdminServices = async (req, res, next) => {
  try {
    const { status, verificationStatus, page = 1, limit = 20 } = req.query;
    const query = {};
    if (status && status !== 'all') query.status = status;
    if (verificationStatus && verificationStatus !== 'all') query.verificationStatus = verificationStatus;

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 20;
    const skip = (pageNum - 1) * limitNum;

    const [services, total] = await Promise.all([
      Service.find(query)
        .populate('provider', 'name email phone')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum),
      Service.countDocuments(query)
    ]);

    return successResponse(res, 200, 'Services retrieved successfully', {
      services,
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
 * Update service moderation status
 */
const updateServiceStatus = async (req, res, next) => {
  try {
    const { status, verificationStatus } = req.body;
    const service = await Service.findById(req.params.id);

    if (!service) {
      return errorResponse(res, 404, 'Service not found', 'SERVICE_NOT_FOUND');
    }

    if (status) service.status = status;
    if (verificationStatus) service.verificationStatus = verificationStatus;

    await service.save();

    return successResponse(res, 200, 'Service moderation status updated', { service });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getDashboardStats,
  getUsers,
  updateUserStatus,
  getPartnerApplications,
  updatePartnerApplicationStatus,
  getAdminServices,
  updateServiceStatus
};

