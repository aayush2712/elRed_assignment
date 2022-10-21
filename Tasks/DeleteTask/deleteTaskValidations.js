const Task = require('../taskModel');

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
