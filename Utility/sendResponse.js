const sendResponse = (msg, statusCode, res, data) => {
  res.status(statusCode).json({
    success: true,
    message: msg,
    result: [{ data }],
  });
};

module.exports = sendResponse;
