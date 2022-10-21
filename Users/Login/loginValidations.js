const User = require('../userModel');
const sendEmail = require('../../middleware/sendemail');

//To check for user,password and otp
exports.login = async (req, res, next) => {
  return new Promise(async (resolve, reject) => {
    const { email, password, otp } = req.body;

    User.findOne({ email })
      .select('+password')
      .then((user) => {
        if (!user) {
          reject('Invalid credentials');
        } else if (!password && !otp) {
          const message = user.generateOTP();

          sendEmail({
            email: user.email,
            message,
          }).catch(reject('Email sending failed'));

          user = User.updateOne({ email: email }, { otp: message }).catch(
            (err) => reject(err)
          );
          res.status(200).json({
            success: true,
            message: 'OTP sent please check your email',
            result: [],
          });
        } else if (otp) {
          if (user.otp === otp) {
            User.updateOne({ email: email }, { otp: '' })
              .then(resolve(user))
              .catch((err) => reject(err));
          } else {
            reject('Old otp used');
          }
        } else {
          const isMatch = user
            .matchPassword(password)
            .catch((err) => reject(err));

          if (!isMatch) {
            reject('Invalid credentials');
          }
          resolve(user);
        }
      })
      .catch((err) => reject(err));
  });
};
