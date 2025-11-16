// middleware/auth.js - DEV MODE (JWT verify only, no DB)
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_dev";

module.exports = function (req, res, next) {
    // Accept header format: Authorization: Bearer <token>
    const authHeader = req.header("Authorization") || req.header("authorization");
    if (!authHeader) {
        // If you prefer to bypass auth entirely in dev, uncomment next line:
        // req.user = { id: "dev", email: "dev@local" }; return next();

        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    const parts = authHeader.split(" ");
    const token = parts.length === 2 ? parts[1] : parts[0];

    if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // { id, email }
        next();
    } catch (err) {
        return res.status(401).json({ msg: "Invalid token", error: err.message });
    }
};
