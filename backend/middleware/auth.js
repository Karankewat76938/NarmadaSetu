const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

  // ✅ Get Authorization header
  const authHeader = req.header('Authorization');

  // ❌ No header
  if (!authHeader) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // ✅ Expect: Bearer TOKEN
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : authHeader;

  try {
    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded.user;
    next();

  } catch (err) {
    console.error('JWT Error:', err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};