import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class AIPowered extends Component {
  static propTypes = {};

  handleReadAloud = () => {
    const text = "AI-Powered Learning: Our adaptive system analyzes your strengths and weaknesses to create personalized learning paths. Get smart recommendations, automated difficulty adjustment, and detailed performance analytics.";
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  };

  render() {
    return (
      <div style={{ backgroundColor: '#F5F5F5', minHeight: '100vh', paddingBottom: '50px' }}>
        <div className="container mt-4">
        <button className="btn btn-outline-secondary mb-3" onClick={this.props.goBack}>🔙 Back</button>
          <div className="text-center mb-5">
            <h1 style={{ color: '#C06500', fontWeight: 'bold', fontSize: '2.5rem' }}>AI-Powered Learning</h1>
            <p style={{ color: '#666666', fontSize: '1.2rem' }}>Smart technology adapts to your unique learning needs.</p>
            <button 
              onClick={this.handleReadAloud} 
              className="btn btn-success mt-3"
              style={{
                backgroundColor: '#C06500',
                color: '#FFFFFF',
                fontSize: '1.1rem',
                padding: '12px 30px',
                borderRadius: '25px',
                transition: 'background-color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#A05200'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#C06500'}
              aria-label="Read Description Aloud"
            >
              📢 Read Aloud
            </button>
          </div>

          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card p-4 shadow-sm h-100" style={{ backgroundColor: '#FFFFFF', borderRadius: '15px' }}>
                <h3 style={{ color: '#C06500', fontWeight: 'bold' }}>Adaptive Learning Paths 🤖</h3>
                <p style={{ color: '#666666' }}>Our AI analyzes your performance to:</p>
                <ul style={{ color: '#666666', lineHeight: '1.8' }}>
                  <li>Identify knowledge gaps</li>
                  <li>Adjust difficulty automatically</li>
                  <li>Recommend targeted practice</li>
                  <li>Optimize review schedule</li>
                </ul>
                <div className="progress mt-4" style={{ height: '20px', borderRadius: '10px' }}>
                  <div 
                    className="progress-bar" 
                    role="progressbar" 
                    style={{ 
                      width: '75%', 
                      backgroundColor: '#C06500',
                      borderRadius: '10px'
                    }} 
                    aria-valuenow="75" 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                  >
                    75% Mastery
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div className="card p-4 shadow-sm h-100" style={{ backgroundColor: '#FFFFFF', borderRadius: '15px' }}>
                <h3 style={{ color: '#C06500', fontWeight: 'bold' }}>Smart Analytics 📊</h3>
                <p style={{ color: '#666666' }}>Detailed insights about your learning:</p>
                <ul style={{ color: '#666666', lineHeight: '1.8' }}>
                  <li>Time spent per concept</li>
                  <li>Accuracy trends</li>
                  <li>Predicted mastery timeline</li>
                  <li>Comparison with peers</li>
                </ul>
                <button className="btn btn-outline-warning mt-3" style={{ borderColor: '#C06500', color: '#C06500' }}>View Your Dashboard</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AIPowered;