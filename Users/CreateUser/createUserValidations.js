const User = require('../userModel');

//Create user
exports.createUser = (req, next) => {
  return new Promise(async (resolve, reject) => {
    let bodyAllowedList = ['name', 'email', 'password'];

    if (!(Object.keys(req.body).toString() === bodyAllowedList.toString())) {
      reject('Extra key detected');
    }

    const { name, email, password } = req.body;
    User.create({ name, email, password })
      .then((user) => resolve(user))
      .catch((err) => reject(err));
  });
};
