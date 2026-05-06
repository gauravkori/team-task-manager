const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {

    // Get token from headers
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, "secretkey");

    // Save user data in request
    req.user = decoded;

    next();

  } catch (error) {
    res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = authMiddleware;