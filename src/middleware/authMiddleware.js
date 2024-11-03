const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Retrieve token from headers (could be from "Authorization" or "x-auth-token" headers)
  const token = req.header('x-auth-token') || req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user information to request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error('JWT verification error:', err); // Log error for debugging
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
