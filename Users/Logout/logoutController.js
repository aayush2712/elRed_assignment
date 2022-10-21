exports.logout = (req, res, next) => {
  res
    .cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
    })
    .status(200)
    .json({
      success: true,
      message: 'Succesfully logged out',
      result: [],
    });
};
