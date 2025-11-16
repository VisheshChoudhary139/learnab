// server.js - DEV MODE (no MongoDB)
const express = require("express");
// const mongoose = require("mongoose"); // disabled for dev
const cors = require("cors");

const authRoutes = require("./routes/auth");
const progressRoutes = require("./routes/progress"); // if present

const app = express();
app.use(express.json());
app.use(cors());

// ===== DEV: MongoDB disabled =====
// If you want to re-enable, restore mongoose import and mongoose.connect with your MONGO_URI.
// For local dev without DB we do not connect to MongoDB.
console.warn("Running server in DEV mode: MongoDB connection disabled.");

// mount routes
app.use("/api/auth", authRoutes);
app.use("/api/progress", progressRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} (no DB)`));
