const { updateTask } = require('./updateTaskValidations');
const errorResponse = require('../../Utility/errorResponse');
const sendResponse = require('../../Utility/sendResponse');

exports.updateTask = async (req, res, next) => {
  const task = updateTask(req);
  const msg = 'Task updated succesfully';
  task
    .then((task) => sendResponse(msg, 200, res, task))
    .catch((err) => next(new errorResponse(err, 400)));
};
