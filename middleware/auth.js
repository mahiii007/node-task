const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token || token == null) {
    return res.status(401).json({
      message: "unauthorized access.",
      success: false,
    });
  }
  jwt.verify(token, SECRET, (err, client) => {
    if (err) {
      return res.status(401).json({
        message: "unauthorized access.",
        success: false,
      });
    }
    req.client = client;
    next();
  });
};

module.exports = { authenticateToken };
