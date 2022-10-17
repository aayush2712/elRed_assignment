const express = require('express');
const router = express.Router();

const { createUser, getUser, login, logout } = require('../controller/user');

const { protect } = require('../../middleware/auth');

router.route('/create').post(createUser);
router.route('/get').get(getUser);
router.route('/login').post(login);
router.route('/logout').get(protect, logout);

module.exports = router;
