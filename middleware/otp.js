const otpGenerator = require('otp-generator');
generateOTP = () => {
  const OTP = otpGenerator.generate(4, {
    digits: true,
    specialChars: false,
  });
  console.log(OTP);
};

generateOTP();
