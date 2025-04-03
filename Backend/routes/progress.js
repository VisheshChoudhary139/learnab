const express = require("express");
const LessonProgress = require("../models/LessonProgress");
const auth = require("../middleware/auth");

const router = express.Router();

// Update progress for a lesson
router.post("/update", auth, async (req, res) => {
    const { lessonId, pointsEarned } = req.body;

    try {
        let progress = await LessonProgress.findOne({ user: req.user.id, lessonId });

        if (!progress) {
            progress = new LessonProgress({ user: req.user.id, lessonId, completed: true, pointsEarned });
        } else {
            progress.completed = true;
            progress.pointsEarned += pointsEarned; // Ensure points update even if already completed
        }

        await progress.save();
        res.json(progress);
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

// Get all progress for a user
router.get("/", auth, async (req, res) => {
    try {
        const progress = await LessonProgress.find({ user: req.user.id });
        res.json(progress);
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
});

module.exports = router;
