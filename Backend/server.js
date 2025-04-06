const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");

// ✅ Route Imports
const authRoutes = require("./routes/auth");
const lessonRoutes = require("./routes/lessonRoutes");
const vocabularyRoutes = require("./routes/vocabularyRoutes");
const progressReportRoutes = require("./routes/progressReportRoutes");

const app = express();
app.use(express.json());

// ✅ Correct CORS setup to allow frontend requests with cookies
app.use(cors({
    origin: "http://localhost:3000", // Adjust if your frontend URL changes
    credentials: true
}));

// ✅ Session middleware
app.use(session({
    secret: "your-secret-key", // Replace with strong secret in production
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,           // Set to true if you're using HTTPS
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    }
}));

// ✅ MongoDB Connection
const MONGO_URI = "mongodb+srv://24f2005902:Rta0HS5bx1l9Aco5@cluster0.6hq8aqf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/lessons", lessonRoutes);
app.use("/api/vocabulary", vocabularyRoutes);
app.use("/api/progress-report", progressReportRoutes);

// ✅ Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
