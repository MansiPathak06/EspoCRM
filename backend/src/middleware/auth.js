import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) return res.status(401).json({ message: "Invalid or expired token" });
    req.user = payload;
    next();
  });
}
