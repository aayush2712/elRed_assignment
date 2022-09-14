const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
    const { task, date, status } = req.body;
    const newTask = await Task.create({
      task,
      date,
      status,
    });

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

    find = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      find,
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
  task.remove();
  res.status(200).json({ success: true, data: task });
};