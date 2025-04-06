// routes/progressReportRoutes.js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    const lessonProgress = req.session.lessonProgress || {
        completedLessons: [],
        points: 0
    };

    const vocabularyProgress = req.session.vocabularyProgress || {
        score: {
            crossword: 0,
            hangman: 0,
            rhymeBattle: 0
        },
        timestamp: null
    };

    const report = {
        lessonProgress,
        vocabularyProgress
    };

    res.json(report);
});

module.exports = router;
