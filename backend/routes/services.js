const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Service = require('../models/Service');

// High-fidelity Mock Services for Offline/Local Testing
const MOCK_SERVICES = [
  {
    _id: "service_1",
    title: "Sunrise Private Boat Ride to Marble Rocks",
    description: "Experience the magic of early morning sun rays hitting the white marble rocks along the holy Narmada River.",
    price: 800,
    type: "boat_ride",
    imageUrl: "sunsetview",
    location: "Bhedaghat, Jabalpur",
    provider: { name: "Ramesh Kewat", email: "ramesh@narmada.in" },
    createdAt: new Date()
  },
  {
    _id: "service_2",
    title: "Riverside Heritage Homestay",
    description: "Enjoy traditional hospitality in a beautiful local house situated directly on the banks of Narmada.",
    price: 2500,
    type: "home_stay",
    imageUrl: "stay",
    location: "Maheshwar Ghat",
    provider: { name: "Anjali Rajput", email: "anjali@narmada.in" },
    createdAt: new Date()
  },
  {
    _id: "service_3",
    title: "Exclusive Evening Aarti Darshan",
    description: "Experience a private boat-side viewing of the daily sunset Maha Aarti with direct spiritual guidance.",
    price: 500,
    type: "aarti",
    imageUrl: "eveningAarti",
    location: "Omkareshwar",
    provider: { name: "Deepak Nishad", email: "deepak@narmada.in" },
    createdAt: new Date()
  }
];

/*
====================================
GET ALL SERVICES
Public Route
====================================
*/
router.get('/', async (req, res) => {
  // ✅ Offline Mock Check
  if (!global.dbConnected) {
    return res.status(200).json({
      success: true,
      count: MOCK_SERVICES.length,
      data: MOCK_SERVICES
    });
  }

  try {
    const services = await Service
      .find()
      .populate('provider', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: services.length,
      data: services
    });

  } catch (error) {
    console.error('GET SERVICES ERROR:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
});


/*
====================================
CREATE SERVICE
Provider Only
====================================
*/
router.post('/', auth, async (req, res) => {
  // ✅ Offline Mock Check
  if (!global.dbConnected) {
    const { title, description, price, type, imageUrl, location } = req.body;
    const newService = {
      _id: "service_" + Math.random().toString(36).substring(2, 9),
      title,
      description,
      price: Number(price) || 0,
      type,
      imageUrl: imageUrl || "boat",
      location: location || "Bhedaghat, Jabalpur",
      provider: { name: "Mock Provider", email: req.user ? req.user.email : "provider@narmada.in" },
      createdAt: new Date()
    };
    MOCK_SERVICES.unshift(newService);
    return res.status(201).json({
      success: true,
      message: 'Service created successfully (Offline Mock)',
      data: newService
    });
  }

  try {

    // Authorization check
    if (req.user.role !== 'provider') {
      return res.status(403).json({
        success: false,
        message: 'Only providers can create services'
      });
    }

    const { title, description, price, type, imageUrl, location } = req.body;

    // Validation
    if (!title || !price || !type) {
      return res.status(400).json({
        success: false,
        message: 'Title, price and type are required'
      });
    }

    const service = new Service({
      provider: req.user.id,
      title,
      description,
      price,
      type,
      imageUrl,
      location
    });

    await service.save();

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: service
    });

  } catch (error) {
    console.error('CREATE SERVICE ERROR:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
});

module.exports = router;