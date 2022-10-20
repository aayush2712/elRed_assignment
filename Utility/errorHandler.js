const ErrorResponse = require('./errorResponse');

const errorHandler = (err, req, res, next) => {
  let errName = err.message.split(':')[0];
  let error = { ...err };
  error.message = err.message;
  if (errName === 'ValidationError') {
    const msg = 'Please enter correct value type';
    error = new ErrorResponse(msg, 400);
  } else if (errName === 'ReferenceError') {
    const msg = 'Please enter correct value type';
    error = new ErrorResponse(msg, 400);
  }
  res.status(400).json({
    success: false,
    message: error.message,
    result: [],
  });
};

module.exports = errorHandler;
