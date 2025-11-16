// routes/auth.js - DEV MODE (in-memory users)
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_dev";

// very small in-memory store (reset on server restart)
const users = {}; // key: email => { id, name, username, email, passwordHash }

// Register
router.post("/register", async (req, res) => {
    try {
        const { name, username, email, password } = req.body || {};
        if (!email || !password) return res.status(400).json({ msg: "email & password required" });

        if (users[email]) return res.status(400).json({ msg: "User already exists (dev)" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const id = `dev-${Object.keys(users).length + 1}`;
        users[email] = { id, name, username, email, passwordHash: hashedPassword };

        return res.status(201).json({ msg: "User registered (dev)", user: { id, username, email } });
    } catch (err) {
        return res.status(500).json({ msg: "Server error", error: err.message });
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body || {};
        if (!email || !password) return res.status(400).json({ msg: "email & password required" });

        const user = users[email];
        // For dev: if user not found, optionally allow login by creating ephemeral user
        if (!user) {
            // create ephemeral dev user
            const id = `dev-${Object.keys(users).length + 1}`;
            const hashed = await bcrypt.hash(password, 10);
            users[email] = { id, name: "dev", username: email.split("@")[0], email, passwordHash: hashed };
        }

        const isMatch = await bcrypt.compare(password, users[email].passwordHash);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials (dev)" });

        const token = jwt.sign({ id: users[email].id, email: users[email].email }, JWT_SECRET, { expiresIn: "7d" });
        return res.json({ token, user: { id: users[email].id, username: users[email].username, email: users[email].email } });
    } catch (err) {
        return res.status(500).json({ msg: "Server error", error: err.message });
    }
});

// Logout (frontend handles clearing token)
router.post("/logout", (req, res) => res.json({ msg: "Logged out (dev)" }));

module.exports = router;
