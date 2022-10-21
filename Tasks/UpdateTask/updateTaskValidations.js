const Task = require('../taskModel');

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
