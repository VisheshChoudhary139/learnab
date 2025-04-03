import React from 'react';
import PropTypes from 'prop-types';
import './AIPowered.css';

const AIPowered = ({ goBack }) => {
  const handleReadAloud = () => {
    const text = "AI-Powered Learning: Our adaptive system analyzes your strengths and weaknesses to create personalized learning paths.";
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  };

  return (
      <div className="ai-powered-container">
        <div className="container">
          <button className="back-btn" onClick={goBack}><img src="./preview.png"/> Back</button>

          <div className="text-center">
            <h1 className="ai-title">AI-Powered Learning</h1>
            <p className="ai-subtitle">Smart technology adapts to your unique learning needs.</p>
            <button
                onClick={handleReadAloud}
                className="read-aloud-ai"
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#A05200')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#C06500')}
                aria-label="Read Description Aloud"
            >
              <img src="./megaphone.png" alt="Read Aloud"/> Read Aloud
            </button>
          </div>

          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card ai-card">
                <h3 className="ai-card-title">Adaptive Learning Paths <img src="./robot.png"/></h3>
                <p className="ai-card-text">Our AI analyzes your performance to:</p>
                <ul className="ai-list">
                  <li>Identify knowledge gaps</li>
                  <li>Adjust difficulty automatically</li>
                  <li>Recommend targeted practice</li>
                  <li>Optimize review schedule</li>
                </ul>
                <div className="progress">
                  <div className="progress-bar ai-progress" role="progressbar" style={{ width: '75%' }}>
                    75% Mastery
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div className="card ai-card">
                <h3 className="ai-card-title">Smart Analytics <img src="./predictive-chart.png"/></h3>
                <p className="ai-card-text">Detailed insights about your learning:</p>
                <ul className="ai-list">
                  <li>Time spent per concept</li>
                  <li>Accuracy trends</li>
                  <li>Predicted mastery timeline</li>
                  <li>Comparison with peers</li>
                </ul>
                <button className="btn btn-dashboard">View Your Dashboard</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

AIPowered.propTypes = {
  goBack: PropTypes.func.isRequired,
};

export default AIPowered;
