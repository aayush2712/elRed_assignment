const { deleteTask } = require('./deleteTaskValidations');
const errorResponse = require('../../Utility/errorResponse');
const sendResponse = require('../../Utility/sendResponse');

exports.deleteTask = async (req, res, next) => {
  const task = deleteTask(req);
  const msg = 'Task deleted succesfully';
  task
    .then((task) => sendResponse(msg, 200, res, task))
    .catch((err) => next(new errorResponse(err, 400)));
};
