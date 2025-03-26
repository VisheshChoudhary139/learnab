import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Quizzes extends Component {
  static propTypes = {};

  handleReadAloud = () => {
    const text = "Interactive Quizzes: Test your knowledge with our adaptive quiz system. Immediate feedback and detailed explanations help reinforce learning. Choose from multiple quiz formats to suit your style.";
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  };

  render() {
    return (
      <div style={{ backgroundColor: '#F5F5F5', minHeight: '100vh', paddingBottom: '50px' }}>
        <div className="container mt-4">
        <button className="btn btn-outline-secondary mb-3" onClick={this.props.goBack}>🔙 Back</button>
          <div className="text-center mb-5">
            <h1 style={{ color: '#C06500', fontWeight: 'bold', fontSize: '2.5rem' }}>Interactive Quizzes</h1>
            <p style={{ color: '#666666', fontSize: '1.2rem' }}>Test your knowledge and track your progress.</p>
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
            <div className="col-md-4 mb-4">
              <div className="card p-3 shadow-sm h-100" style={{ backgroundColor: '#FFFFFF', borderRadius: '15px' }}>
                <div className="text-center">
                  <h3 style={{ color: '#C06500', fontWeight: 'bold' }}>Multiple Choice</h3>
                  <span style={{ fontSize: '2rem' }}>🔠</span>
                </div>
                <p style={{ color: '#666666' }}>Traditional multiple choice questions with instant feedback.</p>
                <div className="mt-auto">
                  <button className="btn btn-outline-warning w-100" style={{ borderColor: '#C06500', color: '#C06500' }}>Try Sample</button>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card p-3 shadow-sm h-100" style={{ backgroundColor: '#FFFFFF', borderRadius: '15px' }}>
                <div className="text-center">
                  <h3 style={{ color: '#C06500', fontWeight: 'bold' }}>Fill-in-the-Blank</h3>
                  <span style={{ fontSize: '2rem' }}>✍️</span>
                </div>
                <p style={{ color: '#666666' }}>Type your answers for better retention and recall.</p>
                <div className="mt-auto">
                  <button className="btn btn-outline-warning w-100" style={{ borderColor: '#C06500', color: '#C06500' }}>Try Sample</button>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card p-3 shadow-sm h-100" style={{ backgroundColor: '#FFFFFF', borderRadius: '15px' }}>
                <div className="text-center">
                  <h3 style={{ color: '#C06500', fontWeight: 'bold' }}>Matching</h3>
                  <span style={{ fontSize: '2rem' }}>↔️</span>
                </div>
                <p style={{ color: '#666666' }}>Drag and drop to match related concepts and terms.</p>
                <div className="mt-auto">
                  <button className="btn btn-outline-warning w-100" style={{ borderColor: '#C06500', color: '#C06500' }}>Try Sample</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Quizzes;