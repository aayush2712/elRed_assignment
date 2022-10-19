const Task = require('./taskModel');
const User = require('../Users/userModel');
const jwt = require('jsonwebtoken');

exports.createTask = (req, next) => {
  return new Promise(async (resolve, reject) => {
    const bodyAllowedList = ['task', 'date', 'status'];

    if (!(Object.keys(req.body).toString() === bodyAllowedList.toString())) {
      reject('Extra key detected');
    }
    const token = req.cookies.token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.id);
    const user_id = user._id.toString();
    const { task, date, status } = req.body;
    const newTask = await Task.create({
      task,
      date,
      status,
    });
    await Task.findByIdAndUpdate(newTask.id, { user: user_id });
    resolve(newTask);
  });
};

exports.updateTask = (req, next) => {
  return new Promise(async (resolve, reject) => {
    let find = await Task.findById(req.params.id);

    if (!find) {
      reject('Task Not Found');
    }

    if (find.user.toString() !== req.user.id) {
      reject('User not authorized to update this task');
    }
    find = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    resolve(find);
  });
};

exports.deleteTask = (req, next) => {
  return new Promise(async (resolve, reject) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
      reject('Task not found');
    }
    if (task.user.toString() !== req.user.id) {
      reject('User not authorized to delete this task');
    }
    const del = await Task.findByIdAndDelete(req.params.id);
    resolve(del);
  });
};
