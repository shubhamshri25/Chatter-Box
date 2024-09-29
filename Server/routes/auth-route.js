const express = require("express");
const router = express.Router();
const {
  signUp,
  loginUser,
  getUserInfo,
  updateProfile,
  addProfileImage,
  deleteImage,
} = require("../controllers/auth-controller");
const verifyJwtToken = require("../middlewares/auth-middleware");
const multer = require("multer");

const upload = multer({ dest: "uploads/profiles" });


router.post("/signup", signUp);

router.post("/login", loginUser);

router.get("/user-info", verifyJwtToken, getUserInfo);

router.put("/update-profile", verifyJwtToken, updateProfile);

router.post(
  "/add-profile-image",
  verifyJwtToken,
  upload.single("profile-image"),
  addProfileImage
);

router.delete("/remove-profile-image", verifyJwtToken, deleteImage);

module.exports = router;
