const { createTask } = require('./createTaskValidations');
const errorResponse = require('../../Utility/errorResponse');
const sendResponse = require('../../Utility/sendResponse');

exports.createTask = async (req, res, next) => {
  const task = createTask(req);
  const msg = 'Task created succesfully';

  task
    .then((task) => sendResponse(msg, 200, res, task))
    .catch((err) => next(new errorResponse(err, 400)));
};
