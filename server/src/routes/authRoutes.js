const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");
const {
    register, login, getMe, logout
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.post("/logout", protect, logout);
router.get(
  "/admin-test",
  protect,
  authorize("admin"),
  (req, res) => {
    res.json({
      success: true,
      message: "Welcome Admin!",
    });
  }
);

module.exports = router;