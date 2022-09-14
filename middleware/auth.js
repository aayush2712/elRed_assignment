const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(
      res.status(401).json({
        success: false,
        msg: 'Not authorized to view this route',
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
        msg: 'Not authorized to view this route',
      })
    );
  }
};