const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/*
============================
REGISTER USER
============================
*/
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // ✅ Validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({ msg: 'All fields required' });
    }

    // ✅ Allow only valid roles
    const allowedRoles = ['tourist', 'provider'];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({ msg: 'Invalid role selected' });
    }

    // ✅ Check existing user
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // ✅ Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    await user.save();

    // ✅ JWT
    const payload = {
      user: { id: user.id, role: user.role }
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role
      }
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});


/*
============================
LOGIN USER
============================
*/
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Validation
    if (!email || !password) {
      return res.status(400).json({ msg: 'Email & Password required' });
    }

    // ✅ Check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // ✅ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // ✅ JWT
    const payload = {
      user: { id: user.id, role: user.role }
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role
      }
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;