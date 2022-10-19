const Task = require('./taskModel');
const { createTask, updateTask, deleteTask } = require('./taskValidations');
const errorResponse = require('../Utility/errorResponse');

exports.createTask = async (req, res, next) => {
  let task = createTask(req);
  task
    .then((task) =>
      res.status(201).json({
        success: true,
        message: 'Task created succesfully',
        result: [{ task }],
      })
    )
    .catch((err) => next(new errorResponse(err, 400)));
};

exports.updateTask = async (req, res, next) => {
  let task = updateTask(req);
  task
    .then((task) =>
      res.status(201).json({
        success: true,
        message: 'Task updated succesfully',
        result: [{ task }],
      })
    )
    .catch((err) => next(new errorResponse(err, 400)));
};

exports.deleteTask = async (req, res, next) => {
  let task = deleteTask(req);
  task
    .then((task) =>
      res.status(200).json({
        success: true,
        message: 'Task deleted succesfully',
        result: [{ task }],
      })
    )
    .catch((err) => next(new errorResponse(err, 400)));
};
