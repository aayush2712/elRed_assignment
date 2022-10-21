const express = require('express');
const router = express.Router();

const { createUser } = require('./CreateUser/createUserController');
const { login } = require('./Login/loginController');
const { logout } = require('./Logout/logoutController');

const { protect } = require('../middleware/auth');

router.route('/create').post(createUser);
router.route('/login').post(login);
router.route('/logout').get(protect, logout);

module.exports = router;
