const Task = require('../taskModel');
const User = require('../../Users/userModel');
const jwt = require('jsonwebtoken');

exports.createTask = (req) => {
  return new Promise(async (resolve, reject) => {
    const bodyAllowedList = ['task', 'date', 'status'];

    if (!(Object.keys(req.body).toString() === bodyAllowedList.toString())) {
      reject('Extra key detected');
    }
    const token = req.cookies.token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    User.findById(decodedToken.id)
      .then((user) => {
        const user_id = user._id.toString();
        const { task, date, status } = req.body;
        Task.create({
          task,
          date,
          status,
        })
          .then((newTask) => {
            Task.findByIdAndUpdate(newTask.id, { user: user_id })
              .then(resolve(newTask))
              .catch((err) => reject(err + 1));
          })
          .catch((err) => reject(err + 2));
      })
      .catch((err) => reject(err + 3));
  });
};
