const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Booking = require('../models/Booking');

// Create a booking
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'tourist') {
    return res.status(403).json({ msg: 'Only tourists can make bookings' });
  }

  const { serviceId, date, totalAmount } = req.body;

  try {
    const newBooking = new Booking({
      tourist: req.user.id,
      service: serviceId,
      date,
      totalAmount
    });

    const booking = await newBooking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Get user's bookings
router.get('/', auth, async (req, res) => {
  try {
    let bookings;
    if (req.user.role === 'tourist') {
      bookings = await Booking.find({ tourist: req.user.id }).populate('service');
    } else {
      // Provider bookings would require joining Service to see if they own it.
      // For simplicity, just handling basic tourist view here.
      bookings = await Booking.find().populate('service');
    }
    res.json(bookings);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
