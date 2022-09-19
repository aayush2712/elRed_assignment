const express = require('express');
const router = express.Router();

const { createUser, getUser, login, logout } = require('../controllers/user');
const { invalid } = require('../middleware/invalidRoutes');
const { protect } = require('../middleware/auth');

router.route('/create').post(createUser);
router.route('/get').get(getUser);
router.route('/login').post(login);
router.route('/logout').get(protect, logout);
router.route('*').get(invalid).post(invalid).patch(invalid).delete(invalid);

module.exports = router;
