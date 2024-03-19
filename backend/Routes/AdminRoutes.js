const express = require("express");
const router = express.Router();
const { adminLogin, adminRegister } = require("../Controller/AdminController");

router.post("/login", adminLogin); // Route for admin login
router.post("/register", adminRegister); // Route for admin register

module.exports = router;
