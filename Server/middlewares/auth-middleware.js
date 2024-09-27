const jwt = require("jsonwebtoken");

const verifyJwtToken = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).send("You are not authenticated");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(403).send("Token is not valid");
    }

    // Store the user ID in the request object for future use
    req.userId = payload.userId;
    
    next();
  });
};

module.exports = verifyJwtToken;
