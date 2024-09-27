const express = require("express");
const router = express.Router();
const {
  signUp,
  loginUser,
  getUserInfo,
} = require("../controllers/auth-controller");
const verifyJwtToken = require("../middlewares/auth-middleware");

router.post("/signup", signUp);
router.post("/login", loginUser);
router.get("/user-info", verifyJwtToken, getUserInfo);

module.exports = router;
