const Service = require('../models/Service');
const PartnerApplication = require('../models/PartnerApplication');
const { successResponse, errorResponse } = require('../utils/apiResponse');

/**
 * Get services with search, filtering, sorting, and pagination
 * PRD Section 18: Search & Filtering
 */
const getServices = async (req, res, next) => {
  try {
    const {
      search,
      category,
      city,
      minPrice,
      maxPrice,
      rating,
      sort,
      page = 1,
      limit = 12
    } = req.query;

    const query = {
      status: 'active',
      verificationStatus: 'approved'
    };

    // Text / Keyword Search
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { 'location.name': { $regex: search, $options: 'i' } },
        { 'location.ghat': { $regex: search, $options: 'i' } },
        { 'location.city': { $regex: search, $options: 'i' } }
      ];
    }

    // Category Filter
    if (category && category !== 'all') {
      query.category = category;
    }

    // City / Location Filter
    if (city && city !== 'all') {
      query['location.city'] = { $regex: city, $options: 'i' };
    }

    // Price Range Filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Rating Filter
    if (rating) {
      query.rating = { $gte: Number(rating) };
    }

    // Sorting
    let sortOption = { createdAt: -1 }; // newest by default
    if (sort === 'price_asc') sortOption = { price: 1 };
    else if (sort === 'price_desc') sortOption = { price: -1 };
    else if (sort === 'rating') sortOption = { rating: -1 };
    else if (sort === 'popular') sortOption = { reviewCount: -1 };

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 12;
    const skip = (pageNum - 1) * limitNum;

    const [services, total] = await Promise.all([
      Service.find(query)
        .populate('provider', 'name email phone profileImage')
        .sort(sortOption)
        .skip(skip)
        .limit(limitNum),
      Service.countDocuments(query)
    ]);

    return successResponse(res, 200, 'Services fetched successfully', {
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
 * Get single service by ID
 */
const getServiceById = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id)
      .populate('provider', 'name email phone profileImage');

    if (!service) {
      return errorResponse(res, 404, 'Service not found', 'SERVICE_NOT_FOUND');
    }

    return successResponse(res, 200, 'Service details fetched successfully', {
      service
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Create new service (Partner or Admin)
 */
const createService = async (req, res, next) => {
  try {
    // If partner, verify they have an approved partner application unless admin
    if (req.user.role === 'partner') {
      const application = await PartnerApplication.findOne({ user: req.user._id });
      if (!application || application.applicationStatus !== 'approved') {
        return errorResponse(
          res,
          403,
          'Your partner application is pending approval. Only verified partners can publish services.',
          'PARTNER_NOT_VERIFIED'
        );
      }
    }

    const {
      category,
      title,
      description,
      price,
      pricingUnit,
      location,
      images,
      availability,
      categoryDetails
    } = req.body;

    if (!category || !title || !description || !price || !location?.name) {
      return errorResponse(res, 400, 'Please provide category, title, description, price, and location.', 'MISSING_FIELDS');
    }

    const service = await Service.create({
      provider: req.user._id,
      category,
      title,
      description,
      price,
      pricingUnit: pricingUnit || 'per_person',
      location,
      images: images || [],
      availability: availability || {},
      categoryDetails: categoryDetails || {},
      verificationStatus: req.user.role === 'admin' ? 'approved' : 'pending',
      status: 'active'
    });

    return successResponse(res, 201, 'Service listing created successfully', {
      service
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Update service (Ownership required or admin)
 */
const updateService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return errorResponse(res, 404, 'Service not found', 'SERVICE_NOT_FOUND');
    }

    // Ownership check
    if (service.provider.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return errorResponse(res, 403, 'You do not have permission to edit this service listing.', 'UNAUTHORIZED_ACCESS');
    }

    const allowedUpdates = [
      'title', 'description', 'price', 'pricingUnit', 'location', 'images',
      'availability', 'status', 'categoryDetails'
    ];

    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        service[field] = req.body[field];
      }
    });

    await service.save();

    return successResponse(res, 200, 'Service updated successfully', {
      service
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Delete / deactivate service
 */
const deleteService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return errorResponse(res, 404, 'Service not found', 'SERVICE_NOT_FOUND');
    }

    if (service.provider.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return errorResponse(res, 403, 'You do not have permission to delete this service listing.', 'UNAUTHORIZED_ACCESS');
    }

    service.status = 'inactive';
    await service.save();

    return successResponse(res, 200, 'Service deactivated successfully');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService
};

