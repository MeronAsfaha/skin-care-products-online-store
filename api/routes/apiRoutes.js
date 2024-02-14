
const express = require('express');
const router = express.Router();
const skincareProductRoutes = require("./skincareProductRoutes");
const userRoutes = require("./userRoutes");


router.use("/skincareProducts", skincareProductRoutes);

router.use("/users", userRoutes);

module.exports = router; 