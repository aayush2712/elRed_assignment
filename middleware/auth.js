const jwt = require('jsonwebtoken');
const User = require('../Users/userModel');

exports.protect = async (req, res, next) => {
  let token;

  if (req.cookies.token) {
    token = req.cookies.token;
  }
  if (!token) {
    return next(
      res.status(401).json({
        success: false,
        message: 'Not authorized to view this route',
        result: [],
      })
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return next(
      res.status(401).json({
        success: false,
        message: 'Not authorized to view this route',
        result: [],
      })
    );
  }
};
