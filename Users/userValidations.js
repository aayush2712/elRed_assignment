const errorResponse = require('../Utility/errorResponse');
const User = require('./userModel');
const sendEmail = require('../middleware/sendemail');

exports.checkKeys = (req, next) => {
  return new Promise((resolve, reject) => {
    let bodyAllowedList = ['name', 'email', 'password'];
    if (!(Object.keys(req.body).toString() === bodyAllowedList.toString())) {
      return next(new errorResponse('Extra key detected', 400));
    }
  });
};

exports.createUser = (req, res, next) => {};

exports.login = async (req, res, next) => {
  try {
    const { email, password, otp } = req.body;

    let user = await User.findOne({ email }).select('+password');

    if (!user) {
      return next(new errorResponse('Invalid credentials', 401));
    }

    if (!password && !otp) {
      const message = user.generateOTP();

      try {
        await sendEmail({
          email: user.email,
          message,
        });
      } catch (err) {
        console.log(err);
      }

      user = await User.updateOne({ email: email }, { otp: message });
      res.status(200).json({
        success: true,
        msg: 'OTP sent please check your email',
      });
    }

    if (otp) {
      if (user.otp === otp) {
        await User.updateOne({ email: email }, { otp: '' });
        sendTokenResponse(user, 200, res);
      } else {
        return next(new errorResponse('Old otp used', 400));
      }
    } else {
      const isMatch = await user.matchPassword(password.toString());

      if (!isMatch) {
        return next(new errorResponse('Invalid credentials', 400));
      }
      sendTokenResponse(user, 200, res);
    }
  } catch (err) {
    return next(new errorResponse(err.message, 400));
  }
};

exports.logout = (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
  });

  res.status(200).json({
    success: true,
  });
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
