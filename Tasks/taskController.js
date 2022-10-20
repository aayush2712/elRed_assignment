const { createTask, updateTask, deleteTask } = require('./taskValidations');
const errorResponse = require('../Utility/errorResponse');

exports.createTask = async (req, res, next) => {
  const task = createTask(req);
  const msg = 'Task created succesfully';
  task
    .then((task) => sendResponse(msg, 200, res, task))
    .catch((err) => next(new errorResponse(err, 400)));
};

exports.updateTask = async (req, res, next) => {
  const task = updateTask(req);
  const msg = 'Task updated succesfully';
  task
    .then((task) => sendResponse(msg, 200, res, task))
    .catch((err) => next(new errorResponse(err, 400)));
};

exports.deleteTask = async (req, res, next) => {
  const task = deleteTask(req);
  const msg = 'Task deleted succesfully';
  task
    .then((task) => sendResponse(msg, 200, res, task))
    .catch((err) => next(new errorResponse(err, 400)));
};

const sendResponse = (msg, statusCode, res, data) => {
  res.status(statusCode).json({
    success: true,
    message: msg,
    result: [{ data }],
  });
};
