const express = require("express");
const router = express.Router();

// Save or update vocabulary game progress in the session
router.post("/progress", (req, res) => {
    const { score, timestamp } = req.body;

    req.session.vocabularyProgress = {
        score,
        timestamp
    };

    console.log("🧠 Vocabulary session updated:", req.session.vocabularyProgress);
    res.status(204).end();
});

// Get current vocabulary progress from the session
router.get("/progress", (req, res) => {
    res.json(req.session.vocabularyProgress || {
        score: {
            crossword: 0,
            hangman: 0,
            rhymeBattle: 0
        },
        timestamp: null
    });
});


// Delete/reset vocabulary progress from the session
router.delete("/progress", (req, res) => {
    req.session.vocabularyProgress = null;
    res.status(204).end();
});

// Optional: Session test route
router.get("/test-session", (req, res) => {
    if (!req.session.vocabViews) req.session.vocabViews = 1;
    else req.session.vocabViews++;

    res.json({ vocabViews: req.session.vocabViews });
});

module.exports = router;
