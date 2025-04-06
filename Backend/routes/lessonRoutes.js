const express = require("express");
const router = express.Router();

// Save or update lesson progress in the session
router.post("/progress", (req, res) => {
    const { completedLessons, points } = req.body;

    req.session.lessonProgress = {
        completedLessons,
        points,
    };

    console.log("Session updated:", req.session.lessonProgress);
    res.status(204).end();
});

// Reset session progress
router.delete("/progress", (req, res) => {
    req.session.lessonProgress = null;
    res.status(204).end();
});

// View session progress
router.get("/progress", (req, res) => {
    res.json(req.session.lessonProgress || {});
});

// Session testing route (optional)
router.get("/test-session", (req, res) => {
    if (!req.session.views) req.session.views = 1;
    else req.session.views++;

    res.json({ views: req.session.views });
});

module.exports = router;
