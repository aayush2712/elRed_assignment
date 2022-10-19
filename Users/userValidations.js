const errorResponse = require('../Utility/errorResponse');
const User = require('./userModel');
const sendEmail = require('../middleware/sendemail');

//Create user
exports.createUser = (req, next) => {
  return new Promise(async (resolve, reject) => {
    let bodyAllowedList = ['name', 'email', 'password'];

    if (!(Object.keys(req.body).toString() === bodyAllowedList.toString())) {
      reject('Extra key detected');
    }
    try {
      const { name, email, password } = req.body;
      const user = await User.create({ name, email, password });
      resolve(user);
    } catch (err) {
      return next(new errorResponse(err.message, 400));
    }
  });
};

//To check for user,password and otp
exports.login = async (req, res, next) => {
  return new Promise(async (resolve, reject) => {
    const { email, password, otp } = req.body;

    let user = await User.findOne({ email }).select('+password');

    if (!user) {
      reject('Invalid credentials');
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
        resolve(user);
      } else {
        reject('Old otp used');
      }
    } else {
      const isMatch = await user.matchPassword(password.toString());

      if (!isMatch) {
        reject('Invalid credentials');
      }
      resolve(user);
    }
  });
};
