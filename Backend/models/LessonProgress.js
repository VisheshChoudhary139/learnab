const mongoose = require("mongoose");

const LessonProgressSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    lessonId: { type: String, required: true }, // Unique lesson identifier
    completed: { type: Boolean, default: false },
    pointsEarned: { type: Number, default: 0 },
});

module.exports = mongoose.model("LessonProgress", LessonProgressSchema);
