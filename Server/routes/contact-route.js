const express = require("express");
const router = express.Router();

import { searchContacts  } from "../controllers/contact-controller";
import verifyJwtToken from "../middlewares/auth-middleware";

router.post("/search", verifyJwtToken, searchContacts );

module.exports = router;
