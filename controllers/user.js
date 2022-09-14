const sendEmail = require('../middleware/sendemail');
const User = require('../models/User');

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(400).json({
      success: false,
      msg: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, otp } = req.body;

    let user = await User.findOne({ email }).select('+password');

    if (!user) {
      res.status(401).json({
        success: false,
        msg: 'Invalid credentials',
      });
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

      user = await User.updateOne({ otp: message });
      res.status(200).json({
        success: true,
        msg: 'OTP send please check your email',
      });
    }

    if (otp) {
      if (user.otp === otp) {
        await User.updateOne({ otp: '' });
        sendTokenResponse(user, 200, res);
      } else {
        res.status(400).json({
          success: false,
          msg: 'Old otp used',
        });
      }
    } else {
      const isMatch = await user.matchPassword(password.toString());

      if (!isMatch) {
        res.status(401).json({
          success: false,
          msg: 'Invalid credentials',
        });
      }
      sendTokenResponse(user, 200, res);
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      msg: err.message,
    });
  }
};

// exports.getUser = async (req, res) => {
//   try {
//     const user = await User.find({});
//     res.status(201).json({
//       success: true,
//       data: user,
//     });
//   } catch (err) {
//     res.status(400).json({
//       success: false,
//       msg: err.message,
//     });
//   }
// };

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
