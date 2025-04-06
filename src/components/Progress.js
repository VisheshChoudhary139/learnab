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
                <h1>Performance Overview</h1>
                <p>You’ve completed {validCompletedLessons.length} lesson(s) out of {lessons.length}.</p>
                <p>Total quiz questions attempted: {totalQuestions}</p>
                <p>Correct answers: {totalCorrect} / {totalQuestions}</p>
                <p>Accuracy: {percentage.toFixed(1)}%</p>
                <p><strong>{feedback}</strong></p>
            </>
        );
    };


    getRecommendedLessons = () => {
        const { progressData, lessons } = this.state;
        const completed = progressData.lessonProgress.completedLessons;

        const remaining = lessons.filter(l => !completed.includes(l.id));

        return (
            <>
                <h1>Recommended Lessons</h1>
                <p>Here are the lessons you haven't completed yet:</p>
                <ul>
                    {remaining.map(lesson => (
                        <li key={lesson.id}>
                            <strong>{lesson.title}</strong>: This lesson can help you with {lesson.title.split(":")[0].toLowerCase()} skills.
                        </li>
                    ))}
                </ul>
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
                <h1>Strengths & Weaknesses</h1>
                <p><strong>Strengths:</strong></p>
                <ul>
                    {strengths.map(l => (
                        <li key={l.title}>{l.title} - {l.accuracy}%</li>
                    ))}
                </ul>
                <p><strong>Areas to Improve:</strong></p>
                <ul>
                    {weaknesses.map(l => (
                        <li key={l.title}>{l.title} - {l.accuracy}%</li>
                    ))}
                </ul>
            </>
        );
    };

    getProgressMilestones = () => {
        const { progressData, lessons } = this.state;
        const completedCount = progressData.lessonProgress.completedLessons.length;
        const totalCount = lessons.length;
        const percentDone = (completedCount / totalCount) * 100;

        return (
            <>
                <h1>Progress Milestones</h1>
                <div className="progress">
                    <div className="progress-bar" style={{ width: `${percentDone}%` }}>
                        {percentDone.toFixed(1)}%
                    </div>
                </div>
                <p>{completedCount} of {totalCount} lessons completed.</p>
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
                return <h2>Select a feature to view details</h2>;
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
                                <span className="ai-highlight">AI</span> <br />
                                <span className="ai-sub">Progress Report</span>
                            </h1>
                            <button onClick={this.handleReadAloud} className="read-aloud-btn">
                                <img src="./megaphone.png" alt="Read Aloud"/> Read Report Aloud
                            </button>
                        </div>
                        <div className="staircase-bg">
                            <StaircaseAnimation/>
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
