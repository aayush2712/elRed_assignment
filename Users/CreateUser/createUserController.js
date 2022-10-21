const errorResponse = require('../../Utility/errorResponse');
const sendTokenResponse = require('../../Utility/sendTokenResponse');
const { createUser } = require('./createUserValidations');

exports.createUser = async (req, res, next) => {
  let user = createUser(req, next);
  user
    .then((user) => next(sendTokenResponse(user, 200, res)))
    .catch((err) => next(new errorResponse(err, 400)));
};
