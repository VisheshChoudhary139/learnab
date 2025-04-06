import React, { Component } from "react";
import "./Progress.css";
import lessons from "./lessons"; // top of the file
import StaircaseAnimation from "./StaircaseAnimation"; // 👈 import component


export class Progress extends Component {
    state = {
        progressData: null,
        lessons: [], // add lessons here or import
        selectedSection: "default"
    };

    componentDidMount() {
        this.fetchProgressData(); // initial fetch

        this.interval = setInterval(() => {
            this.fetchProgressData();
        }, 5000); // fetch every 5 seconds
    }

    componentWillUnmount() {
        clearInterval(this.interval); // clean up interval
    }

    fetchProgressData = () => {
        fetch("http://localhost:5000/api/progress-report", {
            credentials: "include", // ✅ INCLUDE THIS TO SEND COOKIES
        })
            .then(res => res.json())
            .then(data => {
                console.log("Fetched progress data:", data); // 👈 DEBUG LOG
                this.setState({
                    progressData: data,
                    lessons: lessons
                });
            })
            .catch(err => console.error("Fetch error:", err));
    };


    handleReadAloud = () => {
        const reportText = `Performance Overview: Visualize your progress...`; // unchanged
        const speech = new SpeechSynthesisUtterance(reportText);
        window.speechSynthesis.speak(speech);
    };

    handleNavigation = (page) => {
        this.setState({ selectedSection: page });
    };

    getPerformanceOverview = () => {
        const { progressData, lessons } = this.state;

        if (!progressData || !progressData.lessonProgress || lessons.length === 0) {
            return <p>Loading performance data...</p>;
        }

        const completedLessonIds = progressData.lessonProgress.completedLessons || [];

        const validCompletedLessons = lessons.filter(lesson =>
            completedLessonIds.includes(lesson.id)
        );

        let totalQuestions = 0;
        validCompletedLessons.forEach(lesson => {
            totalQuestions += lesson.quiz.length;
        });

        const totalCorrect = progressData.lessonProgress.points / 5;
        const percentage = totalQuestions > 0 ? (totalCorrect / totalQuestions) * 100 : 0;

        let feedback;
        if (percentage >= 80) feedback = "Fantastic job! You’re mastering the basics very well!";
        else if (percentage >= 50) feedback = "You're doing okay, but there's room to improve.";
        else feedback = "Looks like you're struggling a bit. Try revisiting lessons for better understanding.";

        return (
            <>
                <h1 className="performance-title">Performance Overview</h1>
                <table className="table">
                    <tbody>
                    <tr>
                        <th>Lessons Completed</th>
                        <td>{validCompletedLessons.length} / {lessons.length}</td>
                    </tr>
                    <tr>
                        <th>Total Quiz Questions</th>
                        <td>{totalQuestions}</td>
                    </tr>
                    <tr>
                        <th>Correct Answers</th>
                        <td>{totalCorrect} / {totalQuestions}</td>
                    </tr>
                    <tr>
                        <th>Accuracy</th>
                        <td>{percentage.toFixed(1)}%</td>
                    </tr>
                    <tr>
                        <th>Vocabulary Game Score</th>
                        <td>
                            Crossword: {progressData.vocabularyProgress?.score?.crossword || 0},
                            Hangman: {progressData.vocabularyProgress?.score?.hangman || 0}
                        </td>
                    </tr>
                    <tr>
                        <th>Feedback</th>
                        <td><strong>{feedback}</strong></td>
                    </tr>
                    </tbody>
                </table>
            </>
        );
    };


