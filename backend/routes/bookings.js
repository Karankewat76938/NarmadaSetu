const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const Booking = require('../models/Booking');
const Service = require('../models/Service');

// High-fidelity Mock Bookings for Offline/Local Testing
const MOCK_BOOKINGS = [
  {
    _id: "booking_1",
    date: new Date(Date.now() + 86400000 * 2), // 2 days later
    totalAmount: 800,
    guests: 1,
    status: "confirmed",
    tourist: "mock_user_123",
    service: {
      _id: "service_1",
      title: "Sunrise Private Boat Ride to Marble Rocks",
      location: "Bhedaghat, Jabalpur",
      price: 800
    },
    createdAt: new Date()
  }
];

/*
====================================
CREATE BOOKING
Tourist Only
====================================
*/
router.post('/', auth, async (req, res) => {
  // ✅ Offline Mock Check
  if (!global.dbConnected) {
    const { serviceId, date, totalAmount, guests } = req.body;
    const booking = {
      _id: "booking_" + Math.random().toString(36).substring(2, 9),
      tourist: req.user ? req.user.id : "mock_user_123",
      service: {
        _id: serviceId || "service_1",
        title: "Sunset Shared Boat Ride",
        location: "Bhedaghat, Jabalpur",
        price: Number(totalAmount) / (Number(guests) || 1) || 500
      },
      date: date || new Date(),
      totalAmount: Number(totalAmount) || 500,
      guests: Number(guests) || 1,
      status: 'pending',
      createdAt: new Date()
    };
    MOCK_BOOKINGS.unshift(booking);
    return res.status(201).json({
      success: true,
      message: 'Booking created successfully (Offline Mock)',
      data: booking
    });
  }

  try {

    // Role Check
    if (req.user.role !== 'tourist') {
      return res.status(403).json({
        success: false,
        message: 'Only tourists can make bookings'
      });
    }

    const { serviceId, date, totalAmount, guests } = req.body;

    // Validation
    if (!serviceId || !date || !totalAmount || !guests) {
      return res.status(400).json({
        success: false,
        message: 'All booking fields are required (including guests)'
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

    // Server-Side Price Verification
    const expectedAmount = service.price * Number(guests);
    if (Math.abs(expectedAmount - Number(totalAmount)) > 1) {
      return res.status(400).json({
        success: false,
        message: `Calculated totalAmount (${totalAmount}) does not match server-calculated expectedAmount (${expectedAmount})`
      });
    }

    const booking = new Booking({
      tourist: req.user.id,
      service: serviceId,
      date,
      totalAmount,
      guests: Number(guests),
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
  // ✅ Offline Mock Check
  if (!global.dbConnected) {
    return res.status(200).json({
      success: true,
      count: MOCK_BOOKINGS.length,
      data: MOCK_BOOKINGS
    });
  }

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