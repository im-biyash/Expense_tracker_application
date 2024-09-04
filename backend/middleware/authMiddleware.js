
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ msg: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log('Decoded User:', decoded); // Verify the decoded user
    next();
  } catch (error) {
    console.error('Invalid token error:', error);
    res.status(401).json({ msg: 'Invalid token' });
  }
};

module.exports = { authenticate };