    getRecommendedLessons = () => {
        const {progressData, lessons} = this.state;
        const completed = progressData.lessonProgress.completedLessons;

        const remaining = lessons.filter(l => !completed.includes(l.id));

        return (
            <>
                <h1 className="performance-title">Recommended Lessons</h1>
                <p>Here are the lessons you haven't completed yet:</p>
                <table className="table">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Lesson Title</th>
                        <th>Skill Area</th>
                    </tr>
                    </thead>
                    <tbody>
                    {remaining.map((lesson, index) => (
                        <tr key={lesson.id}>
                            <td>{index + 1}</td>
                            <td>{lesson.title}</td>
                            <td>{lesson.title.split(":")[0].toLowerCase()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </>
        );
    };


    getStrengthsWeaknesses = () => {
        const { progressData, lessons } = this.state;
        const completed = progressData.lessonProgress.completedLessons;

        const lessonPerformance = completed.map(cid => {
            const lesson = lessons.find(l => l.id === cid);
            const correctAnswers = (progressData.lessonProgress.points / 5) / completed.length;
            const totalQuestions = lesson.quiz.length;
            const accuracy = (correctAnswers / totalQuestions) * 100;

            return {
                title: lesson.title,
                accuracy: accuracy.toFixed(1),
            };
        });

        const strengths = lessonPerformance.filter(l => l.accuracy >= 80);
        const weaknesses = lessonPerformance.filter(l => l.accuracy < 80);

        return (
            <>
                <h1 className="performance-title">Strengths & Weaknesses</h1>
                <p><strong>Strengths:</strong></p>
                <table className="table">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Lesson Title</th>
                        <th>Accuracy</th>
                    </tr>
                    </thead>
                    <tbody>
                    {strengths.map((l, index) => (
                        <tr key={l.title}>
                            <td>{index + 1}</td>
                            <td>{l.title}</td>
                            <td>{l.accuracy}%</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                <p><strong>Areas to Improve:</strong></p>
                <table className="table">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Lesson Title</th>
                        <th>Accuracy</th>
                    </tr>
                    </thead>
                    <tbody>
                    {weaknesses.map((l, index) => (
                        <tr key={l.title}>
                            <td>{index + 1}</td>
                            <td>{l.title}</td>
                            <td>{l.accuracy}%</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <p><strong>Vocabulary Strengths:</strong></p>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Game</th>
                        <th>Score</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Crossword</td>
                        <td>{progressData.vocabularyProgress?.score?.crossword || 0}</td>
                    </tr>
                    <tr>
                        <td>Hangman</td>
                        <td>{progressData.vocabularyProgress?.score?.hangman || 0}</td>
                    </tr>
                    </tbody>
                </table>

            </>
        );
    };


    getProgressMilestones = () => {
        const {progressData, lessons} = this.state;
        const completedCount = progressData.lessonProgress.completedLessons.length;
        const totalCount = lessons.length;
        const percentDone = (completedCount / totalCount) * 100;

        return (
            <>
                <h1 className="performance-title">Progress Milestones</h1>
                <div className="progress">
                    <div className="progress-bar ai-progress" style={{ width: `${percentDone}%` }}>
                        {percentDone.toFixed(1)}%
                    </div>
                </div>
                <p className="sub-progress">{completedCount} of {totalCount} lessons completed.</p>
            </>
        );
    };

    renderContent = () => {
        const { selectedSection, progressData } = this.state;
        if (!progressData) return <p>Loading progress data...</p>;

        switch (selectedSection) {
            case "Performance Overview":
                return this.getPerformanceOverview();
            case "Recommended Lessons":
                return this.getRecommendedLessons();
            case "Strengths & Weaknesses":
                return this.getStrengthsWeaknesses();
            case "Progress Milestones":
                return this.getProgressMilestones();
            case "AI Feedback":
            case "Next Steps":
                return <p>Coming soon!</p>;
            default:
                return <h2 className="select-feature-title">Select a feature to view details</h2>;
        }
    };

    render() {
        const features = [
            "Performance Overview",
            "Recommended Lessons",
            "Strengths & Weaknesses",
            "Progress Milestones",
            "AI Feedback",
            "Next Steps",
        ];

        return (
            <div className="progresspage">
                <div className="progress-container">
                    <div className="progress-title-container mt-4 text-center position-relative"
                         style={{overflow: "hidden"}}>
                        <div style={{position: "relative", zIndex: 1}}>
                            <h1 className="progress-title">
                                <span className="ai-sub">Progress Report</span>
                            </h1>
                            <p className="progress-description">Welcome to your Progress Report. Here, you can explore a detailed breakdown of your learning progress. Use the buttons below to view your Performance Overview, discover Recommended Lessons based on what you haven’t completed, analyze your Strengths & Weaknesses across topics, and track your Progress Milestones. Each section gives you insights to help improve and stay on track. You can also have the report read aloud using the megaphone button above.</p>
                            <button onClick={this.handleReadAloud} className="read-aloud-btn">
                                <img src="./megaphone.png" alt="Read Aloud"/> Read Report Aloud
                            </button>
                        </div>
                    </div>


                    <div className="container mt-4">
                        <div className="row">
                            {features.map((title, index) => (
                                <div key={index} className="col-md-4 mb-3 text-center">
                                    <button className="feature-btn" onClick={() => this.handleNavigation(title)}>
                                        {title}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="container mt-5 content-box" id="content">
                        {this.renderContent()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Progress;
