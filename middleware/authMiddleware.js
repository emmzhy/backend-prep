const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1. Check if Authorization header exists and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  // 2. Extract the token after "Bearer "
  const token = authHeader.split(' ')[1];

  try {
    // 3. Verify token using JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach userId to the request
    next(); // Allow request to proceed to taskController
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token.' });
  }
};