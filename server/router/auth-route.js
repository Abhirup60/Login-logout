const express = require("express");
const router = express.Router();
const authController = require("../controller/auth-controller");
const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");

router.route("/register").post(authController.register);
router.route("/login").post(authController.login);
router.route("/all-users").get(authMiddleware, adminMiddleware, authController.usersData); 
//-> /api/auth/all-users

// for authentication
router.route("/user").get(authMiddleware, authController.user);

module.exports = router;
