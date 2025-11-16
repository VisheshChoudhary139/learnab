// routes/progress.js - DEV MODE (in-memory progress per user)
const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

// in-memory progress store: { userId: [ { lessonId, completed, pointsEarned } ] }
const progressStore = {};

// POST /api/progress/update
router.post("/update", auth, (req, res) => {
    const { lessonId, pointsEarned } = req.body || {};
    const userId = req.user && req.user.id ? req.user.id : "dev";

    if (!lessonId) return res.status(400).json({ msg: "lessonId required" });

    progressStore[userId] = progressStore[userId] || [];
    let prog = progressStore[userId].find(p => p.lessonId === lessonId);

    if (!prog) {
        prog = { lessonId, completed: true, pointsEarned: Number(pointsEarned) || 0 };
        progressStore[userId].push(prog);
    } else {
        prog.completed = true;
        prog.pointsEarned = (prog.pointsEarned || 0) + (Number(pointsEarned) || 0);
    }

    return res.json(prog);
});

// GET /api/progress
router.get("/", auth, (req, res) => {
    const userId = req.user && req.user.id ? req.user.id : "dev";
    return res.json(progressStore[userId] || []);
});

module.exports = router;
