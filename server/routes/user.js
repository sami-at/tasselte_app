const express = require('express');
const { signUp, login, logout } = require('../controllers/userContrller');


const router = express.Router();

router.route('/signup').post(signUp);
router.route('/login').post(login);
router.route('/logout').post(logout);


module.exports = router;