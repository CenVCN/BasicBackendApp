const jwt = require("jsonwebtoken");
const secretKey = "your_secret_key"; // Use the same secret key

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // Attach the user payload to the request
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    return res.status(403).send("Invalid token.");
  }
};

module.exports = {
  verifyToken,
};
