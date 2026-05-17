const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Service = require('../models/Service');

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find().populate('provider', 'name');
    res.json(services);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Create a service (Provider only)
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'provider') {
    return res.status(403).json({ msg: 'Not authorized to create a service' });
  }

  const { title, description, price, type, imageUrl, location } = req.body;

  try {
    const newService = new Service({
      provider: req.user.id,
      title,
      description,
      price,
      type,
      imageUrl,
      location
    });

    const service = await newService.save();
    res.json(service);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
