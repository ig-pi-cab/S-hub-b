const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log("[AuthMiddleware] authHeader:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("[AuthMiddleware] decoded:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("[AuthMiddleware] Invalid token", err.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}


module.exports = authMiddleware;
