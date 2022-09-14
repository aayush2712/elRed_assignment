const express = require('express');
const router = express.Router();

const { createUser, getUser, login, logout } = require('../controllers/user');

router.route('/create').post(createUser);
router.route('/get').get(getUser);
router.route('/login').post(login);
router.route('/logout').get(logout);

module.exports = router;
