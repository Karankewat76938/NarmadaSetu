const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const Booking = require('../models/Booking');
const Service = require('../models/Service');

/*
====================================
CREATE BOOKING
Tourist Only
====================================
*/
router.post('/', auth, async (req, res) => {
  try {

    // Role Check
    if (req.user.role !== 'tourist') {
      return res.status(403).json({
        success: false,
        message: 'Only tourists can make bookings'
      });
    }

    const { serviceId, date, totalAmount } = req.body;

    // Validation
    if (!serviceId || !date || !totalAmount) {
      return res.status(400).json({
        success: false,
        message: 'All booking fields are required'
      });
    }

    // Check service exists
    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    const booking = new Booking({
      tourist: req.user.id,
      service: serviceId,
      date,
      totalAmount,
      status: 'pending'
    });

    await booking.save();

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: booking
    });

  } catch (error) {
    console.error('CREATE BOOKING ERROR:', error.message);

    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
});


/*
====================================
GET USER BOOKINGS
Tourist / Provider
====================================
*/
router.get('/', auth, async (req, res) => {
  try {

    let bookings = [];

    // Tourist view
    if (req.user.role === 'tourist') {

      bookings = await Booking.find({
        tourist: req.user.id
      })
        .populate('service')
        .sort({ createdAt: -1 });

    }

    // Provider view (see bookings for their services)
    else if (req.user.role === 'provider') {

      bookings = await Booking.find()
        .populate({
          path: 'service',
          match: { provider: req.user.id }
        })
        .populate('tourist', 'name email');

      // Remove null services
      bookings = bookings.filter(b => b.service);
    }

    // Admin view
    else if (req.user.role === 'admin') {

      bookings = await Booking.find()
        .populate('service')
        .populate('tourist', 'name email')
        .sort({ createdAt: -1 });
    }

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });

  } catch (error) {
    console.error('GET BOOKINGS ERROR:', error.message);

    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
});

module.exports = router;