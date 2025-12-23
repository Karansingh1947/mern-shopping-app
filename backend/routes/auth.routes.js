const express = require("express");
const router = express.Router();

const { register, login, logout } = require("../controllers/auth.controller");
const { protect, restrictTo } = require("../middleware/auth.middleware");


// Routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// Protected route (test)
router.get("/me", protect, (req, res) => {
  res.json({ user: req.user });
});

//admin-only route:
router.get("/admin", protect, restrictTo("admin"), (req, res) => {
  res.json({ message: "Welcome Admin", user: req.user });
});

module.exports = router;
