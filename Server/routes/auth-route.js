const express = require("express");
const router = express.Router();
const {
  signUp,
  loginUser,
  getUserInfo,
  updateProfile,
} = require("../controllers/auth-controller");
const verifyJwtToken = require("../middlewares/auth-middleware");

router.post("/signup", signUp);
router.post("/login", loginUser);
router.get("/user-info", verifyJwtToken, getUserInfo);
router.put("/update-profile", verifyJwtToken, updateProfile);

module.exports = router;
