import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Quizzes.css"; // Import external CSS

export class Quizzes extends Component {
  static propTypes = {
    goBack: PropTypes.func.isRequired,
  };

  handleReadAloud = () => {
    const text =
        "Interactive Quizzes: Test your knowledge with our adaptive quiz system. Immediate feedback and detailed explanations help reinforce learning. Choose from multiple quiz formats to suit your style.";
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  };

  render() {
    const quizTypes = [
      { title: "Multiple Choice", emoji: <img src="./school.png" alt="Multiple Choice" className="quiz-icon" />, description: "Traditional multiple choice questions with instant feedback." },
      { title: "Fill-in-the-Blank", emoji: <img src="./new-document.png" alt="Fill-in-the-Blank" className="quiz-icon" />, description: "Type your answers for better retention and recall." },
      { title: "Matching", emoji: <img src="./puzzle.png" alt="Matching" className="quiz-icon" />, description: "Drag and drop to match related concepts and terms." },
    ];

    return (
        <div className="quizzes-container">
          <div className="container mt-4">
            <button className="back-btn" onClick={this.props.goBack}>
              <img src="./preview.png" alt="Next" /> Back
            </button>
            <div className="text-center mb-5">
              <h1 className="quizzes-title">Interactive Quizzes</h1>
              <p className="quizzes-subtitle">Test your knowledge and track your progress.</p>
              <button
                  onClick={this.handleReadAloud}
                  className="read-aloud-btn"
                  aria-label="Read Description Aloud"
              >
                <img src="./megaphone.png" alt="Read Aloud" /> Read Aloud
              </button>
            </div>

            <div className="row">
              {quizTypes.map((quiz, index) => (
                  <div key={index} className="col-md-4 mb-4">
                    <div className="quiz-card">
                      <div className="quiz-card-header">
                        {quiz.emoji}
                      </div>
                      <div className="text-center">
                        <h3 className="quiz-title">{quiz.title}</h3>
                      </div>
                      <p className="quiz-description">{quiz.description}</p>
                      <div className="mt-auto">
                        <button className="quiz-button">Try Sample</button>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
    );
  }
}

export default Quizzes;