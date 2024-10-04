const express = require("express");
const router = express.Router();

const { searchContacts } = require("../controllers/contact-controller");
const verifyJwtToken = require("../middlewares/auth-middleware");

router.post("/search", verifyJwtToken, searchContacts);

module.exports = router;
