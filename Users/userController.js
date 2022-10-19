const errorResponse = require('../Utility/errorResponse');
const {
  createUser,
  checkKeys,
  checkUser,
  checkPasswordOtp,
  login,
} = require('./userValidations');

exports.createUser = async (req, res, next) => {
  let user = createUser(req, next);
  user
    .then((user) => sendTokenResponse(user, 200, res))
    .catch((err) => next(new errorResponse(err, 400)));
};

exports.login = async (req, res, next) => {
  let user = login(req, res, next);
  user
    .then((user) => sendTokenResponse(user, 200, res))
    .catch((err) => next(new errorResponse(err, 400)));
};

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
