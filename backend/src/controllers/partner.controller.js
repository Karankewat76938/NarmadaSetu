const PartnerApplication = require('../models/PartnerApplication');
const Service = require('../models/Service');
const Booking = require('../models/Booking');
const User = require('../models/User');
const { successResponse, errorResponse } = require('../utils/apiResponse');

/**
 * Submit partner onboarding application
 * PRD Section 13: Partner Management Module
 */
const applyPartner = async (req, res, next) => {
  try {
    const {
      serviceCategory,
      businessName,
      experienceYears,
      contactDetails,
      documents
    } = req.body;

    if (!serviceCategory || !businessName || !contactDetails?.phone || !contactDetails?.address) {
      return errorResponse(res, 400, 'Please complete all required business and contact details.', 'MISSING_FIELDS');
    }

    let application = await PartnerApplication.findOne({ user: req.user._id });

    if (application && application.applicationStatus === 'approved') {
      return errorResponse(res, 400, 'You are already an approved partner.', 'ALREADY_APPROVED');
    }

    if (application) {
      // Update existing application
      application.serviceCategory = serviceCategory;
      application.businessName = businessName.trim();
      application.experienceYears = Number(experienceYears) || 1;
      application.contactDetails = contactDetails;
      if (documents) application.documents = documents;
      application.applicationStatus = 'pending';
      application.rejectionReason = '';
      await application.save();
    } else {
      application = await PartnerApplication.create({
        user: req.user._id,
        serviceCategory,
        businessName: businessName.trim(),
        experienceYears: Number(experienceYears) || 1,
        contactDetails,
        documents: documents || {}
      });
    }

    // Update user role to partner if currently tourist
    if (req.user.role === 'tourist') {
      await User.findByIdAndUpdate(req.user._id, { role: 'partner' });
    }

    return successResponse(res, 201, 'Partner application submitted successfully. It is now awaiting admin review.', {
      application
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Get partner dashboard overview & application status
 * PRD Section 15: Partner Dashboard
 */
const getPartnerMe = async (req, res, next) => {
  try {
    const application = await PartnerApplication.findOne({ user: req.user._id });

    // Aggregate partner metrics
    const [totalServices, bookings] = await Promise.all([
      Service.countDocuments({ provider: req.user._id }),
      Booking.find({ provider: req.user._id })
    ]);

    const pendingBookings = bookings.filter(b => b.bookingStatus === 'pending').length;
    const confirmedBookings = bookings.filter(b => b.bookingStatus === 'confirmed').length;
    const completedBookings = bookings.filter(b => b.bookingStatus === 'completed').length;
    const totalEarnings = bookings
      .filter(b => b.bookingStatus === 'completed')
      .reduce((sum, b) => sum + (b.totalAmount || 0), 0);

    return successResponse(res, 200, 'Partner dashboard data fetched successfully', {
      application: application || { applicationStatus: 'unregistered' },
      metrics: {
        totalServices,
        pendingBookings,
        confirmedBookings,
        completedBookings,
        totalEarnings
      }
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Update partner profile
 */
const updatePartnerProfile = async (req, res, next) => {
  try {
    const { businessName, contactDetails } = req.body;
    const application = await PartnerApplication.findOne({ user: req.user._id });

    if (!application) {
      return errorResponse(res, 404, 'No partner profile found to update.', 'NOT_FOUND');
    }

    if (businessName) application.businessName = businessName.trim();
    if (contactDetails) application.contactDetails = { ...application.contactDetails, ...contactDetails };

    await application.save();

    return successResponse(res, 200, 'Partner profile updated successfully', {
      application
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  applyPartner,
  getPartnerMe,
  updatePartnerProfile
};

