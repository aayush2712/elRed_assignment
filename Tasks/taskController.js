const Task = require('./taskModel');
const User = require('../Users/userModel');
const jwt = require('jsonwebtoken');

exports.createTask = async (req, res, next) => {
  const bodyAllowedList = ['task', 'date', 'status'];

  if (!(Object.keys(req.body).toString() === bodyAllowedList.toString())) {
    return next(
      res.status(400).json({
        success: 'false',
        msg: 'Extra key detected',
      })
    );
  }

  try {
    token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    const user_id = user._id.toString();
    const { task, date, status } = req.body;
    const newTask = await Task.create({
      task,
      date,
      status,
    });
    await Task.findByIdAndUpdate(newTask.id, { user: user_id });

    res.status(201).json({
      success: true,
      newTask,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      msg: err.message,
    });
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    let find = await Task.findById(req.params.id);

    if (!find) {
      return next(
        res.status(404).json({
          success: false,
          msg: 'Task Not Found',
        })
      );
    }
    if (find.user.toString() !== req.user.id) {
      return next(
        res.status(404).json({
          success: false,
          msg: 'User not authorized to update this task',
        })
      );
    }
    find = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: find,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      msg: err.message,
    });
  }
};

exports.deleteTask = async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return next(
      res.status(404).json({
        success: false,
        msg: 'Task Not Found',
      })
    );
  }

  if (task.user.toString() !== req.user.id) {
    return next(
      res.status(404).json({
        success: false,
        msg: 'User not authorized to delete this task',
      })
    );
  }
  const del = await Task.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, data: del });
};
