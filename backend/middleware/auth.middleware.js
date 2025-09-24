const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log("Auth header:", authHeader);
  console.log("JWT_SECRET exists:", !!JWT_SECRET);
  console.log("Request method:", req.method, "Request URL:", req.url);

  if (!authHeader) {
    console.log("No authorization header");
    return res.status(403).json({ message: "No token provided" });
  }

  // Split "Bearer <token>"
  const token = authHeader.split(" ")[1];
  if (!token) {
    console.log("Token missing from header");
    return res.status(403).json({ message: "Token missing" });
  }

  console.log("Verifying token...");
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Token verification failed:", err.message);
      return res.status(401).json({ message: "Unauthorized" });
    }

    console.log("Token verified successfully for user:", decoded.username);
    console.log("Proceeding to controller...");
    req.admin = decoded;
    next();
  });
};
