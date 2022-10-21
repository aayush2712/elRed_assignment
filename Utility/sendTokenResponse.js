const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(Date.now() + 30 * 1000),
    httpOnly: true,
  };
  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      sucess: true,
      message: 'Token generated',
      result: [{ token }],
    });
};

module.exports = sendTokenResponse;
