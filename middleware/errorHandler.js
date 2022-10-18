const errorHandler = (err, req, res, next) => {
  res.status(400).json({
    success: 'False',
    error: err.message,
  });
};

module.exports = errorHandler;
