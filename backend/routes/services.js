const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Service = require('../models/Service');

/*
====================================
GET ALL SERVICES
Public Route
====================================
*/
router.get('/', async (req, res) => {
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