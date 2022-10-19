const errorHandler = (err, req, res, next) => {
  res.status(400).json({
    success: false,
    message: err.message,
    result: [],
  });
};

module.exports = errorHandler;
