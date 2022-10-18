const { createUser, login, logout, checkKeys } = require('./userValidations');
const User = require('./userModel');
const errorResponse = require('../Utility/errorResponse');

exports.createUser = async (req, res, next) => {
  checkKeys(req, next);
  try {
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password,
    });
    sendTokenResponse(user, 200, res);
  } catch (err) {
    return next(new errorResponse(err.message, 400));
  }
};

exports.login = async (req, res, next) => {
  login(req, res, next);
};

exports.logout = (req, res, next) => {
  logout(req, res, next);
};

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(Date.now() + 30 * 1000),
    httpOnly: true,
  };
  res.status(statusCode).cookie('token', token, options).json({
    sucess: true,
    token,
  });
};
