const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: [true, 'Please add a task'],
  },
  date: {
    type: Date,
    default: Date.now,
    required: [true, 'Please add a date'],
  },
  status: {
    type: String,
    enum: ['Completed', 'Incomplete'],
    required: [true, 'Please add a status'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Task', TaskSchema);
