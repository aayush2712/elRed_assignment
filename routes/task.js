const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { invalid } = require('../middleware/invalidRoutes');

const { createTask, updateTask, deleteTask } = require('../controllers/task');

router.route('/create').post(protect, createTask);
router.route('/update/:id').patch(protect, updateTask);
router.route('/delete/:id').delete(protect, deleteTask);
router.route('*').get(invalid).post(invalid).patch(invalid).delete(invalid);

module.exports = router;
