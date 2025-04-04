import React, { Component } from "react";
import "./Progress.css"; // Import CSS

export class Progress extends Component {
    handleReadAloud = () => {
        const reportText = `Performance Overview: Visualize your progress with weekly score analysis and learning path insights.
      Recommended Lessons: AI suggests topics to focus on for improvement.
      Strengths & Weaknesses: Detailed analysis of areas where you excel or need improvement.
      Progress Milestones: Track your goals and achievements to stay motivated.
      AI Feedback: Receive tips and tricks tailored to your learning style.
      Next Steps: Curated action items for improved learning outcomes.`;

        const speech = new SpeechSynthesisUtterance(reportText);
        window.speechSynthesis.speak(speech);
    };

    handleNavigation = (page) => {
        document.getElementById("content").innerHTML = `<h1>${page}</h1><p>Content for ${page} will be displayed here.</p>`;
    };

    render() {
        const features = [
            { title: "Performance Overview", page: "Performance Overview" },
            { title: "Recommended Lessons", page: "Recommended Lessons" },
            { title: "Strengths & Weaknesses", page: "Strengths & Weaknesses" },
            { title: "Progress Milestones", page: "Progress Milestones" },
            { title: "AI Feedback", page: "AI Feedback" },
            { title: "Next Steps", page: "Next Steps" },
        ];

        return (
            <div className="progresspage">
                <div className="progress-container">
                    <div className="container mt-4 text-center">
                        <h1 className="progress-title">Personalized Progress Report <img src="./google-analytics.png"/>
                        </h1>
                        <button onClick={this.handleReadAloud} className="read-aloud-btn">
                            <img src="./megaphone.png" alt="Read Aloud"/> Read Report Aloud
                        </button>
                    </div>

                    <div className="container mt-4">
                        <div className="row">
                            {features.map((item, index) => (
                                <div key={index} className="col-md-4 mb-3 text-center">
                                    <button className="feature-btn" onClick={() => this.handleNavigation(item.page)}>
                                        {item.title}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="container mt-5 content-box" id="content">
                        <h2>Select a feature to view details</h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default Progress;
