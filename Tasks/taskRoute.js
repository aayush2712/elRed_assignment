const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

const { createTask, updateTask, deleteTask } = require('./taskController');

router.route('/create').post(protect, createTask);
router.route('/update/:id').patch(protect, updateTask);
router.route('/delete/:id').delete(protect, deleteTask);

module.exports = router;
