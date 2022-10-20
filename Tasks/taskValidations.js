const Task = require('./taskModel');
const User = require('../Users/userModel');
const jwt = require('jsonwebtoken');

exports.createTask = (req) => {
  return new Promise(async (resolve, reject) => {
    const bodyAllowedList = ['task', 'date', 'status'];

    if (!(Object.keys(req.body).toString() === bodyAllowedList.toString())) {
      reject('Extra key detected');
    }
    const token = req.cookies.token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    User.findById(decodedToken.id).then((user) => {
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
            .catch((err) => reject(err));
        })
        .catch((err) => reject(err));
    });
  }).catch((err) => reject(err));
};

exports.updateTask = (req) => {
  return new Promise(async (resolve, reject) => {
    Task.findById(req.params.id)
      .then((task) => {
        if (!task) {
          reject('Task Not Found');
        } else if (task.user.toString() !== req.user.id) {
          reject('User not authorized to update this task');
        }
        task = Task.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true,
        })
          .then(resolve(task))
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });
};

exports.deleteTask = (req) => {
  return new Promise(async (resolve, reject) => {
    Task.findById(req.params.id)
      .then((task) => {
        if (!task) {
          reject('Task not found');
        } else if (task.user.toString() !== req.user.id) {
          reject('User not authorized to delete this task');
        }
        Task.findByIdAndDelete(req.params.id)
          .then((del) => resolve(del))
          .catch((err) => reject(err));
      })
      .catch((err) => reject(err));
  });
};
