const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');
require("../data/user-model");

router.route("/")
    .post(userController.registerUser);

router.route("/login")
    .post(userController.login);

module.exports = router;