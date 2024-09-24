const express = require("express");
const router = express.Router();
const { signUp, loginUser } = require("../controllers/auth-controller");

router.post("/signup", signUp);
router.post("/login", loginUser);

module.exports = router;
