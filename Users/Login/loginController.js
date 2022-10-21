const errorResponse = require('../../Utility/errorResponse');
const sendTokenResponse = require('../../Utility/sendTokenResponse');
const { login } = require('./loginValidations');

exports.login = async (req, res, next) => {
  let user = login(req, res, next);
  user
    .then((user) => sendTokenResponse(user, 200, res))
    .catch((err) => next(new errorResponse(err, 400)));
};
